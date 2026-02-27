'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const MAJORS = [
  'Computer Science', 'Computer Engineering', 'Electrical Engineering',
  'Software Engineering', 'Data Science', 'Mathematics', 'Statistics',
  'Information Systems', 'Cognitive Science', 'Physics',
  'Business / CS (dual)', 'Other',
]

const GRAD_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [major, setMajor] = useState('')
  const [gradYear, setGradYear] = useState<number>(2026)
  const [email, setEmail] = useState('')
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, school, major, graduation_year, is_premium')
        .eq('id', user.id)
        .single()

      if (profile) {
        setName(profile.display_name || '')
        setSchool(profile.school || '')
        setMajor(profile.major || '')
        setGradYear(profile.graduation_year || 2026)
        setIsPremium(profile.is_premium || false)
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave() {
    if (!name.trim() || !school.trim() || !major) {
      setError('Please fill in all required fields.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        display_name: name.trim(),
        school: school.trim(),
        major,
        graduation_year: gradYear,
      })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
      router.refresh()
    }
    setSaving(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="page active">
        <div style={{ color: 'var(--text3)', fontSize: 14, marginTop: 40, textAlign: 'center' }}>
          Loading profile...
        </div>
      </div>
    )
  }

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">⚙️ Settings</div>
          <div className="page-sub">Manage your profile and account preferences</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          {/* Profile form */}
          <div className="panel-card" style={{ marginBottom: 20 }}>
            <div className="section-title" style={{ marginBottom: 20 }}>👤 Profile Information</div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Display Name</label>
              <input
                className="form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="text"
                value={email}
                disabled
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>
                Email cannot be changed — it's tied to your Google account.
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">School / University</label>
              <input
                className="form-input"
                type="text"
                value={school}
                onChange={e => setSchool(e.target.value)}
                placeholder="e.g. MIT, Stanford..."
              />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Major</label>
              <select
                className="form-input form-select"
                value={major}
                onChange={e => setMajor(e.target.value)}
              >
                <option value="" disabled>Select major...</option>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Graduation Year</label>
              <div className="grad-year-grid">
                {GRAD_YEARS.map(y => (
                  <button
                    key={y}
                    className={`grad-year-btn ${gradYear === y ? 'active' : ''}`}
                    onClick={() => setGradYear(y)}
                    type="button"
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="form-error" style={{ marginBottom: 12 }}>{error}</div>}
            {success && (
              <div style={{ fontSize: 13, color: 'var(--green)', marginBottom: 12 }}>
                ✅ Profile updated successfully!
              </div>
            )}

            <button
              className="onboarding-btn"
              onClick={handleSave}
              disabled={saving}
              style={{ width: '100%' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div>
          {/* Account status */}
          <div className="panel-card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>✨ Account Status</div>
            <div style={{
              padding: 16,
              borderRadius: 10,
              background: isPremium ? 'linear-gradient(135deg,rgba(108,99,255,0.15),rgba(167,139,250,0.1))' : 'var(--surface)',
              border: `1px solid ${isPremium ? 'rgba(108,99,255,0.4)' : 'var(--border2)'}`,
              marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: isPremium ? 'var(--accent2)' : 'var(--text2)' }}>
                {isPremium ? '✨ Premium Member' : '🔒 Free Account'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6, lineHeight: 1.6 }}>
                {isPremium
                  ? 'You have full access to Resources, Referrals, Resume Check, and all future premium features.'
                  : 'Upgrade to unlock Resources, Referrals, and Resume Check during our beta.'}
              </div>
            </div>
            {!isPremium && (
              <button className="premium-upgrade-btn" style={{ width: '100%' }}>
                👑 Request Premium Access
              </button>
            )}
          </div>

          {/* Danger zone */}
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14, color: 'var(--red)' }}>⚠️ Account</div>
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.3)',
                borderRadius: 8,
                color: 'var(--red)',
                fontSize: 13,
                fontFamily: 'var(--body)',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
