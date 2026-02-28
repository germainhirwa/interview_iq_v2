'use client'

import Link from 'next/link'

interface PremiumGateProps {
  featureName: string
  featureIcon: string
  description: string
  bullets: string[]
}

export default function PremiumGate({ featureName, featureIcon, description, bullets }: PremiumGateProps) {
  return (

    // I will revert to this once the polar subscription is accepted
    //   <div className="premium-gate-card">
    // <div className="premium-gate-crown">👑</div>
    // <div className="premium-gate-badge">Premium Feature</div>
    // <h2 className="premium-gate-title">
    //   {featureIcon} {featureName}
    // </h2>
    // <p className="premium-gate-desc">{description}</p>



    <div className="premium-gate-overlay">
      <div className="premium-gate-content">
        {/* Original: <div className="premium-crown">👑</div> */}
        <div className="premium-crown">🎓</div>

        {/* Original: <h2>Unlock Premium Access</h2> */}
        <h2>Unlock Premium Learning Resources</h2>

        {/* Original: <p>To view this experience and unlock all company timelines, you need a premium subscription.</p> */}
        <p>This deep-dive case study and its associated preparation materials are part of our premium educational suite.</p>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '2rem' }}>
          {/* Original: Join 28,000+ students who use InterviewIQ to land their dream internships. */}
          Join 28,000+ students mastering technical interviews with our curated guides.
        </p>
        <ul className="premium-gate-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="premium-check">✓</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="premium-gate-actions">
          <a href={`/api/checkout?products=${process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || ''}`} className="premium-upgrade-btn">
            ✨ Upgrade with Polar
          </a>
          <Link href="/dashboard/invite" className="premium-upgrade-btn" style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', marginTop: 10 }}>
            🎁 Invite 5 Friends
          </Link>
          <Link href="/dashboard" className="premium-back-link" style={{ marginTop: 20 }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div className="premium-gate-note">
          🎓 Get lifetime access for FREE by inviting your friends.
        </div>
      </div>
    </div>
  )
}
