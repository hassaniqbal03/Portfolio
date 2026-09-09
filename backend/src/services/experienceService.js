const { query } = require('../config/db');

const DEFAULT_EXPERIENCE = [];

let memoryExperience = [];

const formatExp = (exp) => {
  if (!exp) return null;
  let techs = exp.technologies;
  if (typeof techs === 'string') {
    try {
      techs = JSON.parse(techs);
    } catch (e) {
      techs = techs.split(',').map(t => t.trim());
    }
  }
  return {
    id: exp.id,
    jobTitle: exp.job_title || exp.jobTitle,
    job_title: exp.job_title || exp.jobTitle,
    company: exp.company,
    employmentType: exp.employment_type || exp.employmentType || 'Full-time',
    employment_type: exp.employment_type || exp.employmentType || 'Full-time',
    period: `${exp.start_date || ''} - ${exp.current ? 'Present' : (exp.end_date || 'Present')}`,
    start_date: exp.start_date,
    startDate: exp.start_date,
    end_date: exp.end_date,
    endDate: exp.end_date,
    current: Boolean(exp.current),
    description: exp.description,
    technologies: Array.isArray(techs) ? techs : [],
    display_order: exp.display_order || 0
  };
};

const getAllExperience = async () => {
  try {
    const rows = await query('SELECT * FROM experiences ORDER BY display_order ASC, id DESC');
    return (rows || []).map(formatExp);
  } catch (error) {
    console.warn('[EXP SERVICE] In-memory experience fallback:', error.message);
    return memoryExperience.map(formatExp);
  }
};

const getExperienceById = async (id) => {
  try {
    const rows = await query('SELECT * FROM experiences WHERE id = ?', [id]);
    if (rows && rows.length > 0) {
      return formatExp(rows[0]);
    }
    return formatExp(memoryExperience.find(e => e.id === Number(id))) || null;
  } catch (error) {
    return formatExp(memoryExperience.find(e => e.id === Number(id))) || null;
  }
};

const createExperience = async (data) => {
  const jobTitle = data.jobTitle || data.job_title || '';
  const company = data.company || '';
  const employmentType = data.employmentType || data.employment_type || 'Full-time';
  const startDate = data.startDate || data.start_date || '';
  const endDate = data.endDate || data.end_date || null;
  const current = data.current ? 1 : 0;
  const description = data.description || '';
  const technologies = Array.isArray(data.technologies) ? JSON.stringify(data.technologies) : (data.technologies || '[]');
  const displayOrder = data.displayOrder || data.display_order || 0;

  try {
    const result = await query(
      `INSERT INTO experiences (job_title, company, employment_type, start_date, end_date, current, description, technologies, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [jobTitle, company, employmentType, startDate, endDate, current, description, technologies, displayOrder]
    );
    const newExp = formatExp({
      id: result.insertId,
      job_title: jobTitle,
      company,
      employment_type: employmentType,
      start_date: startDate,
      end_date: endDate,
      current,
      description,
      technologies,
      display_order: displayOrder
    });
    memoryExperience.push(newExp);
    return newExp;
  } catch (error) {
    console.warn('[EXP SERVICE] Create experience fallback:', error.message);
    const newExp = formatExp({
      id: Date.now(),
      job_title: jobTitle,
      company,
      employment_type: employmentType,
      start_date: startDate,
      end_date: endDate,
      current,
      description,
      technologies,
      display_order: displayOrder
    });
    memoryExperience.push(newExp);
    return newExp;
  }
};

const updateExperience = async (id, data) => {
  const jobTitle = data.jobTitle || data.job_title || '';
  const company = data.company || '';
  const employmentType = data.employmentType || data.employment_type || 'Full-time';
  const startDate = data.startDate || data.start_date || '';
  const endDate = data.endDate || data.end_date || null;
  const current = data.current ? 1 : 0;
  const description = data.description || '';
  const technologies = Array.isArray(data.technologies) ? JSON.stringify(data.technologies) : (data.technologies || '[]');
  const displayOrder = data.displayOrder || data.display_order || 0;

  try {
    await query(
      `UPDATE experiences SET job_title = ?, company = ?, employment_type = ?, start_date = ?, end_date = ?, current = ?, description = ?, technologies = ?, display_order = ?
       WHERE id = ?`,
      [jobTitle, company, employmentType, startDate, endDate, current, description, technologies, displayOrder, id]
    );
    const updated = formatExp({
      id: Number(id),
      job_title: jobTitle,
      company,
      employment_type: employmentType,
      start_date: startDate,
      end_date: endDate,
      current,
      description,
      technologies,
      display_order: displayOrder
    });
    memoryExperience = memoryExperience.map(e => e.id === Number(id) ? updated : e);
    return updated;
  } catch (error) {
    console.warn('[EXP SERVICE] Update experience fallback:', error.message);
    const updated = formatExp({
      id: Number(id),
      job_title: jobTitle,
      company,
      employment_type: employmentType,
      start_date: startDate,
      end_date: endDate,
      current,
      description,
      technologies,
      display_order: displayOrder
    });
    memoryExperience = memoryExperience.map(e => e.id === Number(id) ? updated : e);
    return updated;
  }
};

const deleteExperience = async (id) => {
  try {
    await query('DELETE FROM experiences WHERE id = ?', [id]);
    memoryExperience = memoryExperience.filter(e => e.id !== Number(id));
    return true;
  } catch (error) {
    console.warn('[EXP SERVICE] Delete experience fallback:', error.message);
    memoryExperience = memoryExperience.filter(e => e.id !== Number(id));
    return true;
  }
};

module.exports = {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
