'use client'

import { useState } from 'react'

interface CompanyLogoProps {
    name: string
    domain?: string
    fallbackEmoji?: string
    size?: number
    className?: string
}

export default function CompanyLogo({
    name,
    domain,
    fallbackEmoji = '🏢',
    size = 32,
    className = ''
}: CompanyLogoProps) {
    const [error, setError] = useState(false)

    // Try to find a domain if not provided for common companies
    const getDomain = (name: string) => {
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
        return domain || `${n.replace(/\s+/g, '')}.com`
    }

    const companyDomain = getDomain(name)
    const logoUrl = `https://logo.clearbit.com/${companyDomain}`

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
                borderRadius: size * 0.25,
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
                <span style={{ fontSize: size * 0.6 }}>{fallbackEmoji}</span>
            )}
        </div>
    )
}
