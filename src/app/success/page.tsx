import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="page active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 32, marginBottom: 16 }}>Payment Successful!</h1>
            <p style={{ color: 'var(--text2)', marginBottom: 32, maxWidth: 400 }}>
                Thank you for upgrading to Premium. Your account has been updated and you now have access to all premium features.
            </p>
            <Link href="/dashboard" className="onboarding-btn">
                Go to Dashboard
            </Link>
        </div>
    );
}
