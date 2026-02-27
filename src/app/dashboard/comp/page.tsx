'use client'

import { companies } from '@/lib/data/companies'
import { useState } from 'react'

export default function CompPage() {
  const [view, setView] = useState<'Internship' | 'Full-Time'>('Internship')

  // Derive rows from companies
  const rows = companies.flatMap(company => {
    return (company.compensation_table || []).map(comp => ({
      logo: company.logo_emoji,
      name: company.name,
      role: comp.role,
      hr: comp.pay_hr || '—',
      mo: comp.pay_mo || '—',
      total: comp.total || '—',
      base: comp.base || '—',
      stock: comp.stock || '—',
      bonus: comp.bonus || '—',
      housing: comp.housing || '—',
      loc: company.location.split(',')[0], // City only
      reports: company.post_count,
      isIntern: !!comp.pay_hr
    }))
  })

  const filteredRows = rows
    .filter(r => (view === 'Internship' ? r.isIntern : !r.isIntern))
    .sort((a, b) => {
      // Sort by pay
      if (view === 'Internship') {
        const valA = parseFloat(a.hr.replace(/[$,]/g, '')) || 0
        const valB = parseFloat(b.hr.replace(/[$,]/g, '')) || 0
        return valB - valA
      } else {
        const valA = parseFloat(a.total.replace(/[$,]/g, '')) || 0
        const valB = parseFloat(b.total.replace(/[$,]/g, '')) || 0
        return valB - valA
      }
    })

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">💰 Compensation</div>
          <div className="page-sub">Real pay data reported by CS students — {companies.reduce((acc, c) => acc + c.post_count, 0).toLocaleString()}+ data points</div>
        </div>
        <button className="top-btn primary">+ Add My Offer</button>
      </div>

      <div className="stats-row" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-label">Avg {view} Pay</div>
          <div className="stat-value">
            {view === 'Internship' ? '$52.40 ' : '$165K '}
            <span>{view === 'Internship' ? '/hr' : '/yr'}</span>
          </div>
          <div className="stat-change">↑ {view === 'Internship' ? '$2.40' : '$8K'} YoY</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Highest {view}</div>
          <div className="stat-value">
            {view === 'Internship' ? '$120 ' : '$350K '}
            <span>{view === 'Internship' ? '/hr' : '/yr'}</span>
          </div>
          <div className="stat-change">{view === 'Internship' ? 'Jane Street' : 'Scale AI'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Data Points</div>
          <div className="stat-value">{companies.reduce((acc, c) => acc + c.post_count, 0).toLocaleString()} <span>offers</span></div>
          <div className="stat-change">↑ 412 this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Top 10% Pay</div>
          <div className="stat-value">
            {view === 'Internship' ? '$110 ' : '$280K '}
            <span>{view === 'Internship' ? '/hr' : '/yr'}</span>
          </div>
          <div className="stat-change">Quant & AI lead</div>
        </div>
      </div>

      <div className="panel-card">
        <div className="section-header">
          <div className="section-title">Top Paying Companies — {view} (2025–26)</div>
          <div className="filter-row" style={{ marginBottom: 0, gap: 6 }}>
            <button 
              className={`filter-btn ${view === 'Internship' ? 'active' : ''}`} 
              onClick={() => setView('Internship')}
              style={{ padding: '5px 12px', fontSize: 12 }}
            >
              Internships
            </button>
            <button 
              className={`filter-btn ${view === 'Full-Time' ? 'active' : ''}`} 
              onClick={() => setView('Full-Time')}
              style={{ padding: '5px 12px', fontSize: 12 }}
            >
              Full-Time
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comp-table" style={{ marginTop: 8 }}>
            <thead>
              {view === 'Internship' ? (
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>$/hr</th>
                  <th>$/mo</th>
                  <th>Housing</th>
                  <th>Location</th>
                  <th>Reports</th>
                </tr>
              ) : (
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Total</th>
                  <th>Base</th>
                  <th>Stock</th>
                  <th>Bonus</th>
                  <th>Location</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredRows.map((r, i) => (
                <tr key={`${r.name}-${r.role}-${i}`}>
                  <td style={{ minWidth: 160 }}><span style={{ fontSize: 16 }}>{r.logo}</span> <strong style={{ color: 'var(--text)' }}>{r.name}</strong></td>
                  <td className="role" style={{ whiteSpace: 'nowrap' }}>{r.role}</td>
                  
                  {view === 'Internship' ? (
                    <>
                      <td className="highlight">{r.hr}</td>
                      <td style={{ color: 'var(--text2)' }}>{r.mo}</td>
                      <td style={{ color: r.housing === '—' ? 'var(--text3)' : 'var(--green)' }}>{r.housing}</td>
                    </>
                  ) : (
                    <>
                      <td className="highlight">{r.total}</td>
                      <td style={{ color: 'var(--text2)' }}>{r.base}</td>
                      <td style={{ color: 'var(--text2)' }}>{r.stock}</td>
                      <td style={{ color: 'var(--text2)' }}>{r.bonus}</td>
                    </>
                  )}
                  
                  <td style={{ color: 'var(--text3)', whiteSpace: 'nowrap' }}>{r.loc}</td>
                  {view === 'Internship' && (
                    <td><span className="chip">{r.reports}</span></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}