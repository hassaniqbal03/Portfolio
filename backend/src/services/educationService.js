const { query } = require('../config/db');

const DEFAULT_EDUCATION = [];

let memoryEducation = [];

const formatEdu = (edu) => {
  if (!edu) return null;
  let info = edu.relevant_information || edu.relevantCoursework;
  if (typeof info === 'string') {
    try {
      info = JSON.parse(info);
    } catch (e) {
      info = info.split(',').map(s => s.trim());
    }
  }
  return {
    id: edu.id,
    degree: edu.degree,
    institution: edu.institution,
    period: `${edu.start_year || edu.startYear || ''} - ${edu.end_year || edu.endYear || ''}`,
    start_year: edu.start_year || edu.startYear,
    startYear: edu.start_year || edu.startYear,
    end_year: edu.end_year || edu.endYear,
    endYear: edu.end_year || edu.endYear,
    description: edu.description,
    relevant_information: Array.isArray(info) ? info : [],
    relevantCoursework: Array.isArray(info) ? info : [],
    highlights: Array.isArray(info) ? info : [],
    display_order: edu.display_order || 0
  };
};

const getAllEducation = async () => {
  try {
    const rows = await query('SELECT * FROM education ORDER BY display_order ASC, id DESC');
    return (rows || []).map(formatEdu);
  } catch (error) {
    console.warn('[EDU SERVICE] In-memory education fallback:', error.message);
    return memoryEducation.map(formatEdu);
  }
};

const getEducationById = async (id) => {
  try {
    const rows = await query('SELECT * FROM education WHERE id = ?', [id]);
    if (rows && rows.length > 0) {
      return formatEdu(rows[0]);
    }
    return formatEdu(memoryEducation.find(e => e.id === Number(id))) || null;
  } catch (error) {
    return formatEdu(memoryEducation.find(e => e.id === Number(id))) || null;
  }
};

const createEducation = async (data) => {
  const degree = data.degree || '';
  const institution = data.institution || '';
  const startYear = data.start_year || data.startYear || '';
  const endYear = data.end_year || data.endYear || '';
  const description = data.description || '';
  const relInfo = Array.isArray(data.relevant_information || data.relevantCoursework || data.highlights)
    ? JSON.stringify(data.relevant_information || data.relevantCoursework || data.highlights)
    : (data.highlights || data.relevant_information || data.relevantCoursework || '[]');
  const displayOrder = data.display_order || data.displayOrder || 0;

  try {
    const result = await query(
      `INSERT INTO education (degree, institution, start_year, end_year, description, relevant_information, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [degree, institution, startYear, endYear, description, relInfo, displayOrder]
    );
    const newEdu = formatEdu({
      id: result.insertId,
      degree,
      institution,
      start_year: startYear,
      end_year: endYear,
      description,
      relevant_information: relInfo,
      display_order: displayOrder
    });
    memoryEducation.push(newEdu);
    return newEdu;
  } catch (error) {
    console.warn('[EDU SERVICE] Create education fallback:', error.message);
    const newEdu = formatEdu({
      id: Date.now(),
      degree,
      institution,
      start_year: startYear,
      end_year: endYear,
      description,
      relevant_information: relInfo,
      display_order: displayOrder
    });
    memoryEducation.push(newEdu);
    return newEdu;
  }
};

const updateEducation = async (id, data) => {
  const degree = data.degree || '';
  const institution = data.institution || '';
  const startYear = data.start_year || data.startYear || '';
  const endYear = data.end_year || data.endYear || '';
  const description = data.description || '';
  const relInfo = Array.isArray(data.relevant_information || data.relevantCoursework || data.highlights)
    ? JSON.stringify(data.relevant_information || data.relevantCoursework || data.highlights)
    : (data.highlights || data.relevant_information || data.relevantCoursework || '[]');
  const displayOrder = data.display_order || data.displayOrder || 0;

  try {
    await query(
      `UPDATE education SET degree = ?, institution = ?, start_year = ?, end_year = ?, description = ?, relevant_information = ?, display_order = ?
       WHERE id = ?`,
      [degree, institution, startYear, endYear, description, relInfo, displayOrder, id]
    );
    const updated = formatEdu({
      id: Number(id),
      degree,
      institution,
      start_year: startYear,
      end_year: endYear,
      description,
      relevant_information: relInfo,
      display_order: displayOrder
    });
    memoryEducation = memoryEducation.map(e => e.id === Number(id) ? updated : e);
    return updated;
  } catch (error) {
    console.warn('[EDU SERVICE] Update education fallback:', error.message);
    const updated = formatEdu({
      id: Number(id),
      degree,
      institution,
      start_year: startYear,
      end_year: endYear,
      description,
      relevant_information: relInfo,
      display_order: displayOrder
    });
    memoryEducation = memoryEducation.map(e => e.id === Number(id) ? updated : e);
    return updated;
  }
};

const deleteEducation = async (id) => {
  try {
    await query('DELETE FROM education WHERE id = ?', [id]);
    memoryEducation = memoryEducation.filter(e => e.id !== Number(id));
    return true;
  } catch (error) {
    console.warn('[EDU SERVICE] Delete education fallback:', error.message);
    memoryEducation = memoryEducation.filter(e => e.id !== Number(id));
    return true;
  }
};

module.exports = {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
