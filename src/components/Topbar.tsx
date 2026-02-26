'use client'

import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface TopbarProps {
  user: User
}

export default function Topbar({ user }: TopbarProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="topbar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search companies, experiences, questions..."
        />
      </div>
      <div className="topbar-right">
        <button className="top-btn ghost">🔔</button>
        <button
          className="top-btn primary"
          onClick={() => router.push('/dashboard/feed')}
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
