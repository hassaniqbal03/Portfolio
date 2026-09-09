const { query } = require('../config/db');

const DEFAULT_SKILLS = [];

let memorySkills = [];

const getAllSkills = async (category = null) => {
  try {
    let sql = 'SELECT id, name, category, icon, proficiency, display_order FROM skills';
    const params = [];
    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    sql += ' ORDER BY display_order ASC, id ASC';
    const rows = await query(sql, params);
    return rows || [];
  } catch (error) {
    console.warn('[SKILLS SERVICE] Falling back to in-memory skills cache:', error.message);
    return category ? memorySkills.filter(s => s.category.toLowerCase() === category.toLowerCase()) : memorySkills;
  }
};

const getSkillById = async (id) => {
  try {
    const rows = await query('SELECT id, name, category, icon, proficiency, display_order FROM skills WHERE id = ?', [id]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return memorySkills.find(s => s.id === Number(id)) || null;
  } catch (error) {
    return memorySkills.find(s => s.id === Number(id)) || null;
  }
};

const createSkill = async (skillData) => {
  const { name, category, icon = 'Layers', proficiency = 85, display_order = 0 } = skillData;
  try {
    const result = await query(
      'INSERT INTO skills (name, category, icon, proficiency, display_order) VALUES (?, ?, ?, ?, ?)',
      [name, category, icon, proficiency, display_order]
    );
    const newSkill = {
      id: result.insertId,
      name,
      category,
      icon,
      proficiency: Number(proficiency),
      display_order: Number(display_order)
    };
    memorySkills.push(newSkill);
    return newSkill;
  } catch (error) {
    console.warn('[SKILLS SERVICE] Creating skill in-memory fallback:', error.message);
    const newSkill = {
      id: Date.now(),
      name,
      category,
      icon,
      proficiency: Number(proficiency),
      display_order: Number(display_order)
    };
    memorySkills.push(newSkill);
    return newSkill;
  }
};

const updateSkill = async (id, skillData) => {
  const { name, category, icon = 'Layers', proficiency = 85, display_order = 0 } = skillData;
  try {
    await query(
      'UPDATE skills SET name = ?, category = ?, icon = ?, proficiency = ?, display_order = ? WHERE id = ?',
      [name, category, icon, proficiency, display_order, id]
    );
    const updated = {
      id: Number(id),
      name,
      category,
      icon,
      proficiency: Number(proficiency),
      display_order: Number(display_order)
    };
    memorySkills = memorySkills.map(s => s.id === Number(id) ? updated : s);
    return updated;
  } catch (error) {
    console.warn('[SKILLS SERVICE] Updating skill in-memory fallback:', error.message);
    const updated = {
      id: Number(id),
      name,
      category,
      icon,
      proficiency: Number(proficiency),
      display_order: Number(display_order)
    };
    memorySkills = memorySkills.map(s => s.id === Number(id) ? updated : s);
    return updated;
  }
};

const deleteSkill = async (id) => {
  try {
    await query('DELETE FROM skills WHERE id = ?', [id]);
    memorySkills = memorySkills.filter(s => s.id !== Number(id));
    return true;
  } catch (error) {
    console.warn('[SKILLS SERVICE] Deleting skill in-memory fallback:', error.message);
    memorySkills = memorySkills.filter(s => s.id !== Number(id));
    return true;
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
