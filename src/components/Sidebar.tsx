'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const mainNavItems = [
  { href: '/dashboard', icon: '🏠', label: 'Home' },
  { href: '/dashboard/feed', icon: '📡', label: 'Feed', badge: '24' },
  { href: '/dashboard/companies', icon: '🏢', label: 'Companies' },
  { href: '/dashboard/opportunities', icon: '💼', label: 'Opportunities' },
]

const insightItems = [
  { href: '/dashboard/comp', icon: '💰', label: 'Compensation' },
  { href: '/dashboard/resources', icon: '📚', label: 'Resources' },
  { href: '/dashboard/referrals', icon: '🤝', label: 'Referrals' },
]

const youItems = [
  { href: '/dashboard/applications', icon: '🎯', label: 'My Applications' },
  { href: '/dashboard/saved', icon: '⭐', label: 'Saved' },
  { href: '/dashboard/resume', icon: '📄', label: 'Resume Check' },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

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
            className={'nav-item' + (isActive(item.href) ? ' active' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">You</div>
        {youItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item' + (isActive(item.href) ? ' active' : '')}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar">GH</div>
          <div className="user-info">
            <div className="user-name">Germain H.</div>
            <div className="user-school">Swarthmore · CS &apos;26</div>
          </div>
          <Link href="/dashboard/settings" style={{ color: 'var(--text3)', fontSize: 12 }}>⚙️</Link>
        </div>
      </div>
    </nav>
  )
}
