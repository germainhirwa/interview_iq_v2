'use client'

import Link from 'next/link'

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>

                    <div style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <p>Last updated: March 2026</p>

                        <section>
                            <h2 style={{ color: 'var(--text)', fontSize: 20, marginBottom: 12 }}>1. Information We Collect</h2>
                            <p>
                                We collect your .edu email address, name, and university affiliation to verify your
                                student status and grant access to the platform. We also collect the interview
                                experiences and compensation data you choose to share.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text)', fontSize: 20, marginBottom: 12 }}>2. How We Use Your Information</h2>
                            <p>
                                We use your information to provide our services, maintain security, and verify
                                that our community consists only of verified students. We do not sell your
                                personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text)', fontSize: 20, marginBottom: 12 }}>3. Data Sharing</h2>
                            <p>
                                The interview experiences you post are shared with other verified members of
                                the InterviewIQ community. You have the option to post anonymously.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: 'var(--text)', fontSize: 20, marginBottom: 12 }}>4. Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your information,
                                including using Supabase for secure authentication.
                            </p>
                        </section>
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
