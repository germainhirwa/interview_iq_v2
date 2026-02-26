'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <div className="logo-cube">IQ</div>
          InterviewIQ
        </Link>

        {sent ? (
          <div className="auth-success">
            <div className="auth-success-icon">✉️</div>
            <h2>Check your email</h2>
            <p>We sent a magic link to <strong>{email}</strong>. Click it to sign in — no password needed.</p>
            <p className="auth-note">Don&apos;t see it? Check spam or <button onClick={() => setSent(false)} className="auth-link">try again</button>.</p>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Sign in with your university email to access the recruiting hub.</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field">
                <label htmlFor="email">University Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="auth-input"
                  autoFocus
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="btn-hero auth-submit" disabled={loading}>
                {loading ? 'Sending link...' : 'Send Magic Link →'}
              </button>
            </form>

            <p className="auth-note">
              We&apos;ll send you a one-click sign-in link. No password required.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
