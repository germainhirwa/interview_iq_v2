export default function OpportunitiesPage() {
    const opportunities = [
      {
        logo: '🟣', company: 'Stripe', title: 'Software Engineer Intern',
        tags: ['San Francisco', 'Internship', 'Fintech'],
        pay: '$60/hr', mo: '$10,400/mo', loc: 'San Francisco, CA',
        badge: <span className="deadline-badge deadline-urgent">⏰ 2 days left</span>,
      },
      {
        logo: '⚫', company: 'OpenAI', title: 'Research Intern — AI Safety',
        tags: ['San Francisco', 'Research', 'AI/ML'],
        pay: '$65/hr', mo: '$11,267/mo', loc: 'San Francisco, CA',
        badge: <span className="deadline-badge deadline-soon">📅 10 days left</span>,
      },
      {
        logo: '🟤', company: 'Jane Street', title: 'Software Engineering Intern',
        tags: ['New York', 'Internship', 'OCaml'],
        pay: '$120/hr', mo: '$20,800/mo', loc: 'New York, NY',
        badge: <span className="deadline-badge deadline-soon">📅 14 days left</span>,
      },
      {
        logo: '🔵', company: 'Google', title: 'Software Engineer Intern (Multiple Teams)',
        tags: ['Mountain View', 'Internship', 'Systems'],
        pay: '$55/hr', mo: '$9,534/mo', loc: 'Mountain View, CA',
        badge: <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'JetBrains Mono',monospace" }}>Rolling</span>,
      },
      {
        logo: '🟧', company: 'Goldman Sachs', title: 'Technology Analyst Intern',
        tags: ['New York', 'Internship', 'Finance'],
        pay: '$44/hr', mo: '$7,627/mo', loc: 'New York, NY',
        badge: <span className="deadline-badge deadline-soon">📅 18 days left</span>,
      },
      {
        logo: '🔴', company: 'Netflix', title: 'Software Engineer Intern — Platform',
        tags: ['Los Gatos', 'Internship', 'Distributed Systems'],
        pay: '$58/hr', mo: '$10,053/mo', loc: 'Los Gatos, CA',
        badge: <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'JetBrains Mono',monospace" }}>Rolling</span>,
      },
    ]
  
    return (
      <div className="page active">
        <div className="page-header">
          <div>
            <div className="page-title">💼 Opportunities</div>
            <div className="page-sub">Open internships and new grad roles — updated daily</div>
          </div>
          <button className="top-btn primary">+ Add Opportunity</button>
        </div>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
          <div className="stat-card"><div className="stat-label">Avg Intern Pay</div><div className="stat-value">$47.20 <span>/hr</span></div></div>
          <div className="stat-card"><div className="stat-label">Avg Monthly</div><div className="stat-value">$8,180 <span>/mo</span></div></div>
          <div className="stat-card"><div className="stat-label">Total Listings</div><div className="stat-value">1,847 <span>roles</span></div></div>
        </div>
  
        <div className="filter-row">
          <button className="filter-btn active">All Roles</button>
          <button className="filter-btn">SWE</button>
          <button className="filter-btn">PM</button>
          <button className="filter-btn">Data Science</button>
          <button className="filter-btn">Quant / Finance</button>
          <button className="filter-btn">Remote Only</button>
          <select style={{ marginLeft: 'auto', background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '8px 12px', borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 13 }}>
            <option>Highest Pay</option>
            <option>Most Recent</option>
            <option>Deadline Soon</option>
          </select>
        </div>
  
        <div className="opp-list">
          {opportunities.map(o => (
            <div key={o.company + o.title} className="opp-card">
              <div className="opp-logo">{o.logo}</div>
              <div>
                <div className="opp-company">{o.company}</div>
                <div className="opp-title">{o.title}</div>
                <div className="opp-tags">
                  {o.tags.map(t => <span key={t} className="tag tag-company">{t}</span>)}
                </div>
              </div>
              <div className="opp-meta">
                <div className="opp-pay">{o.pay}</div>
                <div className="opp-pay-label">{o.mo}</div>
                <div className="opp-location">📍 {o.loc}</div>
                <div style={{ marginTop: 6 }}>{o.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }