'use client';

import React, { useState, useEffect } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../../services/skillService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { Plus, Edit2, Trash2, X, Check, Sparkles, Layers } from 'lucide-react';

export default function AdminSkillsPage() {
  const { showToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 90,
    icon: 'Layers',
  });

  const loadData = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_skills');
      }
      const data = await getSkills();
      setSkills(data || []);
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
    setFormData({ name: '', category: 'Frontend', proficiency: 90, icon: 'Layers' });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency || 85,
      icon: skill.icon || 'Layers',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        setSkills(skills.filter((s) => s.id !== id));
        showToast('Skill deleted successfully!', 'info');
      } catch (err) {
        showToast(err.response?.data?.message || err.message || 'Error deleting skill', 'error');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSkill(editingId, formData);
        setSkills(skills.map((s) => (s.id === editingId ? { ...formData, id: editingId } : s)));
        showToast(`Skill "${formData.name}" updated successfully!`, 'success');
      } else {
        const newSkill = await createSkill(formData);
        setSkills([...skills, newSkill]);
        showToast(`Skill "${formData.name}" added successfully!`, 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || err.message || 'Error saving skill', 'error');
    }
  };

  if (loading) return <Loading message="Loading skills repository..." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Skills &amp; Capabilities
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage technical proficiencies, categories, and progress indicators.
          </p>
        </div>
        <button type="button" onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Table */}
      <div className="glass-card" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Skill Name
              </th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Category
              </th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Proficiency
              </th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', textAlign: 'right' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '3.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>No skills added yet</p>
                  <p style={{ fontSize: '0.875rem' }}>Click &quot;+ Add Skill&quot; above to add your first technical skill to MySQL.</p>
                </td>
              </tr>
            ) : (
              skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {skill.name}
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: 'var(--badge-bg)',
                      color: 'var(--primary-indigo-light)',
                      border: '1px solid var(--badge-border)',
                    }}
                  >
                    {skill.category}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '120px', height: '6px', borderRadius: '9999px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${skill.proficiency}%`,
                          background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                          borderRadius: '9999px',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(skill)}
                      style={{
                        padding: '0.4rem',
                        borderRadius: '0.5rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--primary-indigo-light)',
                        cursor: 'pointer',
                      }}
                      title="Edit Skill"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(skill.id)}
                      style={{
                        padding: '0.4rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                      title="Delete Skill"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '2rem', borderRadius: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  className="input-custom"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-custom"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools & DevOps">Tools &amp; DevOps</option>
                  <option value="Architecture">Architecture</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Proficiency Level ({formData.proficiency}%)
                </label>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--primary-indigo)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  {editingId ? 'Save Changes' : 'Create Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
