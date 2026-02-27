import { createClient } from '@/lib/supabase/server'
import PremiumGate from '@/components/PremiumGate'

const SAMPLE_REQUESTS = [
  {
    id: 1,
    user: 'Alex M.',
    school: 'MIT · CS \'26',
    avatar: 'AM',
    avatarColor: 'linear-gradient(135deg,#6c63ff,#a78bfa)',
    companies: ['Google', 'Meta', 'Stripe'],
    role: 'SWE Intern',
    season: 'Summer 2026',
    note: 'Currently interviewing at Citadel — 3.9 GPA, strong in distributed systems. Happy to return the favor!',
    postedAgo: '2h ago',
    canHelp: 4,
  },
  {
    id: 2,
    user: 'Priya K.',
    school: 'Stanford · EE \'25',
    avatar: 'PK',
    avatarColor: 'linear-gradient(135deg,#38bdf8,#22d3ee)',
    companies: ['Amazon', 'Apple', 'Nvidia'],
    role: 'SWE New Grad',
    season: 'Full-Time 2025',
    note: 'Graduating Dec 2025. 2 prev internships (Google, Palantir). Looking for a referral at any of these companies.',
    postedAgo: '5h ago',
    canHelp: 7,
  },
  {
    id: 3,
    user: 'Marcus T.',
    school: 'Carnegie Mellon · CS \'26',
    avatar: 'MT',
    avatarColor: 'linear-gradient(135deg,#34d399,#10b981)',
    companies: ['Jane Street', 'Two Sigma', 'Citadel'],
    role: 'Quant / SWE Intern',
    season: 'Summer 2026',
    note: 'Strong math background (Putnam top 500). Looking for a quant or quant-adjacent referral. Will share my prep materials!',
    postedAgo: '1d ago',
    canHelp: 2,
  },
  {
    id: 4,
    user: 'Jordan S.',
    school: 'Swarthmore · CS \'26',
    avatar: 'JS',
    avatarColor: 'linear-gradient(135deg,#fb923c,#f59e0b)',
    companies: ['OpenAI', 'Anthropic', 'Scale AI'],
    role: 'AI Research Intern',
    season: 'Summer 2026',
    note: 'Research experience in NLP (published at ACL\'24). Looking for referrals at AI labs. Can trade ML interview tips.',
    postedAgo: '1d ago',
    canHelp: 3,
  },
]

const TIPS = [
  { icon: '💬', tip: 'Personalize your message — mention a shared connection or why you specifically want that company.' },
  { icon: '📋', tip: 'Include your resume and a 2–3 sentence pitch. Make it easy for the referrer.' },
  { icon: '🤝', tip: 'Offer something in return — interview tips, a mock, or a future favor.' },
  { icon: '⏰', tip: 'Post your request at least 6–8 weeks before application deadlines.' },
]

export default async function ReferralsPage() {
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
            🤝 Referrals
            {!isPremium && <span className="premium-nav-badge">👑 Premium</span>}
          </div>
          <div className="page-sub">Find referrals from peers and help each other get in the door</div>
        </div>
        <button className="top-btn primary" style={{ opacity: isPremium ? 1 : 0.4, cursor: isPremium ? 'pointer' : 'not-allowed' }}>
          + Post My Request
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
        <div className="stat-card"><div className="stat-label">Active Requests</div><div className="stat-value">84 <span>posts</span></div></div>
        <div className="stat-card"><div className="stat-label">Referrals Matched</div><div className="stat-value">312 <span>total</span></div></div>
        <div className="stat-card"><div className="stat-label">Offer Rate (referred)</div><div className="stat-value">3.4× <span>higher</span></div></div>
      </div>

      {/* Referral requests */}
      <div className="section-title" style={{ marginBottom: 16 }}>📌 Active Referral Requests</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
        {SAMPLE_REQUESTS.map(r => (
          <div key={r.id} className="referral-card">
            <div className="referral-top">
              <div className="feed-avatar" style={{ background: r.avatarColor }}>{r.avatar}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{r.user}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{r.school}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{r.postedAgo}</div>
                <div style={{ fontSize: 11, color: 'var(--accent2)', marginTop: 2 }}>{r.canHelp} can help</div>
              </div>
            </div>

            <div className="referral-companies">
              {r.companies.map(c => (
                <span key={c} className="tag tag-company">{c}</span>
              ))}
              <span className="chip chip-blue" style={{ fontSize: 11 }}>{r.role}</span>
              <span className="chip" style={{ fontSize: 11 }}>{r.season}</span>
            </div>

            <div className="referral-note">{r.note}</div>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button className="referral-help-btn" style={{ opacity: isPremium ? 1 : 0.4 }}>
                🤝 I Can Help
              </button>
              <button className="referral-msg-btn" style={{ opacity: isPremium ? 1 : 0.4 }}>
                💬 Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="section-title" style={{ marginBottom: 16 }}>💡 Referral Request Tips</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        {TIPS.map(t => (
          <div key={t.tip} className="tip-card">
            <span style={{ fontSize: 18, flexShrink: 0 }}>{t.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{t.tip}</span>
          </div>
        ))}
      </div>

      {/* Premium gate */}
      {!isPremium && (
        <PremiumGate
          featureName="Referral Network"
          featureIcon="🤝"
          description="Connect with peers who can get you a referral at top companies. Referred candidates are 3.4× more likely to get an offer."
          bullets={[
            'Browse and respond to 84+ active referral requests',
            'Post your own referral request to the network',
            'Message peers directly for introductions',
            'See which companies have active referrers in the network',
            'Get notified when someone can help with your target company',
            'Track your referral conversations in one place',
          ]}
        />
      )}
    </div>
  )
}
