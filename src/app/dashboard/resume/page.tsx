'use client'

import { useState } from 'react'
import PremiumGate from '@/components/PremiumGate'

const SAMPLE_FEEDBACK = [
  { section: 'Summary / Objective', score: 72, status: 'warn', msg: 'Objective statement is generic. Tailor it to the specific role and show immediate value.' },
  { section: 'Experience Section', score: 91, status: 'good', msg: 'Strong impact metrics (%, $, #). Most bullets start with action verbs. Minor: avoid "responsible for".' },
  { section: 'Skills Section', score: 85, status: 'good', msg: 'Good breadth. Consider grouping by category: Languages · Frameworks · Tools to improve scannability.' },
  { section: 'Education', score: 96, status: 'good', msg: 'Clear and well-formatted. GPA included — great for student resumes.' },
  { section: 'Projects Section', score: 68, status: 'warn', msg: '2 of 3 projects lack quantified impact. Add metrics: users, performance gains, lines of code processed, etc.' },
  { section: 'ATS Compatibility', score: 88, status: 'good', msg: 'Good keyword coverage. Tip: mirror exact phrasing from the job description for ATS keyword matching.' },
  { section: 'Length & Formatting', score: 95, status: 'good', msg: 'Clean 1-page format. Consistent fonts, spacing, and margins throughout.' },
  { section: 'Action Verbs', score: 78, status: 'warn', msg: '4 bullets start with weak verbs ("worked on", "helped with"). Replace with: built, architected, optimized, implemented.' },
]

const CHECKLIST = [
  { item: 'One page length', done: true },
  { item: 'Consistent font & margins', done: true },
  { item: 'Quantified bullet points (%, $, #)', done: false },
  { item: 'No first-person pronouns', done: true },
  { item: 'Reverse chronological order', done: true },
  { item: 'Skills section present', done: true },
  { item: 'GPA included (if ≥ 3.5)', done: true },
  { item: 'Relevant coursework listed', done: false },
  { item: 'PDF format (not .docx)', done: true },
  { item: 'Tailored to target role', done: false },
]

export default function ResumeCheckPage() {
  // In a real app, isPremium would come from a server component and be passed as prop.
  // For now, default false for demo.
  const isPremium = false

  const [uploaded, setUploaded] = useState(false)
  const [dragging, setDragging] = useState(false)

  const overallScore = Math.round(
    SAMPLE_FEEDBACK.reduce((a, f) => a + f.score, 0) / SAMPLE_FEEDBACK.length
  )

  const scoreColor =
    overallScore >= 85 ? 'var(--green)' :
    overallScore >= 70 ? 'var(--yellow)' : 'var(--red)'

  return (
    <div className="page active" style={{ position: 'relative' }}>
      <div className="page-header">
        <div>
          <div className="page-title">
            📄 Resume Check
            {!isPremium && <span className="premium-nav-badge">👑 Premium</span>}
          </div>
          <div className="page-sub">AI-powered resume feedback based on thousands of successful CS internship applications</div>
        </div>
      </div>

      {/* Upload area */}
      {!uploaded ? (
        <div
          className={`resume-upload-zone ${dragging ? 'dragging' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); setUploaded(true) }}
          onClick={() => setUploaded(true)}
        >
          <div className="resume-upload-icon">📄</div>
          <div className="resume-upload-title">Drop your resume here or click to upload</div>
          <div className="resume-upload-sub">PDF format · Max 5MB · We analyze it instantly</div>
          <button className="top-btn primary" style={{ marginTop: 16 }}>Choose File</button>
        </div>
      ) : (
        <div className="resume-uploaded-strip">
          <span>✅ resume_final_v3.pdf</span>
          <button className="filter-btn" style={{ fontSize: 12 }} onClick={() => setUploaded(false)}>
            Upload Another
          </button>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28, marginTop: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Overall Score</div>
          <div className="stat-value" style={{ color: scoreColor }}>{overallScore} <span>/ 100</span></div>
          <div className="stat-change">Above average for CS roles</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">ATS Match</div>
          <div className="stat-value" style={{ color: 'var(--green)' }}>88% <span>pass</span></div>
          <div className="stat-change">Based on SWE intern JDs</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Issues Found</div>
          <div className="stat-value" style={{ color: 'var(--yellow)' }}>3 <span>warnings</span></div>
          <div className="stat-change">0 critical errors</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          {/* Section scores */}
          <div className="section-title" style={{ marginBottom: 16 }}>🔬 Section-by-Section Analysis</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {SAMPLE_FEEDBACK.map(f => (
              <div key={f.section} className="resume-feedback-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{f.section}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`chip ${f.status === 'good' ? 'chip-green' : 'chip-yellow'}`}>
                      {f.status === 'good' ? '✓ Strong' : '⚠ Improve'}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: f.status === 'good' ? 'var(--green)' : 'var(--yellow)' }}>
                      {f.score}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{f.msg}</div>
                <div className="resume-score-bar">
                  <div
                    className="resume-score-fill"
                    style={{
                      width: `${f.score}%`,
                      background: f.status === 'good' ? 'var(--green)' : 'var(--yellow)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Checklist */}
          <div className="panel-card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>✅ Resume Checklist</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CHECKLIST.map(c => (
                <div key={c.item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, color: c.done ? 'var(--green)' : 'var(--text3)' }}>
                    {c.done ? '✓' : '○'}
                  </span>
                  <span style={{ fontSize: 13, color: c.done ? 'var(--text2)' : 'var(--text3)' }}>
                    {c.item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top tip */}
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>💡 Top Tip</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--accent2)' }}>Quantify your projects.</strong> Instead of <em>"built a REST API"</em>,
              write <em>"built a REST API serving 12K daily requests, reducing latency by 40%"</em>.
              Numbers make your bullet points 3× more memorable to hiring managers.
            </div>
          </div>
        </div>
      </div>

      {/* Premium gate */}
      {!isPremium && (
        <PremiumGate
          featureName="Resume Check"
          featureIcon="📄"
          description="Get AI-powered resume feedback tailored to CS internship applications, with ATS scoring and section-by-section improvements."
          bullets={[
            'AI section-by-section resume analysis',
            'ATS compatibility score for SWE intern JDs',
            'Actionable fixes with example rewrites',
            'Checklist of 10 must-have resume elements',
            'Company-specific keyword optimization',
            'Unlimited re-checks as you iterate',
          ]}
        />
      )}
    </div>
  )
}
