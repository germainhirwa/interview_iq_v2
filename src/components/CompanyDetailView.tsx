'use client'

import { Company } from '@/lib/types'
import { useState } from 'react'
import Image from 'next/image'

export interface CompanyDetailViewProps {
  company: Company
  onBack: () => void
}

export default function CompanyDetailView({ company, onBack }: CompanyDetailViewProps) {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', `Experiences (${company.post_count})`, 'Interview Process', 'Compensation', `Open Roles (${company.open_roles})`]

  return (
    <div className="page active">
      <button type="button" className="back-btn" onClick={onBack}>← Back to Companies</button>

      <div className="company-hero">
        <div className="company-hero-top">
          <div className="company-logo-lg" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {company.logo_url ? (
              <Image
                src={company.logo_url}
                alt={company.name}
                width={64}
                height={64}
                style={{ objectFit: 'contain', borderRadius: 8 }}
                unoptimized
              />
            ) : (
              company.logo_emoji
            )}
          </div>
          <div className="company-hero-info">
            <h1>{company.name}</h1>
            <div className="company-hero-sub">{company.description || `${company.type} · ${company.location}`}</div>
            <div className="hero-badges">
              <span className="hero-badge tag-offer">{company.rating} ⭐ Rating</span>
              <span className="hero-badge tag-round">{company.post_count} Experiences</span>
              <span className="hero-badge tag-company">{company.industry || company.type}</span>
              <div className="open-roles-badge"><div className="pulse" /> {company.open_roles} Open Roles</div>
            </div>
          </div>
          <button className="top-btn ghost" style={{ marginLeft: 'auto', flexShrink: 0 }}>🔔 Follow</button>
        </div>
        <div className="company-metrics">
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--green)' }}>${company.avg_pay_hr}</div><div className="metric-label">Avg $/hr</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--yellow)' }}>{company.metrics?.avg_total_mo || '—'}</div><div className="metric-label">Avg $/month</div></div>
          <div className="metric-box"><div className="metric-val">{company.metrics?.avg_timeline || '—'}</div><div className="metric-label">App → Offer</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--accent2)' }}>{company.metrics?.pass_rate || '—'}</div><div className="metric-label">OA Pass Rate</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--orange)' }}>{company.difficulty}</div><div className="metric-label">Difficulty</div></div>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(label => (
          <div key={label} className={'tab-item' + (activeTab === label ? ' active' : '')} onClick={() => setActiveTab(label)}>{label}</div>
        ))}
      </div>

      <div className="two-col">
        <div>
          {company.timeline && (
            <div className="timeline" style={{ marginBottom: 20 }}>
              <div className="section-title">🗓 Typical Recruiting Timeline (Summer 2026)</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 6 }}>Based on {company.post_count} student reports</div>
              <div className="timeline-steps">
                {company.timeline.map((step, i) => (
                  <div key={i} className={`timeline-step ${step.status}`}>
                    <div className="step-dot">{step.status === 'done' ? '✓' : step.status === 'current' ? '●' : '○'}</div>
                    <div className="step-label">{step.label}</div>
                    <div className="step-date">{step.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {company.interviews && (
            <div className="panel-card" style={{ marginBottom: 16 }}>
              <div className="section-title" style={{ marginBottom: 16 }}>🎤 Interview Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {company.interviews.map(r => (
                  <div key={r.title} style={{ padding: 14, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 18 }}>{r.icon}</span>
                      <div><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{r.title}</div><div style={{ fontSize: 12, color: 'var(--text3)' }}>{r.sub}</div></div>
                      <span className={`chip ${r.chipCls}`} style={{ marginLeft: 'auto' }}>{r.chip}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{r.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="section-header">
            <div className="section-title">📡 Recent Experiences</div>
            <button type="button" className="section-link">See all {company.post_count} →</button>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>JS</div>
              <div className="feed-meta">
                <div className="feed-name">Jordan S. · MIT · CS &apos;25</div>
                <div className="feed-detail">SWE Intern — Summer 2026</div>
              </div>
              <div className="feed-time">2h ago</div>
            </div>
            <div className="outcome-strip outcome-offer">🎉 Offer — ${company.avg_pay_hr}/hr + benefits</div>
            <div className="feed-body">Interviewed for {company.name}. Rounds were intense but structured. Focus on {company.tags?.slice(0, 3).join(', ')}.</div>
            <div className="tag-row">
                <span className="tag tag-offer">Offer</span>
                {company.tags?.slice(0, 2).map(t => <span key={t} className="tag tag-topic">{t}</span>)}
            </div>
            <div className="feed-actions"><span className="feed-action liked">❤️ 284</span><span className="feed-action">💬 47</span><span className="feed-action">🔖</span></div>
          </div>
        </div>

        <div className="right-panel">
          {company.compensation_table && (
            <div className="panel-card">
              <div className="section-title" style={{ marginBottom: 14 }}>💰 Compensation (2025–26)</div>
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    {company.compensation_table.some(r => r.total) ? (
                      <>
                        <th>Total</th>
                        <th>Base</th>
                        <th>Stock</th>
                        <th>Bonus</th>
                      </>
                    ) : (
                      <>
                        <th>$/hr</th>
                        <th>$/mo</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {company.compensation_table.map((row, i) => (
                    <tr key={i}>
                      <td className="role">{row.role}</td>
                      {row.total ? (
                        <>
                          <td className="highlight">{row.total}</td>
                          <td style={{ color: 'var(--text2)' }}>{row.base}</td>
                          <td style={{ color: 'var(--text2)' }}>{row.stock}</td>
                          <td style={{ color: 'var(--text2)' }}>{row.bonus}</td>
                        </>
                      ) : (
                        <>
                          <td className="highlight">{row.pay_hr}</td>
                          <td style={{ color: 'var(--text2)' }}>{row.pay_mo}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {company.benefits && (
                <div style={{ background: 'var(--surface)', borderRadius: 8, padding: 12, marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>ADDITIONAL BENEFITS</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>
                    {company.benefits.map((b, i) => (
                        <div key={i}>{b}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>📊 Outcome Stats</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Offer', pct: '22%', width: '22%', color: 'var(--green)', fillCls: 'percent-fill-green' },
                { label: 'Rejected', pct: '54%', width: '54%', color: 'var(--red)', fillCls: '' },
                { label: 'In Process', pct: '24%', width: '24%', color: 'var(--yellow)', fillCls: 'percent-fill-yellow' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: 'var(--text2)' }}>{s.label}</span>
                    <span style={{ color: s.color }}>{s.pct}</span>
                  </div>
                  <div className="percent-bar">
                    {s.fillCls
                      ? <div className={s.fillCls} style={{ width: s.width }} />
                      : <div style={{ height: '100%', width: s.width, background: 'var(--red)', borderRadius: 3 }} />
                    }
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text3)' }}>Based on {company.post_count} reported outcomes · Last 6 months</div>
          </div>

          {company.tags && (
            <div className="panel-card">
              <div className="section-title" style={{ marginBottom: 14 }}>🔥 Hot Topics</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {company.tags.map(t => (
                  <span key={t} className="tag tag-topic">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
