'use client'

export default function InviteLinkInput({ link }: { link: string }) {
    return (
        <input
            readOnly
            value={link}
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
            }}
            onClick={(e) => {
                const input = e.target as HTMLInputElement
                input.select()
                navigator.clipboard.writeText(input.value)
            }}
        />
    )
}
