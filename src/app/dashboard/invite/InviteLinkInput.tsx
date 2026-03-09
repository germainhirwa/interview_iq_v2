'use client'

import { useEffect, useState } from 'react'

export default function InviteLinkInput({ link }: { link: string }) {
    const [dynamicLink, setDynamicLink] = useState(link)

    useEffect(() => {
        // Replace localhost with actual origin if present
        if (typeof window !== 'undefined') {
            const currentOrigin = window.location.origin
            if (link.includes('localhost:3000')) {
                setDynamicLink(link.replace('http://localhost:3000', currentOrigin))
            } else if (link.startsWith('/')) {
                setDynamicLink(`${currentOrigin}${link}`)
            }
        }
    }, [link])

    return (
        <input
            readOnly
            value={dynamicLink}
            style={{
                flex: 1,
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
                navigator.clipboard.writeText(input.value)
                // Optional: show a "Copied!" feedback here if needed
            }}
        />
    )
}
