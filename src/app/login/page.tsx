'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      document.cookie = `ref_id=${ref}; path=/; max-age=86400` // 1 day
    }
  }, [searchParams])

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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  )
}