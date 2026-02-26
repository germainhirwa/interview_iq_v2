'use client'

import { useState } from 'react'

export default function FeedPage() {
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
          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>JS</div>
              <div className="feed-meta">
                <div className="feed-name">Jordan S. · MIT · CS &apos;25</div>
                <div className="feed-detail">Software Engineer Intern → Google</div>
              </div>
              <div className="feed-time">2h ago</div>
            </div>
            <div className="outcome-strip outcome-offer">🎉 Offer — $55/hr + $10K housing</div>
            <div className="feed-body">Just finished the Google L3 intern loop — 3 coding rounds + 1 Googleyness. Final round had a hard DP problem and a medium graph. Total process was ~6 weeks. <strong>Tip:</strong> practice STAR format hard.</div>
            <div className="tag-row">
              <span className="tag tag-company">Google</span>
              <span className="tag tag-offer">Offer</span>
              <span className="tag tag-topic">Dynamic Programming</span>
              <span className="tag tag-topic">Graphs</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action liked">❤️ 284</span>
              <span className="feed-action">💬 47</span>
              <span className="feed-action">🔖</span>
              <span className="feed-action">↗</span>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)' }}>TC</div>
              <div className="feed-meta">
                <div className="feed-name">Tyler C. · Cornell · ECE &apos;26</div>
                <div className="feed-detail">Systems Engineer Intern → Apple</div>
              </div>
              <div className="feed-time">3h ago</div>
            </div>
            <div className="outcome-strip outcome-offer">🎉 Offer — $48/hr + housing stipend</div>
            <div className="feed-body">Apple process: recruiter screen → 1 technical phone screen → 2 virtual interviews on the same day. Questions were <strong>C++/systems focused</strong> — memory management, virtual functions, OS concepts. No LeetCode grind needed.</div>
            <div className="tag-row">
              <span className="tag tag-company">Apple</span>
              <span className="tag tag-offer">Offer</span>
              <span className="tag tag-topic">C++</span>
              <span className="tag tag-topic">Systems</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action">❤️ 201</span>
              <span className="feed-action">💬 38</span>
              <span className="feed-action">🔖</span>
              <span className="feed-action">↗</span>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)' }}>MK</div>
              <div className="feed-meta">
                <div className="feed-name">Maya K. · Stanford · CS &apos;26</div>
                <div className="feed-detail">SWE Intern → Meta</div>
              </div>
              <div className="feed-time">5h ago</div>
            </div>
            <div className="outcome-strip outcome-rej">😔 Rejected after virtual onsite</div>
            <div className="feed-body">Meta virtual onsite — 2 coding problems and behavioral. LC 146 variant and a tree problem. I think I was too slow on problem 2. Good luck to everyone still in process 💪</div>
            <div className="tag-row">
              <span className="tag tag-company">Meta</span>
              <span className="tag tag-rej">Rejected</span>
              <span className="tag tag-topic">LRU Cache</span>
              <span className="tag tag-topic">Trees</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action">❤️ 189</span>
              <span className="feed-action">💬 63</span>
              <span className="feed-action">🔖</span>
              <span className="feed-action">↗</span>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#a78bfa,#6c63ff)' }}>PR</div>
              <div className="feed-meta">
                <div className="feed-name">Priya R. · UC Berkeley · CS &apos;25</div>
                <div className="feed-detail">PM Intern → Microsoft</div>
              </div>
              <div className="feed-time">6h ago</div>
            </div>
            <div className="outcome-strip outcome-progress">⏳ Question — should I reach out to my recruiter?</div>
            <div className="feed-body">I finished my Microsoft PM final round 2 weeks ago and haven&apos;t heard back. My recruiter said decisions would be made within a week. Should I follow up? Don&apos;t want to seem annoying but also really want this one.</div>
            <div className="tag-row">
              <span className="tag tag-company">Microsoft</span>
              <span className="tag tag-oa">Question</span>
              <span className="tag tag-round">PM Intern</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action">❤️ 44</span>
              <span className="feed-action">💬 28</span>
              <span className="feed-action">🔖</span>
              <span className="feed-action">↗</span>
            </div>
          </div>
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
            <div className="feed-body" style={{ fontSize: 13 }}>3 Swarthmore students posted experiences this week.</div>
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