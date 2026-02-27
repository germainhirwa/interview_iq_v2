'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CURRENT_YEAR = 2026
const GRAD_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]

const MAJORS = [
  'Computer Science', 'Computer Engineering', 'Electrical Engineering',
  'Software Engineering', 'Data Science', 'Mathematics', 'Statistics',
  'Information Systems', 'Cognitive Science', 'Physics',
  'Business / CS (dual)', 'Other',
]

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [major, setMajor] = useState('')
  const [gradYear, setGradYear] = useState<number>(CURRENT_YEAR + 1)

  async function handleSave() {
    if (!name.trim() || !school.trim() || !major || !gradYear) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

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
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="onboarding-bg">
      <div className="onboarding-card">
        {/* Logo */}
        <Link href="/" className="onboarding-logo">
          <div className="logo-cube">IQ</div>
          InterviewIQ
        </Link>

        {/* Progress */}
        <div className="onboarding-progress">
          <div className={`onboarding-step-dot ${step >= 1 ? 'active' : ''}`} />
          <div className="onboarding-step-line" />
          <div className={`onboarding-step-dot ${step >= 2 ? 'active' : ''}`} />
        </div>

        {step === 1 ? (
          <div className="onboarding-body">
            <div className="onboarding-icon">👋</div>
            <h1 className="onboarding-title">Welcome to InterviewIQ</h1>
            <p className="onboarding-sub">
              Let's set up your profile so companies and peers can know who you are.
            </p>

            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)}
                autoFocus
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
              className="onboarding-btn"
              onClick={() => {
                if (!name.trim()) { setError('Please enter your name.'); return }
                setError('')
                setStep(2)
              }}
            >
              Continue →
            </button>
          </div>
        ) : (
          <div className="onboarding-body">
            <div className="onboarding-icon">🎓</div>
            <h1 className="onboarding-title">Your Academic Info</h1>
            <p className="onboarding-sub">
              This helps us show you the most relevant opportunities and company data.
            </p>

            <div className="form-group">
              <label className="form-label">School / University</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. MIT, Stanford, Swarthmore..."
                value={school}
                onChange={e => setSchool(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Major</label>
              <select
                className="form-input form-select"
                value={major}
                onChange={e => setMajor(e.target.value)}
              >
                <option value="" disabled>Select your major...</option>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Expected Graduation Year</label>
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

            {error && <div className="form-error">{error}</div>}

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="onboarding-btn-ghost"
                onClick={() => setStep(1)}
                type="button"
              >
                ← Back
              </button>
              <button
                className="onboarding-btn"
                onClick={handleSave}
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Saving...' : 'Go to Dashboard →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
