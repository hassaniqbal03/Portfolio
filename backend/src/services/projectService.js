const { query } = require('../config/db');

const DEFAULT_PROJECTS = [];

let memoryProjects = [];

const formatProject = (proj) => {
  if (!proj) return null;

  let techs = proj.technologies;
  if (typeof techs === 'string') {
    try {
      techs = JSON.parse(techs);
    } catch (e) {
      techs = techs.split(',').map(t => t.trim());
    }
  }

  let highlights = proj.highlights;
  if (typeof highlights === 'string') {
    try {
      highlights = JSON.parse(highlights);
    } catch (e) {
      highlights = highlights.split('\n').filter(Boolean);
    }
  }

  const shortDesc = proj.short_description || proj.shortDescription || '';
  const detailedDesc = proj.detailed_description || proj.detailedDescription || proj.fullDescription || '';
  const img = proj.image_url || proj.imageUrl || proj.image || '';
  const gitUrl = proj.github_url || proj.githubUrl || '';
  const liveUrl = proj.live_url || proj.liveUrl || '';
  const feat = Boolean(proj.featured);

  return {
    id: proj.id,
    title: proj.title,
    slug: proj.slug,
    category: proj.category || 'Full Stack',
    featured: feat,
    short_description: shortDesc,
    shortDescription: shortDesc,
    detailed_description: detailedDesc,
    detailedDescription: detailedDesc,
    fullDescription: detailedDesc,
    image_url: img,
    imageUrl: img,
    image: img,
    github_url: gitUrl,
    githubUrl: gitUrl,
    live_url: liveUrl,
    liveUrl: liveUrl,
    technologies: Array.isArray(techs) ? techs : [],
    highlights: Array.isArray(highlights) ? highlights : [],
    challenges: proj.challenges || '',
    solution: proj.solution || '',
    display_order: proj.display_order || 0
  };
};

const getAllProjects = async (category = null, featured = null) => {
  try {
    let sql = `
      SELECT 
        p.*,
        COALESCE(
          (
            SELECT JSON_ARRAYAGG(t.name)
            FROM project_technologies pt
            JOIN technologies t ON pt.technology_id = t.id
            WHERE pt.project_id = p.id
          ),
          JSON_ARRAY()
        ) AS technologies
      FROM projects p
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND p.category = ?';
      params.push(category);
    }

    if (featured !== null && featured !== undefined) {
      sql += ' AND p.featured = ?';
      params.push(featured ? 1 : 0);
    }

    sql += ' ORDER BY p.display_order ASC, p.id DESC';

    const rows = await query(sql, params);
    return (rows || []).map(formatProject);
  } catch (error) {
    console.warn('[PROJECTS SERVICE] In-memory projects fallback:', error.message);
    let filtered = memoryProjects;
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured !== null && featured !== undefined) {
      filtered = filtered.filter(p => Boolean(p.featured) === Boolean(featured));
    }
    return filtered.map(formatProject);
  }
};

const getProjectBySlugOrId = async (identifier) => {
  try {
    const isNum = /^\d+$/.test(identifier);
    let sql = `
      SELECT 
        p.*,
        COALESCE(
          (
            SELECT JSON_ARRAYAGG(t.name)
            FROM project_technologies pt
            JOIN technologies t ON pt.technology_id = t.id
            WHERE pt.project_id = p.id
          ),
          JSON_ARRAY()
        ) AS technologies
      FROM projects p
      WHERE p.slug = ?
    `;
    let params = [identifier];

    if (isNum) {
      sql = `
        SELECT 
          p.*,
          COALESCE(
            (
              SELECT JSON_ARRAYAGG(t.name)
              FROM project_technologies pt
              JOIN technologies t ON pt.technology_id = t.id
              WHERE pt.project_id = p.id
            ),
            JSON_ARRAY()
          ) AS technologies
        FROM projects p
        WHERE p.slug = ? OR p.id = ?
      `;
      params = [identifier, Number(identifier)];
    }

    const rows = await query(sql, params);
    if (rows && rows.length > 0) {
      return formatProject(rows[0]);
    }

    const mem = memoryProjects.find(p => p.slug === identifier || (isNum && p.id === Number(identifier)));
    return mem ? formatProject(mem) : null;
  } catch (error) {
    const isNum = /^\d+$/.test(identifier);
    const mem = memoryProjects.find(p => p.slug === identifier || (isNum && p.id === Number(identifier)));
    return mem ? formatProject(mem) : null;
  }
};

const syncProjectTechnologies = async (projectId, techList) => {
  if (!Array.isArray(techList) || techList.length === 0) return;
  try {
    await query('DELETE FROM project_technologies WHERE project_id = ?', [projectId]);
    for (const name of techList) {
      const clean = (name || '').trim();
      if (!clean) continue;
      await query('INSERT INTO technologies (name) VALUES (?) ON DUPLICATE KEY UPDATE name=name', [clean]);
      const rows = await query('SELECT id FROM technologies WHERE name = ? LIMIT 1', [clean]);
      if (rows && rows.length > 0) {
        await query('INSERT IGNORE INTO project_technologies (project_id, technology_id) VALUES (?, ?)', [projectId, rows[0].id]);
      }
    }
  } catch (err) {
    console.warn('[PROJECTS SERVICE] Sync project technologies error:', err.message);
  }
};

const createProject = async (data) => {
  const title = data.title;
  let slug = data.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category = data.category || 'fullstack';
  const featured = data.featured ? 1 : 0;
  const shortDescription = data.shortDescription || data.short_description || '';
  const detailedDescription = data.detailedDescription || data.detailed_description || data.fullDescription || shortDescription;
  const imageUrl = data.imageUrl || data.image_url || data.image || '';
  const githubUrl = data.githubUrl || data.github_url || '';
  const liveUrl = data.liveUrl || data.live_url || '';
  const technologies = Array.isArray(data.technologies) ? data.technologies : (typeof data.technologies === 'string' ? data.technologies.split(',').map(s => s.trim()) : []);
  const displayOrder = data.displayOrder || data.display_order || 0;

  try {
    const result = await query(
      `INSERT INTO projects (title, slug, category, featured, short_description, detailed_description, image_url, github_url, live_url, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, category, featured, shortDescription, detailedDescription, imageUrl, githubUrl, liveUrl, displayOrder]
    );
    const newId = result.insertId;

    // Relational sync to project_technologies
    await syncProjectTechnologies(newId, technologies);

    const newProj = formatProject({
      id: newId,
      title,
      slug,
      category,
      featured,
      short_description: shortDescription,
      detailed_description: detailedDescription,
      image_url: imageUrl,
      github_url: githubUrl,
      live_url: liveUrl,
      technologies,
      display_order: displayOrder
    });
    memoryProjects.push(newProj);
    return newProj;
  } catch (error) {
    console.warn('[PROJECTS SERVICE] Create project fallback:', error.message);
    const newProj = formatProject({
      id: Date.now(),
      title,
      slug,
      category,
      featured,
      short_description: shortDescription,
      detailed_description: detailedDescription,
      image_url: imageUrl,
      github_url: githubUrl,
      live_url: liveUrl,
      technologies,
      display_order: displayOrder
    });
    memoryProjects.push(newProj);
    return newProj;
  }
};

const updateProject = async (id, data) => {
  const title = data.title;
  let slug = data.slug || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
  const category = data.category || 'fullstack';
  const featured = data.featured ? 1 : 0;
  const shortDescription = data.shortDescription || data.short_description || '';
  const detailedDescription = data.detailedDescription || data.detailed_description || data.fullDescription || shortDescription;
  const imageUrl = data.imageUrl || data.image_url || data.image || '';
  const githubUrl = data.githubUrl || data.github_url || '';
  const liveUrl = data.liveUrl || data.live_url || '';
  const technologies = Array.isArray(data.technologies) ? data.technologies : (typeof data.technologies === 'string' ? data.technologies.split(',').map(s => s.trim()) : []);
  const displayOrder = data.displayOrder || data.display_order || 0;

  try {
    await query(
      `UPDATE projects SET title = ?, slug = ?, category = ?, featured = ?, short_description = ?, detailed_description = ?, image_url = ?, github_url = ?, live_url = ?, display_order = ?
       WHERE id = ?`,
      [title, slug, category, featured, shortDescription, detailedDescription, imageUrl, githubUrl, liveUrl, displayOrder, id]
    );

    // Relational sync to project_technologies
    await syncProjectTechnologies(id, technologies);

    const updated = formatProject({
      id: Number(id),
      title,
      slug,
      category,
      featured,
      short_description: shortDescription,
      detailed_description: detailedDescription,
      image_url: imageUrl,
      github_url: githubUrl,
      live_url: liveUrl,
      technologies,
      display_order: displayOrder
    });
    memoryProjects = memoryProjects.map(p => p.id === Number(id) ? updated : p);
    return updated;
  } catch (error) {
    console.warn('[PROJECTS SERVICE] Update project fallback:', error.message);
    const updated = formatProject({
      id: Number(id),
      title,
      slug,
      category,
      featured,
      short_description: shortDescription,
      detailed_description: detailedDescription,
      image_url: imageUrl,
      github_url: githubUrl,
      live_url: liveUrl,
      technologies,
      display_order: displayOrder
    });
    memoryProjects = memoryProjects.map(p => p.id === Number(id) ? updated : p);
    return updated;
  }
};

const deleteProject = async (id) => {
  try {
    await query('DELETE FROM projects WHERE id = ?', [id]);
    memoryProjects = memoryProjects.filter(p => p.id !== Number(id));
    return true;
  } catch (error) {
    console.warn('[PROJECTS SERVICE] Delete project fallback:', error.message);
    memoryProjects = memoryProjects.filter(p => p.id !== Number(id));
    return true;
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject,
};
