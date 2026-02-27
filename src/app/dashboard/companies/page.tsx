'use client'

import { companies } from '@/lib/data/companies'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'

// Derive unique categories from the data
const ALL_TYPES = ['All', ...Array.from(new Set(companies.map(c => c.type)))]

const DIFF_ORDER: Record<string, number> = {
  'Easy': 1, 'Medium': 2, 'Hard': 3, 'Very Hard': 4, 'Extreme': 5,
}

const DIFF_WIDTH: Record<string, string> = {
  'Easy': '25%', 'Medium': '50%', 'Hard': '70%', 'Very Hard': '85%', 'Extreme': '100%',
}

export default function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('All')
  const [sortBy, setSortBy] = useState('Most Reviews')
  const [hiringOnly, setHiringOnly] = useState(false)

  const filtered = useMemo(() => {
    let result = companies

    // Hiring toggle
    if (hiringOnly) result = result.filter(c => c.is_hiring)

    // Type filter
    if (activeType !== 'All') result = result.filter(c => c.type === activeType)

    // Live search — name, type, industry, tags, location
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        (c.industry ?? '').toLowerCase().includes(q) ||
        (c.location ?? '').toLowerCase().includes(q) ||
        (c.tags ?? []).some(t => t.toLowerCase().includes(q))
      )
    }

    // Sort
    switch (sortBy) {
      case 'Highest Rated':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'Best Pay':
        result = [...result].sort((a, b) => b.avg_pay_hr - a.avg_pay_hr)
        break
      case 'Most Open Roles':
        result = [...result].sort((a, b) => b.open_roles - a.open_roles)
        break
      case 'Easiest':
        result = [...result].sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 0) - (DIFF_ORDER[b.difficulty] ?? 0))
        break
      case 'Most Reviews':
      default:
        result = [...result].sort((a, b) => b.post_count - a.post_count)
        break
    }

    return result
  }, [search, activeType, sortBy, hiringOnly])

  return (
    <div className="page active">
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <div className="page-title">🏢 Companies</div>
          <div className="page-sub">
            Deep recruiting intelligence on {companies.length}+ companies
          </div>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div style={{
        position: 'relative',
        marginBottom: 18,
      }}>
        <span style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 16,
          pointerEvents: 'none',
          opacity: 0.4,
        }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search companies, industries, tags..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '11px 16px 11px 40px',
            borderRadius: 12,
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            color: 'var(--text)',
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border2)')}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text3)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
            }}
          >×</button>
        )}
      </div>

      {/* ── Filter row ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {ALL_TYPES.map(type => (
          <button
            key={type}
            className={`filter-btn ${activeType === type ? 'active' : ''}`}
            onClick={() => setActiveType(type)}
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            {type}
          </button>
        ))}

        <button
          className={`filter-btn ${hiringOnly ? 'active' : ''}`}
          onClick={() => setHiringOnly(v => !v)}
          style={{ fontSize: 12, padding: '6px 14px' }}
        >
          Hiring Now 🟢
        </button>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            marginLeft: 'auto',
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            color: 'var(--text2)',
            padding: '8px 12px',
            borderRadius: 8,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option>Most Reviews</option>
          <option>Highest Rated</option>
          <option>Best Pay</option>
          <option>Most Open Roles</option>
          <option>Easiest</option>
        </select>
      </div>

      {/* ── Result count ── */}
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
        Showing <strong style={{ color: 'var(--text2)' }}>{filtered.length}</strong> of {companies.length} companies
        {search && <> matching <em style={{ color: 'var(--accent2)' }}>&ldquo;{search}&rdquo;</em></>}
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">🔭</div>
          <h3>No companies found</h3>
          <p>Try a different search term or clear your filters.</p>
          <button
            className="filter-btn active"
            onClick={() => { setSearch(''); setActiveType('All'); setHiringOnly(false) }}
            style={{ marginTop: 16, fontSize: 13 }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="companies-grid">
          {filtered.map(c => (
            <Link
              key={c.id}
              href={`/dashboard/companies/${c.slug}`}
              className="company-card"
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <div className="company-card-top">
                <div className="company-logo" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {c.logo_url ? (
                    <Image
                      src={c.logo_url}
                      alt={c.name}
                      width={36}
                      height={36}
                      style={{ objectFit: 'contain', borderRadius: 6 }}
                      unoptimized
                    />
                  ) : (
                    c.logo_emoji
                  )}
                </div>
                <div>
                  <div className="company-name">{c.name}</div>
                  <div className="company-type">{c.type} · {c.location.split(',')[0]}</div>
                </div>
                {c.is_hiring && (
                  <div className="open-roles-badge" style={{ marginLeft: 'auto' }}>
                    <div className="pulse" /> {c.open_roles} open
                  </div>
                )}
              </div>

              <div className="company-stats">
                <div className="company-stat">
                  <div className="company-stat-val">{c.rating}</div>
                  <div className="company-stat-label">Rating</div>
                </div>
                <div className="company-stat">
                  <div className="company-stat-val" style={{ color: 'var(--green)' }}>${c.avg_pay_hr}/hr</div>
                  <div className="company-stat-label">Avg Pay</div>
                </div>
                <div className="company-stat">
                  <div className="company-stat-val">{c.post_count}</div>
                  <div className="company-stat-label">Posts</div>
                </div>
              </div>

              {/* Tags row */}
              {c.tags && c.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                  {c.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="chip" style={{ fontSize: 10, padding: '2px 7px' }}>{tag}</span>
                  ))}
                </div>
              )}

              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>Interview Difficulty</span>
                <span style={{
                  color: c.difficulty === 'Extreme' || c.difficulty === 'Very Hard' ? 'var(--red)'
                    : c.difficulty === 'Hard' ? 'var(--yellow)'
                    : 'var(--green)'
                }}>
                  {c.difficulty}
                </span>
              </div>
              <div className="difficulty-bar">
                <div
                  className="difficulty-fill"
                  style={{ width: DIFF_WIDTH[c.difficulty] ?? '50%' }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}