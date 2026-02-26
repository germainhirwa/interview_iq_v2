'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleGoogleLogin() {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <div className="logo-cube">IQ</div>
          InterviewIQ
        </Link>

        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in with your Google account to access the recruiting hub.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button
          onClick={handleGoogleLogin}
          className="btn-hero auth-submit"
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Continue with Google →'}
        </button>

        <p className="auth-note">
          You’ll be redirected securely via Google.
        </p>
      </div>
    </div>
  )
}