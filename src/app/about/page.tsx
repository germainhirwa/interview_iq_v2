'use client'

import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav id="navbar" className="scrolled" style={{ position: 'relative' }}>
                <Link className="nav-logo" href="/">
                    <div className="logo-cube">IQ</div>
                    InterviewIQ
                </Link>
            </nav>

            <main style={{ flex: 1, padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
                <div className="reveal visible">
                    <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 24, color: 'var(--text)' }}>
                        About InterviewIQ
                    </h1>

                    <div style={{ fontSize: 18, color: 'var(--text2)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <p>
                            InterviewIQ was built by CS students, for CS students. We noticed a common problem:
                            the technical recruiting process is often a "black box."
                        </p>

                        <p>
                            Students spend hundreds of hours on LeetCode, but still walk into interviews
                            without knowing the specific culture, rounds, or compensation benchmarks of the
                            companies they are targeting.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: 16 }}>Our Mission</h2>
                        <p>
                            Our mission is to bring transparency to technical recruiting. By crowdsourcing
                            real-time interview experiences and compensation data, we empower students
                            to negotiate better offers and walk into every round with confidence.
                        </p>

                        <div style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 20,
                            padding: 32,
                            marginTop: 24
                        }}>
                            <h3 style={{ color: 'var(--accent2)', marginBottom: 16 }}>By the community, for the community</h3>
                            <p style={{ fontSize: 16 }}>
                                Every data point on this platform comes from a verified student. We use
                                strict .edu verification to ensure that the "signal" remains high and
                                the noise remains low.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 64 }}>
                        <Link href="/login" className="btn-hero" style={{ display: 'inline-block' }}>
                            Join the Hub →
                        </Link>
                    </div>
                </div>
            </main>

            <footer style={{ marginTop: 'auto' }}>
                <div className="footer-logo">InterviewIQ</div>
                <div className="footer-links">
                    <Link href="/about">About</Link>
                    <Link href="/privacy">Privacy</Link>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                </div>
                <div className="footer-right">Built for CS students, by CS students · 2026</div>
            </footer>
        </div>
    )
}
