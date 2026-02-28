'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockExperiences, type Experience } from '@/data/mockExperiences'

export default function FeedPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''

  const [selectedTag, setSelectedTag] = useState('OA')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const tagButtons = [
    { id: 'OA', label: '📅 OA Received' },
    { id: 'Interview', label: '🎤 Interview' },
    { id: 'Offer', label: '🎉 Offer' },
    { id: 'Rejection', label: '😔 Rejection' },
    { id: 'Question', label: '❓ Question' },
  ]

  const filters = ['All', 'Offers 🎉', 'Rejections 😔', 'OA / Phone Screen', 'Final Rounds', 'Questions ❓']

  // Filter logic
  const filteredExperiences = mockExperiences.filter(exp => {
    // Search filter
    const matchesSearch = !query ||
      exp.name.toLowerCase().includes(query) ||
      exp.roleCompany.toLowerCase().includes(query) ||
      exp.body.toLowerCase().includes(query) ||
      exp.tags.some(tag => tag.text.toLowerCase().includes(query))

    if (!matchesSearch) return false

    // Category filter
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Offers 🎉') return exp.outcomeText === 'OFFER'
    if (selectedFilter === 'Rejections 😔') return exp.outcomeText === 'REJECT'
    if (selectedFilter === 'OA / Phone Screen') return exp.tags.some(t => t.text === 'OA')
    if (selectedFilter === 'Questions ❓') return exp.outcomeText === 'QUESTION'

    return true
  })

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">📡 Recruiting Feed</div>
          <div className="page-sub">Real experiences from real CS students — updated in real time</div>
        </div>
      </div>

      <div className="compose-box">
        <div className="compose-top">
          <div className="user-avatar" style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),var(--accent3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', flexShrink: 0, fontSize: 13 }}>GH</div>
          <textarea className="compose-input" placeholder="Share your interview experience, OA results, or ask a question... Be specific — details help everyone 🎯" />
        </div>
        <div className="compose-bottom">
          {tagButtons.map(tag => (
            <button key={tag.id} type="button" className={'compose-tag-btn' + (selectedTag === tag.id ? ' selected' : '')} onClick={() => setSelectedTag(tag.id)}>{tag.label}</button>
          ))}
          <button className="top-btn primary" style={{ marginLeft: 'auto', padding: '7px 18px' }}>Post</button>
        </div>
      </div>

      <div className="filter-row">
        {filters.map(label => (
          <button key={label} type="button" className={'filter-btn' + (selectedFilter === label ? ' active' : '')} onClick={() => setSelectedFilter(label)}>{label}</button>
        ))}
        <button type="button" className="filter-btn" style={{ marginLeft: 'auto' }}>🎓 My School Only</button>
      </div>

      <div className="two-col">
        <div>
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp) => (
              <div key={exp.id} className="feed-card">
                <div className="feed-card-top">
                  <div className="feed-avatar" style={{ background: exp.avatarColor }}>{exp.initials}</div>
                  <div className="feed-meta">
                    <div className="feed-name">
                      {exp.name} <span style={{ color: 'var(--text3)', fontWeight: 400 }}>{exp.school}</span>
                    </div>
                    <div className="feed-detail">{exp.roleCompany}</div>
                  </div>
                  <div className="feed-time">{exp.timeAgo}</div>
                </div>
                <div className={`outcome-strip ${exp.outcomeClass}`}>{exp.outcomeText}</div>
                <div className="feed-body">
                  {exp.body}
                </div>
                <div className="tag-row">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className={`tag ${tag.className}`}>{tag.text}</span>
                  ))}
                </div>
                <div className="feed-actions">
                  <span className="feed-action">❤️ {exp.likes}</span>
                  <span className="feed-action">💬 {exp.comments} comments</span>
                  <span className="feed-action">🔖 Save</span>
                  <span className="feed-action">↗ Share</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)', background: 'var(--bg2)', borderRadius: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔎</div>
              <h3 style={{ color: 'var(--text)', marginBottom: 8 }}>No experiences found</h3>
              <p>Try adjusting your filters or search query to find what you&apos;re looking for.</p>
            </div>
          )}
        </div>

        <div className="right-panel">
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>🔥 Hot Right Now</div>
            <div className="trending-item"><span className="trending-rank">1</span><span className="trending-logo">🔵</span><div style={{ flex: 1 }}><div className="trending-name">Google</div><div className="trending-count">OAs out for Summer &apos;26</div></div><span className="trending-hot">🔥 842</span></div>
            <div className="trending-item"><span className="trending-rank">2</span><span className="trending-logo">🟠</span><div style={{ flex: 1 }}><div className="trending-name">Amazon</div><div className="trending-count">Final rounds going out</div></div><span className="trending-hot">🔥 614</span></div>
            <div className="trending-item"><span className="trending-rank">3</span><span className="trending-logo">🔴</span><div style={{ flex: 1 }}><div className="trending-name">Netflix</div><div className="trending-count">Offers extended</div></div><span className="trending-hot">391</span></div>
          </div>
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 12 }}>🎓 From Your School</div>
            <div className="feed-body" style={{ fontSize: 13 }}>More students from your school are joining the conversation!</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <span className="chip chip-green">Google · Offer</span>
              <span className="chip chip-blue">Stripe · OA</span>
              <span className="chip chip-purple">Capital One · Interview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}