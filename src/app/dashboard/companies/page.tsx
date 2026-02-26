'use client'

import { useState } from 'react'

function GoogleCompanyPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Experiences (842)', 'Interview Process', 'Compensation', 'Open Roles (12)']

  return (
    <div className="page active">
      <button type="button" className="back-btn" onClick={onBack}>← Back to Companies</button>

      <div className="company-hero">
        <div className="company-hero-top">
          <div className="company-logo-lg">🔵</div>
          <div className="company-hero-info">
            <h1>Google</h1>
            <div className="company-hero-sub">Alphabet Inc. · Big Tech · Mountain View, CA · Founded 1998</div>
            <div className="hero-badges">
              <span className="hero-badge tag-offer">4.7 ⭐ Rating</span>
              <span className="hero-badge tag-round">842 Experiences</span>
              <span className="hero-badge tag-company">SWE · PM · DS · UX</span>
              <div className="open-roles-badge"><div className="pulse" /> 12 Open Roles</div>
            </div>
          </div>
          <button className="top-btn ghost" style={{ marginLeft: 'auto', flexShrink: 0 }}>🔔 Follow</button>
        </div>
        <div className="company-metrics">
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--green)' }}>$55</div><div className="metric-label">Avg $/hr</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--yellow)' }}>$9,520</div><div className="metric-label">Avg $/month</div></div>
          <div className="metric-box"><div className="metric-val">6 wks</div><div className="metric-label">App → Offer</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--accent2)' }}>62%</div><div className="metric-label">OA Pass Rate</div></div>
          <div className="metric-box"><div className="metric-val" style={{ color: 'var(--orange)' }}>Hard</div><div className="metric-label">Difficulty</div></div>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(label => (
          <div key={label} className={'tab-item' + (activeTab === label ? ' active' : '')} onClick={() => setActiveTab(label)}>{label}</div>
        ))}
      </div>

      <div className="two-col">
        <div>
          <div className="timeline" style={{ marginBottom: 20 }}>
            <div className="section-title">🗓 Typical Recruiting Timeline (Summer 2026)</div>
            <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 6 }}>Based on 842 student reports</div>
            <div className="timeline-steps">
              <div className="timeline-step done"><div className="step-dot">✓</div><div className="step-label">Applications Open</div><div className="step-date">Aug 2025</div></div>
              <div className="timeline-step done"><div className="step-dot">✓</div><div className="step-label">OA Sent</div><div className="step-date">Sep–Oct 2025</div></div>
              <div className="timeline-step done"><div className="step-dot">✓</div><div className="step-label">Phone Screen</div><div className="step-date">Oct–Nov 2025</div></div>
              <div className="timeline-step current"><div className="step-dot">●</div><div className="step-label">Virtual Onsite</div><div className="step-date">Nov 2025–Jan 2026</div></div>
              <div className="timeline-step"><div className="step-dot">○</div><div className="step-label">Offers</div><div className="step-date">Jan–Feb 2026</div></div>
            </div>
          </div>

          <div className="panel-card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>🎤 Interview Breakdown</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '📝', title: 'Online Assessment', sub: '2 LC problems · 75 min', chip: '62% pass rate', chipCls: 'chip-green', body: 'Usually 1 medium + 1 hard. Topics: arrays, strings, sliding window, DP. Common mistake: running out of time — practice speed.' },
                { icon: '📞', title: 'Phone Screen', sub: '1 LC problem · 45 min', chip: '~70% pass', chipCls: 'chip-purple', body: 'One medium coding problem. Interviewer is active — they hint and guide. Explain your thought process out loud the whole time.' },
                { icon: '💻', title: 'Virtual Onsite (3 rounds)', sub: '2 coding + 1 Googleyness', chip: '~40% pass', chipCls: 'chip-blue', body: 'Round 1&2: 1 medium + 1 hard LC. DP, graphs, trees most common. Round 3 (Googleyness): STAR behavioral — leadership, conflict, failure stories.' },
              ].map(r => (
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

          <div className="section-header">
            <div className="section-title">📡 Recent Experiences</div>
            <button type="button" className="section-link">See all 842 →</button>
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
            <div className="outcome-strip outcome-offer">🎉 Offer — $55/hr + $10K housing + $5K relocation</div>
            <div className="feed-body">3 coding rounds + Googleyness. Hard DP in final round (similar to LC 312). Total ~6 weeks. STAR format is crucial.</div>
            <div className="tag-row"><span className="tag tag-offer">Offer</span><span className="tag tag-topic">DP</span><span className="tag tag-topic">Graphs</span></div>
            <div className="feed-actions"><span className="feed-action liked">❤️ 284</span><span className="feed-action">💬 47</span><span className="feed-action">🔖</span></div>
          </div>
        </div>

        <div className="right-panel">
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>💰 Compensation (2025–26)</div>
            <table className="comp-table">
              <thead><tr><th>Role</th><th>$/hr</th><th>$/mo</th></tr></thead>
              <tbody>
                <tr><td className="role">SWE Intern</td><td className="highlight">$55</td><td style={{ color: 'var(--text2)' }}>$9,534</td></tr>
                <tr><td className="role">SWE Intern (PhD)</td><td className="highlight">$65</td><td style={{ color: 'var(--text2)' }}>$11,267</td></tr>
                <tr><td className="role">PM Intern</td><td className="highlight">$50</td><td style={{ color: 'var(--text2)' }}>$8,667</td></tr>
                <tr><td className="role">Data Scientist</td><td className="highlight">$52</td><td style={{ color: 'var(--text2)' }}>$9,013</td></tr>
                <tr><td className="role">UX Design Intern</td><td className="highlight">$42</td><td style={{ color: 'var(--text2)' }}>$7,280</td></tr>
              </tbody>
            </table>
            <div style={{ background: 'var(--surface)', borderRadius: 8, padding: 12, marginTop: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>ADDITIONAL BENEFITS</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>🏠 Housing stipend: $10K avg<br />✈️ Relocation: up to $5K<br />🍽 Free meals at campus<br />💻 MacBook Pro provided<br />🚌 Transport subsidy</div>
            </div>
          </div>

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
            <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text3)' }}>Based on 842 reported outcomes · Last 6 months</div>
          </div>

          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>🔥 Hot Topics</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Dynamic Programming', 'Graphs', 'Trees', 'Sliding Window', 'System Design', 'Googleyness', 'STAR Method', 'BFS/DFS'].map(t => (
                <span key={t} className="tag tag-topic">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompaniesPage() {
  const [showGoogle, setShowGoogle] = useState(false)

  if (showGoogle) {
    return <GoogleCompanyPage onBack={() => setShowGoogle(false)} />
  }

  const companies = [
    { logo: '🔵', name: 'Google', type: 'Big Tech · Mountain View, CA', open: 12, rating: '4.7', pay: '$55/hr', posts: '842', diff: 'Hard', diffPct: '75%', clickable: true },
    { logo: '🟦', name: 'Meta', type: 'Big Tech · Menlo Park, CA', open: 8, rating: '4.3', pay: '$52/hr', posts: '614', diff: 'Very Hard', diffPct: '90%', clickable: true },
    { logo: '🟠', name: 'Amazon', type: 'Big Tech · Seattle, WA', open: 23, rating: '3.9', pay: '$48/hr', posts: '1.2K', diff: 'Medium', diffPct: '55%', clickable: false },
    { logo: '🟣', name: 'Stripe', type: 'Fintech · San Francisco, CA', open: 5, rating: '4.8', pay: '$60/hr', posts: '287', diff: 'Very Hard', diffPct: '88%', clickable: false },
    { logo: '🟤', name: 'Jane Street', type: 'Quant Finance · New York, NY', open: 3, rating: '4.9', pay: '$120/hr', posts: '241', diff: 'Extreme', diffPct: '100%', clickable: false },
    { logo: '⚫', name: 'OpenAI', type: 'AI Research · San Francisco, CA', open: 7, rating: '4.6', pay: '$65/hr', posts: '189', diff: 'Very Hard', diffPct: '85%', clickable: false },
  ]

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
          <div
            key={c.name}
            className="company-card"
            onClick={c.clickable ? () => setShowGoogle(true) : undefined}
            style={{ cursor: c.clickable ? 'pointer' : 'default' }}
          >
            <div className="company-card-top">
              <div className="company-logo">{c.logo}</div>
              <div><div className="company-name">{c.name}</div><div className="company-type">{c.type}</div></div>
              <div className="open-roles-badge" style={{ marginLeft: 'auto' }}><div className="pulse" /> {c.open} open</div>
            </div>
            <div className="company-stats">
              <div className="company-stat"><div className="company-stat-val">{c.rating}</div><div className="company-stat-label">Rating</div></div>
              <div className="company-stat"><div className="company-stat-val" style={{ color: 'var(--green)' }}>{c.pay}</div><div className="company-stat-label">Avg Pay</div></div>
              <div className="company-stat"><div className="company-stat-val">{c.posts}</div><div className="company-stat-label">Posts</div></div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Interview Difficulty</span><span>{c.diff}</span>
            </div>
            <div className="difficulty-bar"><div className="difficulty-fill" style={{ width: c.diffPct }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}