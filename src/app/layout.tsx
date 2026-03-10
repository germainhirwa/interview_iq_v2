import type { Metadata } from 'next'
import './globals.css'
import CursorWrapper from '@/components/CursorWrapper'
import Script from 'next/script'

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
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '26316027704728706');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26316027704728706&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <div className="cursor" id="cursor" />
        <div className="cursor-ring" id="cursorRing" />
        <CursorWrapper />
        {children}
      </body>
    </html>
  )
}
