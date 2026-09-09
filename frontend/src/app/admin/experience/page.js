'use client';

import React, { useState, useEffect } from 'react';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../../../services/experienceService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { Plus, Edit2, Trash2, X, Briefcase, Calendar } from 'lucide-react';

export default function AdminExperiencePage() {
  const { showToast } = useToast();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    employmentType: 'Full-time',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: '',
  });

  const loadData = async () => {
    try {
      const data = await getExperience();
      setExperiences(data || []);
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
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: '',
      technologies: 'React, Next.js, Node.js',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      jobTitle: exp.jobTitle,
      company: exp.company,
      employmentType: exp.employmentType,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: !!exp.current,
      description: exp.description,
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : exp.technologies || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this experience entry?')) {
      try {
        await deleteExperience(id);
        setExperiences(experiences.filter((e) => e.id !== id));
        showToast('Experience record deleted successfully!', 'info');
      } catch (err) {
        showToast('Error deleting experience', 'error');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateExperience(editingId, payload);
        setExperiences(experiences.map((e) => (e.id === editingId ? { ...payload, id: editingId } : e)));
        showToast(`Experience at "${formData.company}" updated successfully!`, 'success');
      } else {
        const newExp = await createExperience(payload);
        setExperiences([...experiences, newExp]);
        showToast(`Experience at "${formData.company}" added successfully!`, 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast('Error saving experience', 'error');
    }
  };

  if (loading) return <Loading message="Loading work experiences..." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Work Experience Timeline
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage career history, employment milestones, and technology stacks.
          </p>
        </div>
        <button type="button" onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
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
          <Briefcase size={40} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Experiences Added Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            All mock experiences have been cleared. Click &ldquo;Add Experience&rdquo; to add your real career milestones and work history.
          </p>
          <button type="button" onClick={handleOpenAdd} className="btn-primary" style={{ margin: '0 auto' }}>
            <Plus size={16} />
            <span>Add First Experience</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: '1.25rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {exp.jobTitle}
                </h3>
                {exp.current && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    Current
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-indigo-light)', marginBottom: '0.5rem' }}>
                {exp.company} &bull; {exp.employmentType} &bull; {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                {exp.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {exp.technologies?.map((tech, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'var(--badge-bg)', color: 'var(--primary-indigo-light)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleOpenEdit(exp)}
                style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--primary-indigo-light)', cursor: 'pointer' }}
                title="Edit Experience"
              >
                <Edit2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(exp.id)}
                style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', cursor: 'pointer' }}
                title="Delete Experience"
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
          <div className="glass-card" style={{ width: '100%', maxWidth: '540px', padding: '2rem', borderRadius: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingId ? 'Edit Experience' : 'Add Work Experience'}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Job Title</label>
                  <input type="text" required value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} className="input-custom" placeholder="Senior Developer" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Company</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="input-custom" placeholder="Acme Corp" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Start Date</label>
                  <input type="text" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="input-custom" placeholder="2022" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>End Date</label>
                  <input type="text" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="input-custom" placeholder="Present" />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.current} onChange={(e) => setFormData({ ...formData, current: e.target.checked })} />
                  <span>Currently working in this role</span>
                </label>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Description</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-custom" placeholder="Key responsibilities and achievements..." />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Technologies (comma separated)</label>
                <input type="text" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} className="input-custom" placeholder="React, Node.js, MySQL" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Save Changes' : 'Create Record'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
