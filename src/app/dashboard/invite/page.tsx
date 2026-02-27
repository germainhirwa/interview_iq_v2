import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import InviteLinkInput from './InviteLinkInput'

export default async function InvitePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('invite_count, is_premium, school')
        .eq('id', user.id)
        .single()

    const inviteCount = profile?.invite_count || 0
    const isPremium = profile?.is_premium || false
    const school = profile?.school ? profile.school.split(' ')[0] : 'friend'

    // The base URL for the app
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const inviteLink = `${appUrl}/login?ref=${user.id}`

    return (
        <div className="page active">
            <div style={{ maxWidth: 640, margin: '0 auto', paddingTop: 40, paddingBottom: 60 }}>

                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                        Change their life with the internship of their dreams.
                    </h1>
                    <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.6, margin: '0 20px' }}>
                        Invite 5 {school} friends to InterviewIQ. When they sign up, you unlock Premium permanently. Give them the intel they need to ace their next interview.
                    </p>
                </div>

                <div style={{ background: 'var(--bg2)', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Your Progress</h2>
                        <div style={{ fontSize: 14, color: 'var(--text2)', background: 'var(--bg)', padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)' }}>
                            {isPremium ? 'Premium Unlocked ✨' : `${inviteCount} / 5 Invites`}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <div
                                key={num}
                                style={{
                                    height: 12,
                                    flex: 1,
                                    borderRadius: 6,
                                    background: isPremium || num <= inviteCount
                                        ? 'linear-gradient(90deg, var(--accent), var(--accent2))'
                                        : 'var(--border)',
                                    boxShadow: isPremium || num <= inviteCount ? '0 0 10px rgba(108,99,255,0.4)' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            />
                        ))}
                    </div>

                    <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 12, color: 'var(--text2)' }}>Your Invite Link</h3>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <InviteLinkInput link={inviteLink} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                        <div style={{ fontSize: 24, marginBottom: 12 }}>🤝</div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Help a Friend</div>
                        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>Give them access to 42,000+ interview experiences and timelines.</div>
                    </div>
                    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                        <div style={{ fontSize: 24, marginBottom: 12 }}>👑</div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Unlock Premium</div>
                        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>Get lifetime access to the Referral Network, Resume Checks, and more.</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
