'use client'

import { useState } from 'react'

export default function ReportBugModal({
    isOpen,
    onClose
}: {
    isOpen: boolean
    onClose: () => void
}) {
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!description.trim()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/report-bug', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description })
            })
            if (!response.ok) throw new Error('Failed to submit bug report')

            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                setDescription('')
                onClose()
            }, 3000)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="premium-gate-overlay" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
                className="premium-gate-card"
                style={{
                    maxWidth: 450,
                    width: '90%',
                    position: 'relative',
                    textAlign: 'left',
                    animation: 'slideUp 0.3s ease-out',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-card)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'none',
                        border: 'none',
                        color: 'var(--text3)',
                        cursor: 'pointer',
                        fontSize: 20
                    }}
                >
                    ✕
                </button>

                {!submitted ? (
                    <form onSubmit={handleSubmit} style={{ padding: '30px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <span style={{ fontSize: 28 }}>🐛</span>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 18, color: 'var(--text)' }}>Report a Bug</h3>
                                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)' }}>
                                    Found an issue? Let us know so we can fix it!
                                </p>
                            </div>
                        </div>

                        <textarea
                            className="auth-input"
                            style={{ minHeight: 120, resize: 'vertical', paddingTop: 12, marginBottom: 20 }}
                            placeholder="Please describe the issue in detail..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />

                        <button
                            type="submit"
                            className="top-btn primary"
                            style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                            disabled={isSubmitting || !description.trim()}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Bug Report'}
                        </button>
                    </form>
                ) : (
                    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                        <h3 style={{ margin: '0 0 12px', fontSize: 20, color: 'var(--text)' }}>Thank you!</h3>
                        <p style={{ margin: 0, fontSize: 14, color: 'var(--text2)', lineHeight: 1.5 }}>
                            Your report has been sent to our team. We're very sorry for the inconvenience and will reach out with a fix shortly!
                        </p>
                    </div>
                )}
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
        </div>
    )
}
