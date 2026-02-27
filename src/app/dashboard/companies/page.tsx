'use client'

import { companies } from '@/lib/data/companies'
import Link from 'next/link'

export default function CompaniesPage() {
  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">🏢 Companies</div>
          <div className="page-sub">Deep intelligence on every company&apos;s recruiting process</div>
        </div>
      </div>

      <div className="filter-row">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Big Tech</button>
        <button className="filter-btn">Finance / Quant</button>
        <button className="filter-btn">Startup</button>
        <button className="filter-btn">Consulting</button>
        <button className="filter-btn">Hiring Now 🟢</button>
        <select style={{ marginLeft: 'auto', background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '8px 12px', borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: 'pointer' }}>
          <option>Most Reviews</option>
          <option>Highest Rated</option>
          <option>Best Pay</option>
          <option>Most Recent</option>
        </select>
      </div>

      <div className="companies-grid">
        {companies.map(c => (
          <Link
            key={c.name}
            href={`/dashboard/companies/${c.slug}`}
            className="company-card"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            <div className="company-card-top">
              <div className="company-logo">{c.logo_emoji}</div>
              <div><div className="company-name">{c.name}</div><div className="company-type">{c.type} · {c.location}</div></div>
              <div className="open-roles-badge" style={{ marginLeft: 'auto' }}><div className="pulse" /> {c.open_roles} open</div>
            </div>
            <div className="company-stats">
              <div className="company-stat"><div className="company-stat-val">{c.rating}</div><div className="company-stat-label">Rating</div></div>
              <div className="company-stat"><div className="company-stat-val" style={{ color: 'var(--green)' }}>${c.avg_pay_hr}/hr</div><div className="company-stat-label">Avg Pay</div></div>
              <div className="company-stat"><div className="company-stat-val">{c.post_count}</div><div className="company-stat-label">Posts</div></div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Interview Difficulty</span><span>{c.difficulty}</span>
            </div>
            <div className="difficulty-bar">
              <div 
                className="difficulty-fill" 
                style={{ 
                  width: c.difficulty === 'Extreme' ? '100%' : 
                         c.difficulty === 'Very Hard' ? '85%' : 
                         c.difficulty === 'Hard' ? '70%' : 
                         c.difficulty === 'Medium' ? '50%' : '30%' 
                }} 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}