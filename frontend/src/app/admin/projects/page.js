'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, createProject, updateProject, deleteProject } from '../../../services/projectService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { Plus, Edit2, Trash2, X, ExternalLink, Sparkles, FolderGit2, Layers } from 'lucide-react';

export default function AdminProjectsPage() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Full Stack',
    featured: true,
    shortDescription: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    technologies: 'Next.js, React, Node.js, Express, MySQL',
    githubUrl: '',
    liveUrl: '',
    challenges: '',
    solution: '',
  });

  const loadData = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Full Stack',
      featured: false,
      shortDescription: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      technologies: 'React, Next.js, Node.js, Express, MySQL',
      githubUrl: 'https://github.com/mhassaniqbal/',
      liveUrl: 'https://demo.vercel.app',
      challenges: '',
      solution: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      category: proj.category || 'Full Stack',
      featured: !!proj.featured,
      shortDescription: proj.shortDescription || '',
      fullDescription: proj.fullDescription || '',
      image: proj.image || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      challenges: proj.challenges || '',
      solution: proj.solution || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p.id !== id));
        showToast('Project deleted successfully!', 'info');
      } catch (err) {
        showToast('Error deleting project', 'error');
      }
    }
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingId ? prev.slug : generatedSlug,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setProjects(projects.map((p) => (p.id === editingId ? { ...payload, id: editingId } : p)));
        showToast(`Project "${formData.title}" updated successfully!`, 'success');
      } else {
        const newProj = await createProject(payload);
        setProjects([...projects, newProj]);
        showToast(`Project "${formData.title}" created successfully!`, 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast('Error saving project', 'error');
    }
  };

  if (loading) return <Loading message="Loading projects catalog..." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Projects Catalog
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage featured applications, dynamic slugs, source code links, and tech stacks.
          </p>
        </div>
        <button type="button" onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            borderRadius: '1.25rem',
            maxWidth: '550px',
            margin: '0 auto',
          }}
        >
          <Layers size={40} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Projects in Catalog
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            All mock projects have been removed. Click &ldquo;Add Project&rdquo; to add your real engineering applications.
          </p>
          <button type="button" onClick={handleOpenAdd} className="btn-primary" style={{ margin: '0 auto' }}>
            <Plus size={16} />
            <span>Add First Project</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {projects.map((proj) => (
          <div
            key={proj.id || proj.slug}
            className="glass-card"
            style={{
              padding: '1.5rem',
              borderRadius: '1.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '80px',
                  height: '56px',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  background: 'var(--bg-secondary)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                      Featured
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontFamily: 'monospace' }}>
                  /projects/{proj.slug} &bull; <span style={{ color: 'var(--text-muted)' }}>{proj.category}</span>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                href={`/projects/${proj.slug}`}
                target="_blank"
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span>Live View</span>
                <ExternalLink size={13} />
              </Link>

              <button
                type="button"
                onClick={() => handleOpenEdit(proj)}
                style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--primary-indigo-light)', cursor: 'pointer' }}
                title="Edit Project"
              >
                <Edit2 size={16} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(proj.id)}
                style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', cursor: 'pointer' }}
                title="Delete Project"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '640px', padding: '2rem', borderRadius: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Project Title</label>
                  <input type="text" required value={formData.title} onChange={handleTitleChange} className="input-custom" placeholder="e.g. Apex Cloud Commerce" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>URL Slug</label>
                  <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="input-custom" placeholder="apex-cloud-commerce" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-custom">
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                    <span>Featured in hero &amp; badges</span>
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Image URL</label>
                <input type="text" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="input-custom" placeholder="https://images.unsplash.com/..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>GitHub URL</label>
                  <input type="text" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} className="input-custom" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Live Demo URL</label>
                  <input type="text" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} className="input-custom" placeholder="https://demo.vercel.app" />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Short Description</label>
                <textarea rows={2} required value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="input-custom" placeholder="Brief 1-2 sentence overview for cards..." />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Full Description</label>
                <textarea rows={4} required value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} className="input-custom" placeholder="Detailed architectural and functional walkthrough..." />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Technologies (comma separated)</label>
                <input type="text" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} className="input-custom" placeholder="Next.js, React, Node.js, Express, MySQL" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Save Changes' : 'Create Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
