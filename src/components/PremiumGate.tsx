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
    <div className="premium-gate-overlay">
      <div className="premium-gate-card">
        <div className="premium-gate-crown">👑</div>
        <div className="premium-gate-badge">Premium Feature</div>
        <h2 className="premium-gate-title">
          {featureIcon} {featureName}
        </h2>
        <p className="premium-gate-desc">{description}</p>

        <ul className="premium-gate-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="premium-check">✓</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="premium-gate-actions">
          <button className="premium-upgrade-btn">
            ✨ Upgrade to Premium — Free During Beta
          </button>
          <Link href="/dashboard" className="premium-back-link">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="premium-gate-note">
          🎓 InterviewIQ is completely free during our invite-only beta.
          Premium just means you got early access — contact us to unlock it.
        </div>
      </div>
    </div>
  )
}
