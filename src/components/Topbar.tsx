'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface TopbarProps {
  user: User
  onMenuOpen?: () => void
}

export default function Topbar({ user, onMenuOpen }: TopbarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const supabase = createClient()

  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (query) {
        params.set('q', query)
      } else {
        params.delete('q')
      }
      const newUrl = `${pathname}?${params.toString()}`
      router.push(newUrl, { scroll: false })
    }, 400)

    return () => clearTimeout(timer)
  }, [query, pathname, router, searchParams])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="topbar">
      {/* Mobile hamburger — opens sidebar on small screens */}
      <button
        className="topbar-hamburger"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search companies, experiences, questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <button className="top-btn ghost">🔔</button>
        <button
          className="top-btn primary"
          onClick={() => router.push('/dashboard/feed')}
          aria-label="Share Experience"
        >
          + Share Experience
        </button>
        <button className="top-btn ghost" onClick={handleSignOut} title="Sign out">
          ↩
        </button>
      </div>
    </div>
  )
}
