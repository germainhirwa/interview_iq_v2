'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Database } from '../../../../database.types'

type Opportunity = Database['public']['Tables']['opportunities']['Row']

interface Props {
  opportunities: Opportunity[]
  totalCount: number
}

// Derive title categories for filter chips
const ROLE_KEYWORDS: Record<string, string[]> = {
  'SWE': ['software engineer', 'software developer', 'swe', 'frontend', 'backend', 'fullstack', 'full-stack'],
  'PM': ['product manager', 'program manager', 'product management', 'pm intern'],
  'Data / ML': ['data scientist', 'data analyst', 'machine learning', 'data engineer', 'ml engineer', 'ai researcher'],
  'Design': ['designer', 'ux', 'ui', 'product design', 'visual design'],
  'Research': ['research', 'researcher'],
  'Quant / Finance': ['quant', 'finance', 'financial', 'trading', 'investment'],
  'Hardware / Embedded': ['firmware', 'hardware', 'electrical', 'embedded', 'mechanical engineer'],
}

function matchesRole(title: string, role: string): boolean {
  const lower = title.toLowerCase()
  return (ROLE_KEYWORDS[role] ?? []).some(kw => lower.includes(kw))
}

export default function OpportunitiesClient({ opportunities, totalCount }: Props) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [sortBy, setSortBy] = useState('Highest Pay')

  const filtered = useMemo(() => {
    let result = opportunities

    // Remote only
    if (remoteOnly) {
      result = result.filter(o => (o.location ?? '').toLowerCase().includes('remote'))
    }

    // Role chip filter
    if (roleFilter !== 'All Roles') {
      result = result.filter(o => matchesRole(o.title, roleFilter))
    }

    // Live search — company, title, location, tags
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(o =>
        o.company.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        (o.location ?? '').toLowerCase().includes(q) ||
        (o.tags ?? []).some(t => t.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sortBy) {
      case 'Highest Pay':
        result = [...result].sort((a, b) => (b.pay_hr ?? 0) - (a.pay_hr ?? 0))
        break
      case 'Most Recent':
        result = [...result].sort((a, b) => {
          const da = a.created_at ?? ''
          const db = b.created_at ?? ''
          return db.localeCompare(da)
        })
        break
      case 'Alphabetical':
        result = [...result].sort((a, b) => a.company.localeCompare(b.company))
        break
    }

    return result
  }, [opportunities, search, roleFilter, remoteOnly, sortBy])

  // Avg pay from all loaded opps with pay data
  const withPay = opportunities.filter(o => o.pay_hr && o.pay_hr > 0)
  const avgPay = withPay.length
    ? (withPay.reduce((s, o) => s + (o.pay_hr ?? 0), 0) / withPay.length).toFixed(2)
    : '—'
  const avgMonthly = withPay.length
    ? Math.round(withPay.reduce((s, o) => s + (o.pay_monthly ?? 0), 0) / withPay.length).toLocaleString()
    : '—'

  const roleChips = ['All Roles', ...Object.keys(ROLE_KEYWORDS), 'Remote Only']

  return (
    <div className="page active">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-title">💼 Opportunities</div>
          <div className="page-sub">
            Open internships scraped from Levels.fyi — {totalCount.toLocaleString()} US roles
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Avg Intern Pay</div>
          <div className="stat-value">${avgPay} <span>/hr</span></div>
          <div className="stat-change">Across {withPay.length.toLocaleString()}+ listings</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Monthly</div>
          <div className="stat-value">${avgMonthly} <span>/mo</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Listings</div>
          <div className="stat-value">{totalCount.toLocaleString()} <span>roles</span></div>
          <div className="stat-change">Updated daily</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)', fontSize: 16, pointerEvents: 'none', opacity: 0.4,
        }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search company, title, location, tags…"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 16px 11px 40px',
            borderRadius: 12, background: 'var(--surface)',
            border: '1px solid var(--border2)', color: 'var(--text)',
            fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            outline: 'none', transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border2)')}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)', background: 'none',
            border: 'none', color: 'var(--text3)', cursor: 'pointer',
            fontSize: 18, lineHeight: 1,
          }}>×</button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Role chips */}
        {roleChips.map(chip => {
          if (chip === 'Remote Only') return (
            <button
              key={chip}
              className={`filter-btn ${remoteOnly ? 'active' : ''}`}
              onClick={() => setRemoteOnly(v => !v)}
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              🌐 Remote Only
            </button>
          )
          return (
            <button
              key={chip}
              className={`filter-btn ${roleFilter === chip ? 'active' : ''}`}
              onClick={() => setRoleFilter(chip)}
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              {chip}
            </button>
          )
        })}
        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            marginLeft: 'auto',
            background: 'var(--surface)', border: '1px solid var(--border2)',
            color: 'var(--text2)', padding: '8px 12px',
            borderRadius: 8, fontFamily: "'DM Sans',sans-serif",
            fontSize: 13, cursor: 'pointer', outline: 'none',
          }}
        >
          <option>Highest Pay</option>
          <option>Most Recent</option>
          <option>Alphabetical</option>
        </select>
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14 }}>
        Showing <strong style={{ color: 'var(--text2)' }}>{filtered.length.toLocaleString()}</strong> of {totalCount.toLocaleString()} listings
        {search && <> matching <em style={{ color: 'var(--accent2)' }}>&ldquo;{search}&rdquo;</em></>}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">🔭</div>
          <h3>No opportunities found</h3>
          <p>Try a different search or clear your filters.</p>
          <button
            className="filter-btn active"
            onClick={() => { setSearch(''); setRoleFilter('All Roles'); setRemoteOnly(false) }}
            style={{ marginTop: 16, fontSize: 13 }}
          >Clear all filters</button>
        </div>
      ) : (
        <div className="opp-list">
          {filtered.slice(0, 200).map(o => (
            <OppCard key={o.id} o={o} />
          ))}
          {filtered.length > 200 && (
            <div style={{ textAlign: 'center', padding: '16px 0', fontSize: 13, color: 'var(--text3)' }}>
              Showing top 200 results — refine your search to see more
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function OppCard({ o }: { o: Opportunity }) {
  const [imgError, setImgError] = useState(false)

  const payLabel = o.pay_hr
    ? `$${o.pay_hr}/hr`
    : o.pay_monthly
      ? `$${o.pay_monthly.toLocaleString()}/mo`
      : 'Pay N/A'

  const moLabel = o.pay_monthly
    ? `$${o.pay_monthly.toLocaleString()}/mo`
    : o.pay_hr
      ? `~$${Math.round(o.pay_hr * 160).toLocaleString()}/mo`
      : null

  const deadlineDays = (() => {
    if (!o.deadline) return null
    const diff = Math.ceil((new Date(o.deadline).getTime() - Date.now()) / 86400000)
    return diff
  })()

  const badge = (() => {
    if (o.is_rolling) return (
      <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'JetBrains Mono',monospace" }}>
        Rolling
      </span>
    )
    if (deadlineDays !== null) {
      if (deadlineDays <= 3) return (
        <span className="deadline-badge deadline-urgent">⏰ {deadlineDays}d left</span>
      )
      if (deadlineDays <= 14) return (
        <span className="deadline-badge deadline-soon">📅 {deadlineDays}d left</span>
      )
      return (
        <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono',monospace" }}>
          Due {new Date(o.deadline!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      )
    }
    return (
      <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono',monospace" }}>Open</span>
    )
  })()

  const card = (
    <div className="opp-card" style={{ cursor: o.link ? 'pointer' : 'default' }}>
      {/* Logo */}
      <div className="opp-logo" style={{ overflow: 'hidden' }}>
        {o.logo_emoji && !imgError ? (
          <Image
            src={o.logo_emoji}
            alt={o.company}
            width={36}
            height={36}
            style={{ objectFit: 'contain', borderRadius: 6 }}
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span style={{ fontSize: 20 }}>
            {o.company.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="opp-company">{o.company}</div>
        <div className="opp-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {o.title}
        </div>
        {o.tags && o.tags.length > 0 && (
          <div className="opp-tags">
            {o.tags.slice(0, 4).map(t => (
              <span key={t} className="chip" style={{ fontSize: 10, padding: '2px 7px' }}>{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="opp-meta">
        <div className="opp-pay" style={{ color: payLabel === 'Pay N/A' ? 'var(--text3)' : 'var(--green)' }}>
          {payLabel}
        </div>
        {moLabel && <div className="opp-pay-label">{moLabel}</div>}
        <div className="opp-location">📍 {o.location ?? 'Location N/A'}</div>
        <div style={{ marginTop: 6 }}>{badge}</div>
      </div>
    </div>
  )

  if (o.link) {
    return (
      <a href={o.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </a>
    )
  }
  return card
}
