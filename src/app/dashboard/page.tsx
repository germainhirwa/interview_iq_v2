// app/dashboard/page.tsx
// This is a Server Component — data fetching happens here


import Link from 'next/link'
import { mockExperiences } from '@/data/mockExperiences'

export default async function DashboardHome() {

  // const supabase = await createClient()

  // Example: fetch recent posts from Supabase
  // const { data: posts } = await supabase
  //   .from('posts')
  //   .select('*')
  //   .order('created_at', { ascending: false })
  //   .limit(10)
  return (
    <div className="page active">
      <div className="invite-banner">
        <div className="invite-icon">🚀</div>
        <div>
          <div className="invite-title">Unlock full access — invite 5 friends</div>
          <div className="invite-sub">You&apos;ve invited 2 friends. 3 more to unlock premium features for free.</div>
        </div>
        <div className="invite-progress">
          <div className="invite-dot filled">✓</div>
          <div className="invite-dot filled">✓</div>
          <div className="invite-dot">3</div>
          <div className="invite-dot">4</div>
          <div className="invite-dot">5</div>
          <Link href="/dashboard/invite" passHref>
            <button className="top-btn primary" style={{ marginLeft: 10, whiteSpace: 'nowrap' }}>Invite Friends</button>
          </Link>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Posts</div>
          <div className="stat-value">42,819 <span>experiences</span></div>
          <div className="stat-change">↑ 1,240 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Companies Tracked</div>
          <div className="stat-value">890 <span>companies</span></div>
          <div className="stat-change">↑ 12 added today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Intern Pay</div>
          <div className="stat-value">$47 <span>/hr</span></div>
          <div className="stat-change">↑ $2.40 from last year</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Students</div>
          <div className="stat-value">28.4K <span>members</span></div>
          <div className="stat-change">↑ 840 this week</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          <div className="section-header">
            <div className="section-title">🔥 Trending Experiences</div>
            <Link href="/dashboard/feed" className="section-link">View all →</Link>
          </div>

          {mockExperiences.map((exp) => (
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
          ))}
        </div>

        <div className="right-panel">
          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>🔥 Hot Right Now</div>
            {[
              { rank: 1, logo: '🔵', name: 'Google', sub: "OAs out for Summer '26", hot: true, count: '842 posts' },
              { rank: 2, logo: '🟠', name: 'Amazon', sub: 'Final rounds going out', hot: true, count: '614 posts' },
              { rank: 3, logo: '🔴', name: 'Netflix', sub: 'Offers extended this week', hot: false, count: '391 posts' },
              { rank: 4, logo: '🟣', name: 'Stripe', sub: 'Application deadline soon', hot: false, count: '287 posts' },
              { rank: 5, logo: '🟤', name: 'Jane Street', sub: 'Superdays happening now', hot: false, count: '241 posts' },
            ].map(item => (
              <div key={item.rank} className="trending-item">
                <span className="trending-rank">{item.rank}</span>
                <span className="trending-logo">{item.logo}</span>
                <div style={{ flex: 1 }}>
                  <div className="trending-name">{item.name}</div>
                  <div className="trending-count">{item.sub}</div>
                </div>
                <span className="trending-hot">{item.hot ? '🔥 ' : ''}{item.count}</span>
              </div>
            ))}
          </div>

          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>⏰ Deadlines Soon</div>
            {[
              { emoji: '🟢', name: 'Stripe', badge: 'deadline-urgent', label: '2 days', role: 'Software Engineer Intern · San Francisco' },
              { emoji: '🔵', name: 'Airbnb', badge: 'deadline-soon', label: '5 days', role: 'Frontend Engineer Intern · Remote' },
              { emoji: '🟡', name: 'Figma', badge: 'deadline-soon', label: '8 days', role: 'Product Design Intern · NYC' },
              { emoji: '⚫', name: 'OpenAI', badge: 'deadline-soon', label: '10 days', role: 'Research Intern · San Francisco' },
            ].map(d => (
              <div key={d.name} className="upcoming-item">
                <div className="upcoming-company">
                  <span>{d.emoji}</span> {d.name}
                  <span className={`deadline-badge ${d.badge}`}>{d.label}</span>
                </div>
                <div className="upcoming-role">{d.role}</div>
              </div>
            ))}
          </div>

          <div className="panel-card">
            <div className="section-title" style={{ marginBottom: 14 }}>📊 Offer Stats This Week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Google', pay: '$55/hr', width: '100%', cls: 'percent-fill-green' },
                { name: 'Meta', pay: '$52/hr', width: '94%', cls: 'percent-fill-green' },
                { name: 'Amazon', pay: '$48/hr', width: '87%', cls: 'percent-fill-purple' },
                { name: 'Microsoft', pay: '$46/hr', width: '83%', cls: 'percent-fill-purple' },
                { name: 'Stripe', pay: '$60/hr', width: '100%', cls: 'percent-fill-yellow' },
              ].map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text2)' }}>{item.name}</span>
                    <span style={{ color: 'var(--green)', fontFamily: "'JetBrains Mono',monospace" }}>{item.pay}</span>
                  </div>
                  <div className="percent-bar">
                    <div className={item.cls} style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}