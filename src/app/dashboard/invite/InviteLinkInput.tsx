'use client'

import { useEffect, useState } from 'react'

export default function InviteLinkInput({ link }: { link: string }) {
    const [dynamicLink, setDynamicLink] = useState(link)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        // Replace localhost with actual origin if present
        if (typeof window !== 'undefined') {
            const currentOrigin = window.location.origin
            if (link.includes('localhost:3000')) {
                setDynamicLink(link.replace('http://localhost:3000', currentOrigin))
            } else if (link.startsWith('/')) {
                setDynamicLink(`${currentOrigin}${link}`)
            } else if (!link.startsWith('http')) {
                // If it's just a ref query or similar
                setDynamicLink(`${currentOrigin}/login${link.startsWith('?') ? link : `?ref=${link}`}`)
            }
        }
    }, [link])

    const handleCopy = () => {
        navigator.clipboard.writeText(dynamicLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <input
                    readOnly
                    value={dynamicLink}
                    style={{
                        width: '100%',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: '12px 16px',
                        fontFamily: 'var(--mono)',
                        fontSize: 14,
                        color: 'var(--text)',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={(e) => {
                        const input = e.target as HTMLInputElement
                        input.select()
                        handleCopy()
                    }}
                />
            </div>
            <button
                onClick={handleCopy}
                style={{
                    background: copied ? 'var(--green)' : 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0 20px',
                    height: 44,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 100
                }}
            >
                {copied ? 'Copied! ✨' : 'Copy Link'}
            </button>
        </div>
    )
}
