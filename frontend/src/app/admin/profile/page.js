'use client';

import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../../services/profileService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { User, Save, Loader2 } from 'lucide-react';

export default function AdminProfilePage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    status: '',
    shortBio: '',
    fullBio: '',
    journey: '',
    interests: '',
    philosophy: '',
    email: '',
    phone: '',
    location: '',
    avatar: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await getProfile();
        if (res?.profile) {
          setProfile(res.profile);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await updateProfile(profile);
      const successMsg = res?.message || 'Profile updated successfully!';
      showToast(successMsg, 'success');
    } catch (err) {
      const errorMsg = err.message || 'Error updating profile.';
      showToast(errorMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading profile information..." />;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Profile Configuration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Update your public portfolio biography, hero introduction, and contact channels.
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              required
              className="input-custom"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={profile.title || ''}
              onChange={handleChange}
              required
              className="input-custom"
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Availability Status Banner
          </label>
          <input
            type="text"
            name="status"
            value={profile.status || ''}
            onChange={handleChange}
            className="input-custom"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Hero Short Bio
          </label>
          <textarea
            name="shortBio"
            rows={3}
            value={profile.shortBio || ''}
            onChange={handleChange}
            className="input-custom"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Full Biography (About Section)
          </label>
          <textarea
            name="fullBio"
            rows={4}
            value={profile.fullBio || ''}
            onChange={handleChange}
            className="input-custom"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Public Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              className="input-custom"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profile.phone || ''}
              onChange={handleChange}
              className="input-custom"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Location / Availability
            </label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              className="input-custom"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Avatar Image URL
            </label>
            <input
              type="text"
              name="avatar"
              value={profile.avatar || ''}
              onChange={handleChange}
              className="input-custom"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin-slow" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
