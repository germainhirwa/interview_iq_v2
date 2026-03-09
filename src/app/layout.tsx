import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'

const CursorEffect = dynamic(() => import('@/components/CursorEffect'), { ssr: false })

export const metadata: Metadata = {
  title: 'InterviewIQ — The CS Recruiting Intelligence Platform',
  description: 'Real-time company timelines, interview breakdowns, and comp data from thousands of CS students.',
  icons: {
    icon: '/interview_iq_icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="cursor" id="cursor" />
        <div className="cursor-ring" id="cursorRing" />
        <CursorEffect />
        {children}
      </body>
    </html>
  )
}
