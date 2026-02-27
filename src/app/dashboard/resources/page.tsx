import { createClient } from '@/lib/supabase/server'
import PremiumGate from '@/components/PremiumGate'

const GUIDES = [
  {
    icon: '🧩',
    title: 'Leetcode Patterns Mastersheet',
    sub: 'Two Pointers · Sliding Window · BFS/DFS · DP · Intervals',
    description: 'A curated breakdown of the 15 most common coding patterns seen in FAANG interviews, with 3-5 example problems for each pattern and the key insight to recognize them.',
    tag: 'Coding',
    tagCls: 'chip-purple',
    premium: false,
  },
  {
    icon: '🏗️',
    title: 'System Design Primer (42 pages)',
    sub: 'Scalability · Databases · Caching · Load Balancing · APIs',
    description: 'A comprehensive system design guide used by thousands of students to ace Google, Meta, and Amazon system design rounds. Covers CAP theorem, SQL vs NoSQL, CDNs, and more.',
    tag: 'System Design',
    tagCls: 'chip-blue',
    premium: true,
  },
  {
    icon: '🎤',
    title: 'Behavioral Interview Playbook',
    sub: 'STAR Method · Amazon LPs · Meta Culture · Google Googleyness',
    description: 'Pre-written STAR stories for the 25 most common behavioral questions, broken down by company culture. Includes leadership, conflict, failure, and impact stories.',
    tag: 'Behavioral',
    tagCls: 'chip-green',
    premium: true,
  },
  {
    icon: '📧',
    title: 'Cold Email Templates That Work',
    sub: 'Reaching out to engineers, PMs, and recruiters',
    description: 'Proven cold email templates for networking on LinkedIn and email. Includes scripts for coffee chats, referral asks, and recruiter outreach with real response rates.',
    tag: 'Networking',
    tagCls: 'chip-yellow',
    premium: true,
  },
  {
    icon: '🔑',
    title: 'OA Survival Guide',
    sub: 'HackerRank · CodeSignal · Karat · Codesignal',
    description: 'Platform-specific strategies for passing online assessments at major companies. Covers time management, which problems to skip, autograder quirks, and test case strategies.',
    tag: 'OA Prep',
    tagCls: 'chip-purple',
    premium: true,
  },
  {
    icon: '💡',
    title: 'Internship Negotiation Script',
    sub: 'Extend deadlines · Counter offers · Competing offers',
    description: 'Word-for-word scripts for negotiating internship offers, requesting deadline extensions, and leveraging competing offers — from students who successfully negotiated at top companies.',
    tag: 'Offers',
    tagCls: 'chip-green',
    premium: true,
  },
]

const RESOURCES = [
  { icon: '📘', title: 'Cracking the Coding Interview', author: 'Gayle L. McDowell', type: 'Book', url: 'https://www.crackingthecodinginterview.com/' },
  { icon: '📗', title: 'System Design Interview (vol 1 & 2)', author: 'Alex Xu', type: 'Book', url: '#' },
  { icon: '🎬', title: 'NeetCode on YouTube', author: 'Brad Nave', type: 'Channel', url: 'https://youtube.com/@NeetCode' },
  { icon: '🎬', title: 'Tech Interview Handbook', author: 'Yangshun Tay', type: 'Website', url: 'https://techinterviewhandbook.org' },
  { icon: '🎬', title: 'freeCodeCamp DSA Course', author: 'freeCodeCamp', type: 'Course', url: 'https://www.freecodecamp.org' },
  { icon: '📘', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', type: 'Book', url: '#' },
]

export default async function ResourcesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isPremium = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .single()
    isPremium = profile?.is_premium ?? false
  }

  return (
    <div className="page active" style={{ position: 'relative' }}>
      <div className="page-header">
        <div>
          <div className="page-title">
            📚 Resources
            {!isPremium && <span className="premium-nav-badge">👑 Premium</span>}
          </div>
          <div className="page-sub">Curated guides, templates, and books to sharpen your recruiting game</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
        <div className="stat-card"><div className="stat-label">Guides & Playbooks</div><div className="stat-value">42 <span>docs</span></div></div>
        <div className="stat-card"><div className="stat-label">Templates</div><div className="stat-value">18 <span>scripts</span></div></div>
        <div className="stat-card"><div className="stat-label">Avg Interview Boost</div><div className="stat-value">+34% <span>pass rate</span></div></div>
      </div>

      {/* Guides grid */}
      <div className="section-title" style={{ marginBottom: 16 }}>📖 Interview Guides</div>
      <div className="resources-grid">
        {GUIDES.map(g => (
          <div key={g.title} className={`resource-card ${g.premium && !isPremium ? 'resource-locked' : ''}`}>
            {g.premium && !isPremium && (
              <div className="resource-lock-icon">👑</div>
            )}
            <div className="resource-icon">{g.icon}</div>
            <div className="resource-body">
              <div className="resource-title">{g.title}</div>
              <div className="resource-sub">{g.sub}</div>
              <div className="resource-desc">{g.description}</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`chip ${g.tagCls}`}>{g.tag}</span>
                {g.premium && !isPremium ? (
                  <span style={{ fontSize: 11, color: 'var(--yellow)', fontFamily: 'var(--mono)' }}>PREMIUM</span>
                ) : (
                  <button className="resource-read-btn">Read Guide →</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended resources */}
      <div className="section-title" style={{ marginTop: 32, marginBottom: 16 }}>🔗 Recommended Books & Channels</div>
      <div className="resources-list">
        {RESOURCES.map(r => (
          <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link-card">
            <span className="resource-link-icon">{r.icon}</span>
            <div>
              <div className="resource-link-title">{r.title}</div>
              <div className="resource-link-sub">{r.author}</div>
            </div>
            <span className={`chip chip-purple`} style={{ marginLeft: 'auto', flexShrink: 0 }}>{r.type}</span>
          </a>
        ))}
      </div>

      {/* Premium gate — covers everything for non-premium users */}
      {!isPremium && (
        <PremiumGate
          featureName="Resources Hub"
          featureIcon="📚"
          description="Unlock all 42 guides, playbooks, and templates used by students at MIT, Stanford, and Swarthmore to land offers at top companies."
          bullets={[
            '42 curated interview guides & prep playbooks',
            'Cold email + referral request templates',
            'System design primer (42-page PDF)',
            'Behavioral interview scripts (STAR format)',
            'OA survival guide for every major platform',
            'Offer negotiation word-for-word scripts',
          ]}
        />
      )}
    </div>
  )
}
