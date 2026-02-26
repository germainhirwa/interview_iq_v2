export default function CompPage() {
    const rows = [
      { logo: '🟤', name: 'Jane Street', role: 'SWE Intern', hr: '$120', mo: '$20,800', housing: '—', loc: 'New York', reports: 48 },
      { logo: '⚫', name: 'OpenAI', role: 'Research Intern', hr: '$65', mo: '$11,267', housing: '$8K', loc: 'SF Bay Area', reports: 31 },
      { logo: '🟣', name: 'Stripe', role: 'SWE Intern', hr: '$60', mo: '$10,400', housing: '$3K', loc: 'SF Bay Area', reports: 87 },
      { logo: '🔴', name: 'Netflix', role: 'SWE Intern', hr: '$58', mo: '$10,053', housing: '—', loc: 'Los Gatos', reports: 42 },
      { logo: '🔵', name: 'Google', role: 'SWE Intern', hr: '$55', mo: '$9,534', housing: '$10K', loc: 'Mountain View', reports: 312 },
      { logo: '🟦', name: 'Meta', role: 'SWE Intern', hr: '$52', mo: '$9,013', housing: '$9K', loc: 'Menlo Park', reports: 278 },
      { logo: '🟠', name: 'Amazon', role: 'SDE Intern', hr: '$48', mo: '$8,320', housing: '$5K', loc: 'Seattle', reports: 401 },
      { logo: '🔷', name: 'Microsoft', role: 'SWE Intern', hr: '$46', mo: '$7,973', housing: '$4.5K', loc: 'Redmond', reports: 367 },
    ]
  
    return (
      <div className="page active">
        <div className="page-header">
          <div>
            <div className="page-title">💰 Compensation</div>
            <div className="page-sub">Real intern pay data reported by CS students — 4,200+ data points</div>
          </div>
          <button className="top-btn primary">+ Add My Offer</button>
        </div>
  
        <div className="stats-row" style={{ marginBottom: 28 }}>
          <div className="stat-card"><div className="stat-label">Avg Intern Pay</div><div className="stat-value">$47.20 <span>/hr</span></div><div className="stat-change">↑ $2.40 YoY</div></div>
          <div className="stat-card"><div className="stat-label">Highest Reported</div><div className="stat-value">$120 <span>/hr</span></div><div className="stat-change">Jane Street 2026</div></div>
          <div className="stat-card"><div className="stat-label">Total Data Points</div><div className="stat-value">4,218 <span>offers</span></div><div className="stat-change">↑ 380 this month</div></div>
          <div className="stat-card"><div className="stat-label">Avg Monthly (incl. housing)</div><div className="stat-value">$10.4K <span>/mo</span></div><div className="stat-change">Top 10% get $18K+</div></div>
        </div>
  
        <div className="panel-card">
          <div className="section-header">
            <div className="section-title">Top Paying Companies — Summer 2026 Internships</div>
            <div className="filter-row" style={{ marginBottom: 0, gap: 6 }}>
              <button className="filter-btn active" style={{ padding: '5px 12px', fontSize: 12 }}>All Roles</button>
              <button className="filter-btn" style={{ padding: '5px 12px', fontSize: 12 }}>SWE Only</button>
              <button className="filter-btn" style={{ padding: '5px 12px', fontSize: 12 }}>Quant Only</button>
            </div>
          </div>
  
          <table className="comp-table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>$/hr</th>
                <th>$/mo</th>
                <th>Housing</th>
                <th>Location</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name}>
                  <td><span style={{ fontSize: 16 }}>{r.logo}</span> <strong style={{ color: 'var(--text)' }}>{r.name}</strong></td>
                  <td className="role">{r.role}</td>
                  <td className="highlight">{r.hr}</td>
                  <td style={{ color: 'var(--text2)' }}>{r.mo}</td>
                  <td style={{ color: r.housing === '—' ? 'var(--text3)' : 'var(--green)' }}>{r.housing}</td>
                  <td style={{ color: 'var(--text3)' }}>{r.loc}</td>
                  <td><span className="chip">{r.reports}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }