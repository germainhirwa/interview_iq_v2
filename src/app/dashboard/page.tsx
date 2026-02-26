// app/dashboard/page.tsx
// This is a Server Component — data fetching happens here


import Link from 'next/link'

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
          <button className="top-btn primary" style={{ marginLeft: 10, whiteSpace: 'nowrap' }}>Invite Friends</button>
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

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>JS</div>
              <div className="feed-meta">
                <div className="feed-name">Jordan S. <span style={{ color: 'var(--text3)', fontWeight: 400 }}> · MIT · CS &apos;25</span></div>
                <div className="feed-detail">Software Engineer Intern → Google</div>
              </div>
              <div className="feed-time">2h ago</div>
            </div>
            <div className="outcome-strip outcome-offer">🎉 Received Offer — $55/hr + $10K housing + $5K relocation</div>
            <div className="feed-body">
              Just finished the <strong>Google L3 intern loop</strong> — 3 coding rounds + 1 Googleyness. Final round had a hard DP problem and a medium graph. ~6 weeks from OA to offer. <strong>Key tip:</strong> practice STAR format hard.
            </div>
            <div className="tag-row">
              <span className="tag tag-company">Google</span>
              <span className="tag tag-offer">Offer</span>
              <span className="tag tag-topic">Dynamic Programming</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action liked">❤️ 284</span>
              <span className="feed-action">💬 47 comments</span>
              <span className="feed-action">🔖 Save</span>
              <span className="feed-action">↗ Share</span>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)' }}>MK</div>
              <div className="feed-meta">
                <div className="feed-name">Maya K. <span style={{ color: 'var(--text3)', fontWeight: 400 }}> · Stanford · CS &apos;26</span></div>
                <div className="feed-detail">SWE Intern → Meta</div>
              </div>
              <div className="feed-time">5h ago</div>
            </div>
            <div className="outcome-strip outcome-rej">😔 Rejected after final round — virtual onsite</div>
            <div className="feed-body">
              Meta virtual onsite done. 2 coding problems — LRU Cache variant + harder tree problem. <strong>I think I was too slow on problem 2.</strong>
            </div>
            <div className="tag-row">
              <span className="tag tag-company">Meta</span>
              <span className="tag tag-rej">Rejected</span>
              <span className="tag tag-topic">LRU Cache</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action">❤️ 189</span>
              <span className="feed-action">💬 63 comments</span>
              <span className="feed-action">🔖 Save</span>
              <span className="feed-action">↗ Share</span>
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-card-top">
              <div className="feed-avatar" style={{ background: 'linear-gradient(135deg,#34d399,#38bdf8)' }}>AR</div>
              <div className="feed-meta">
                <div className="feed-name">Alex R. <span style={{ color: 'var(--text3)', fontWeight: 400 }}> · Carnegie Mellon · CS &apos;25</span></div>
                <div className="feed-detail">Quant Intern → Jane Street</div>
              </div>
              <div className="feed-time">8h ago</div>
            </div>
            <div className="outcome-strip outcome-progress">⏳ In Process — waiting after superday</div>
            <div className="feed-body">
              Jane Street superday done. <strong>5 rounds:</strong> mental math warm-up, probability theory deep dive, trading game simulation, market making problem, and a final interview with a partner. The trading game had poker-like mechanics.
            </div>
            <div className="tag-row">
              <span className="tag tag-company">Jane Street</span>
              <span className="tag tag-oa">In Process</span>
              <span className="tag tag-topic">Probability</span>
              <span className="tag tag-topic">Market Making</span>
            </div>
            <div className="feed-actions">
              <span className="feed-action">❤️ 312</span>
              <span className="feed-action">💬 91 comments</span>
              <span className="feed-action">🔖 Save</span>
              <span className="feed-action">↗ Share</span>
            </div>
          </div>
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
                { name: 'Google',    pay: '$55/hr', width: '100%', cls: 'percent-fill-green' },
                { name: 'Meta',      pay: '$52/hr', width: '94%',  cls: 'percent-fill-green' },
                { name: 'Amazon',    pay: '$48/hr', width: '87%',  cls: 'percent-fill-purple' },
                { name: 'Microsoft', pay: '$46/hr', width: '83%',  cls: 'percent-fill-purple' },
                { name: 'Stripe',    pay: '$60/hr', width: '100%', cls: 'percent-fill-yellow' },
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