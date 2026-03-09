'use client'

import { useState } from 'react'

interface CompanyLogoProps {
    name: string
    domain?: string
    size?: number
    className?: string
}

export default function CompanyLogo({
    name,
    domain,
    size = 32,
    className = ''
}: CompanyLogoProps) {
    const [error, setError] = useState(false)

    // Robust domain mapping (matching src/lib/data/companies.ts)
    const getDomain = (name: string) => {
        if (domain) return domain

        const n = name.toLowerCase()
        if (n.includes('google')) return 'google.com'
        if (n.includes('amazon')) return 'amazon.com'
        if (n.includes('stripe')) return 'stripe.com'
        if (n.includes('meta') || n.includes('facebook')) return 'meta.com'
        if (n.includes('netflix')) return 'netflix.com'
        if (n.includes('microsoft')) return 'microsoft.com'
        if (n.includes('openai')) return 'openai.com'
        if (n.includes('jane street')) return 'janestreet.com'
        if (n.includes('figma')) return 'figma.com'
        if (n.includes('airbnb')) return 'airbnb.com'
        if (n.includes('apple')) return 'apple.com'
        if (n.includes('nvidia')) return 'nvidia.com'
        if (n.includes('citadel')) return 'citadel.com'
        if (n.includes('palantir')) return 'palantir.com'
        if (n.includes('salesforce')) return 'salesforce.com'
        if (n.includes('ibm')) return 'ibm.com'
        if (n.includes('linkedin')) return 'linkedin.com'
        if (n.includes('deloitte')) return 'deloitte.com'
        if (n.includes('hubspot')) return 'hubspot.com'
        if (n.includes('goldman sachs')) return 'gs.com'
        if (n.includes('jpmorgan')) return 'jpmorgan.com'
        if (n.includes('intuit')) return 'intuit.com'
        if (n.includes('scale ai') || n === 'scale') return 'scale.com'
        if (n.includes('two sigma')) return 'twosigma.com'
        if (n.includes('decagon')) return 'decagon.ai'
        if (n.includes('capital one')) return 'capitalone.com'

        return `${n.replace(/\s+/g, '')}.com`
    }

    const companyDomain = getDomain(name)
    const logoUrl = `https://logos.hunter.io/${companyDomain}`

    const getFallbackEmoji = (name: string) => {
        const n = name.toLowerCase()
        if (n.includes('google')) return '🔵'
        if (n.includes('amazon')) return '🟠'
        if (n.includes('stripe')) return '🟣'
        if (n.includes('meta')) return '🟦'
        if (n.includes('netflix')) return '🔴'
        if (n.includes('jane street')) return '🟤'
        if (n.includes('openai')) return '⚫'
        if (n.includes('nvidia')) return '🟢'
        if (n.includes('jpmorgan')) return '🔷'
        if (n === 'scale') return '⚖️'
        return '🏢'
    }

    return (
        <div
            className={`company-logo-wrapper ${className}`}
            style={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: 6,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)'
            }}
        >
            {!error ? (
                <img
                    src={logoUrl}
                    alt={name}
                    width={size}
                    height={size}
                    style={{ objectFit: 'contain' }}
                    onError={() => setError(true)}
                />
            ) : (
                <span style={{ fontSize: size * 0.6 }}>{getFallbackEmoji(name)}</span>
            )}
        </div>
    )
}
