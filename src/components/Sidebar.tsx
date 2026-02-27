'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Profile {
  display_name: string | null
  school: string | null
  graduation_year: number | null
  major: string | null
  is_premium: boolean | null
}

const mainNavItems = [
  { href: '/dashboard', icon: '🏠', label: 'Home' },
  { href: '/dashboard/feed', icon: '📡', label: 'Feed', badge: '24' },
  { href: '/dashboard/companies', icon: '🏢', label: 'Companies' },
  { href: '/dashboard/opportunities', icon: '💼', label: 'Opportunities' },
]

const insightItems = [
  { href: '/dashboard/comp', icon: '💰', label: 'Compensation' },
  { href: '/dashboard/resources', icon: '📚', label: 'Resources', premium: true },
  { href: '/dashboard/referrals', icon: '🤝', label: 'Referrals', premium: true },
]

const youItems = [
  { href: '/dashboard/applications', icon: '🎯', label: 'My Applications' },
  { href: '/dashboard/saved', icon: '⭐', label: 'Saved' },
  { href: '/dashboard/resume', icon: '📄', label: 'Resume Check', premium: true },
]

function getInitials(name: string | null | undefined): string {
  if (!name) return 'U'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Sidebar({ profile }: { profile: Profile | null }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const displayName = profile?.display_name || 'Student'
  const school = profile?.school || 'University'
  const gradYear = profile?.graduation_year
  const major = profile?.major
  const isPremium = profile?.is_premium ?? false

  // Format: "MIT · CS '26" or just "MIT" if no major/year
  const schoolLine = [
    school,
    major ? major.split(' ')[0] : null,        // first word of major e.g. "Computer"
    gradYear ? `'${String(gradYear).slice(2)}` : null,
  ].filter(Boolean).join(' · ')

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <Link href="/" className="logo-mark">
          <div className="logo-icon">IQ</div>
          <div className="logo-text">InterviewIQ</div>
        </Link>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Main</div>
        {mainNavItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item' + (isActive(item.href) ? ' active' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Insights</div>
        {insightItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item' + (isActive(item.href) ? ' active' : '') + (item.premium && !isPremium ? ' nav-item-premium' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.premium && !isPremium && (
              <span className="nav-crown">👑</span>
            )}
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">You</div>
        {youItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item' + (isActive(item.href) ? ' active' : '') + (item.premium && !isPremium ? ' nav-item-premium' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.premium && !isPremium && (
              <span className="nav-crown">👑</span>
            )}
          </Link>
        ))}
      </div>

      {!isPremium && (
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <Link href="/dashboard/invite" style={{
            display: 'block',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: 'white',
            borderRadius: 12,
            padding: '12px 14px',
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(108,99,255,0.2)',
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>🎁</div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Unlock Premium</div>
            <div style={{ opacity: 0.9, fontSize: 11, lineHeight: 1.4 }}>Invite 5 friends to access all features.</div>
          </Link>
        </div>
      )}

      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar">{getInitials(profile?.display_name)}</div>
          <div className="user-info">
            <div className="user-name" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {displayName}
              {isPremium && <span className="premium-badge-sm">✨</span>}
            </div>
            <div className="user-school">{schoolLine}</div>
          </div>
          <Link href="/dashboard/settings" style={{ color: 'var(--text3)', fontSize: 12 }}>⚙️</Link>
        </div>
      </div>
    </nav>
  )
}
