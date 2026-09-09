'use client';

import React, { useState, useEffect } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../../services/educationService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { Plus, Edit2, Trash2, X, GraduationCap, Calendar } from 'lucide-react';

export default function AdminEducationPage() {
  const { showToast } = useToast();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    description: '',
    highlights: '',
  });

  const loadData = async () => {
    try {
      const data = await getEducation();
      setEducations(data || []);
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
      degree: '',
      institution: '',
      startYear: '2019',
      endYear: '2023',
      description: '',
      highlights: 'Data Structures, Software Engineering, Web Systems',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingId(edu.id);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear,
      description: edu.description,
      highlights: Array.isArray(edu.highlights) ? edu.highlights.join(', ') : edu.highlights || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this education entry?')) {
      try {
        await deleteEducation(id);
        setEducations(educations.filter((e) => e.id !== id));
        showToast('Education record deleted successfully!', 'info');
      } catch (err) {
        showToast('Error deleting education', 'error');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      highlights: formData.highlights.split(',').map((h) => h.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateEducation(editingId, payload);
        setEducations(educations.map((e) => (e.id === editingId ? { ...payload, id: editingId } : e)));
        showToast(`Education at "${formData.institution}" updated successfully!`, 'success');
      } else {
        const newEdu = await createEducation(payload);
        setEducations([...educations, newEdu]);
        showToast(`Education at "${formData.institution}" added successfully!`, 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast('Error saving education', 'error');
    }
  };

  if (loading) return <Loading message="Loading education credentials..." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Education &amp; Credentials
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage degrees, academic credentials, and professional certifications.
          </p>
        </div>
        <button type="button" onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      {educations.length === 0 ? (
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
          <GraduationCap size={40} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Education Credentials Yet
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            All mock credentials have been cleared. Click &ldquo;Add Education&rdquo; to add your real degrees and certifications.
          </p>
          <button type="button" onClick={handleOpenAdd} className="btn-primary" style={{ margin: '0 auto' }}>
            <Plus size={16} />
            <span>Add First Education</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {educations.map((edu) => (
            <div
              key={edu.id}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {edu.degree}
                </h3>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-indigo-light)', marginBottom: '0.5rem' }}>
                  {edu.institution} &bull; {edu.startYear} - {edu.endYear}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {edu.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {edu.highlights?.map((h, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: 'var(--badge-bg)', color: 'var(--primary-indigo-light)' }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(edu)}
                  style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--primary-indigo-light)', cursor: 'pointer' }}
                  title="Edit Education"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', cursor: 'pointer' }}
                  title="Delete Education"
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
                {editingId ? 'Edit Education' : 'Add Education Credential'}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Degree / Certification</label>
                <input type="text" required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="input-custom" placeholder="Bachelor of Science in Computer Science" />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Institution / University</label>
                <input type="text" required value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="input-custom" placeholder="University Name" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Start Year</label>
                  <input type="text" required value={formData.startYear} onChange={(e) => setFormData({ ...formData, startYear: e.target.value })} className="input-custom" placeholder="2019" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>End Year</label>
                  <input type="text" required value={formData.endYear} onChange={(e) => setFormData({ ...formData, endYear: e.target.value })} className="input-custom" placeholder="2023" />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Description</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-custom" placeholder="Academic specialization, thesis or honors..." />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Key Subjects / Highlights (comma separated)</label>
                <input type="text" value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} className="input-custom" placeholder="Data Structures, Algorithms, Software Architecture" />
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
