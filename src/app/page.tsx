// app/page.tsx  — Landing page (Server Component, no "use client" needed)
// This replaces your index.html landing page

"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

function useLandingEffects() {
  useEffect(() => {
    // Custom cursor
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')

    if (cursor && ring) {
      let mx = 0
      let my = 0
      let rx = 0
      let ry = 0

      const handleMove = (e: MouseEvent) => {
        mx = e.clientX
        my = e.clientY
        cursor.style.left = `${mx - 5}px`
        cursor.style.top = `${my - 5}px`
      }

      document.addEventListener('mousemove', handleMove)

      let frameId: number
      const animRing = () => {
        rx += (mx - rx - 18) * 0.12
        ry += (my - ry - 18) * 0.12
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
        frameId = window.requestAnimationFrame(animRing)
      }
      frameId = window.requestAnimationFrame(animRing)

      const interactive = Array.from(document.querySelectorAll('button, a, input')) as HTMLElement[]
      const handleEnter = () => {
        cursor.style.transform = 'scale(2.5)'
        ring.style.transform = 'scale(0.6)'
        ring.style.borderColor = 'rgba(124,106,255,0.8)'
      }
      const handleLeave = () => {
        cursor.style.transform = 'scale(1)'
        ring.style.transform = 'scale(1)'
        ring.style.borderColor = 'rgba(124,106,255,0.5)'
      }
      interactive.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })

      return () => {
        document.removeEventListener('mousemove', handleMove)
        window.cancelAnimationFrame(frameId)
        interactive.forEach((el) => {
          el.removeEventListener('mouseenter', handleEnter)
          el.removeEventListener('mouseleave', handleLeave)
        })
      }
    }
  }, [])

  useEffect(() => {
    // Nav scroll state
    const navbar = document.getElementById('navbar')
    if (!navbar) return

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Reveal on scroll
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Count-up numbers
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.count-target'))
    if (!('IntersectionObserver' in window) || targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.target || '0', 10)
          const suffix = el.dataset.suffix || ''
          const prefix = el.textContent?.trim().startsWith('$') ? '$' : ''
          const duration = 2000
          const startTime = performance.now()

          const update = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const val = Math.floor(eased * target)
            const formatted = val >= 1000 ? val.toLocaleString() : String(val)
            el.textContent = `${prefix}${formatted}${suffix}`
            if (progress < 1) requestAnimationFrame(update)
          }

          requestAnimationFrame(update)
          observer.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Parallax hero cards
    const handleMove = (e: MouseEvent) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2
      const apply = (selector: string, xMult: number, yMult: number) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
          el.style.transform = `translate(${xRatio * xMult}px, ${yRatio * yMult}px)`
        })
      }
      apply('.float-l1', -8, -5)
      apply('.float-l2', -12, -8)
      apply('.float-r1', 8, -5)
      apply('.float-r2', 12, 8)
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    // Company ratings bar animation
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.company-ratings'))
    if (!('IntersectionObserver' in window) || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.querySelectorAll<HTMLElement>('.cr-bar-fill').forEach((bar) => {
            const targetWidth = bar.style.width || getComputedStyle(bar).width
            bar.style.width = '0%'
            setTimeout(() => {
              bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)'
              bar.style.width = targetWidth
            }, 200)
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Invite dots animation
    const dots = Array.from(document.querySelectorAll<HTMLElement>('.inv-dot:not(.filled)'))
    if (dots.length === 0) return
    let index = 0
    const id = window.setInterval(() => {
      if (index < dots.length) {
        const d = dots[index]
        d.classList.add('filled')
        d.textContent = '✓'
        d.style.transition = 'all 0.3s'
        index++
      } else {
        dots.forEach((d, i) => {
          d.classList.remove('filled')
          d.textContent = String(i + 3)
        })
        index = 0
      }
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    // Auth code fail-safe: if we land on / with a code, forward to the callback
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      window.location.href = `/auth/callback?code=${code}`
    }
  }, [])
}

export default function LandingPage() {
  useLandingEffects()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 2000)
      return
    }
    setEmailSuccess(true)
  }

  return (
    <>
      {/* NAV */}
      <nav id="navbar">
        <a className="nav-logo" href="#">
          <div className="logo-cube">IQ</div>
          InterviewIQ
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Access</a>
          <a href="#companies">Companies</a>
        </div>
        <div className="nav-cta">
          <Link href="/login" className="btn-ghost">
            Log in
          </Link>
          <Link href="/login" className="btn-primary">
            Join Free →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Floating cards LEFT */}
        <div className="hero-float-left">
          <div className="float-card float-l1">
            <div className="float-card-top">
              <div className="fc-avatar" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>
                JS
              </div>
              <div>
                <div className="fc-name">Jordan S.</div>
                <div className="fc-school">MIT · CS &apos;25</div>
              </div>
              <span className="fc-badge badge-offer">Offer 🎉</span>
            </div>
            <div className="fc-body">
              Google final round — hard DP + system design. Offer came 5 days later.
            </div>
            <div className="fc-pay">$55/hr + $10K housing</div>
          </div>
          <div className="float-card float-l2">
            <div className="float-card-top">
              <div className="fc-avatar" style={{ background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}>
                AR
              </div>
              <div>
                <div className="fc-name">Alex R.</div>
                <div className="fc-school">CMU · CS &apos;26</div>
              </div>
              <span className="fc-badge badge-live">⏳ In Process</span>
            </div>
            <div className="fc-body">Jane Street superday — 5 rounds. Trading game simulation surprised me.</div>
            <div className="fc-tags">
              <span className="fc-tag">Probability</span>
              <span className="fc-tag">Market Making</span>
            </div>
          </div>
        </div>

        {/* Floating cards RIGHT */}
        <div className="hero-float-right">
          <div className="float-card float-r1">
            <div className="float-card-top">
              <div className="fc-avatar" style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)' }}>
                TC
              </div>
              <div>
                <div className="fc-name">Tyler C.</div>
                <div className="fc-school">Cornell · ECE &apos;26</div>
              </div>
              <span className="fc-badge badge-offer">Offer 🎉</span>
            </div>
            <div className="fc-body">Apple focused on C++/systems — no LeetCode grind! $48/hr total.</div>
            <div className="fc-pay">$48/hr + housing stipend</div>
          </div>
          <div className="float-card float-r2">
            <div className="float-card-top">
              <div className="fc-avatar" style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)' }}>
                MK
              </div>
              <div>
                <div className="fc-name">Maya K.</div>
                <div className="fc-school">Stanford · CS &apos;26</div>
              </div>
              <span className="fc-badge badge-rej">Rejected 😔</span>
            </div>
            <div className="fc-body">
              Meta virtual onsite — LRU Cache variant. Too slow on problem 2. Still grateful for the prep.
            </div>
            <div className="fc-tags">
              <span className="fc-tag">LRU Cache</span>
              <span className="fc-tag">Trees</span>
            </div>
          </div>
        </div>

        <div className="hero-ticker">
          <div className="live-dot" />
          842 new experiences posted this week — Google OAs just dropped
        </div>

        <h1>
          <span className="line-1">Stop guessing.</span>
          <span className="line-2">Start knowing.</span>
        </h1>

        <p className="hero-sub">
          The platform <strong>28,000+ CS students</strong> use to decode every company&apos;s recruiting process — real
          experiences, real timelines, real compensation data.
        </p>

        <div className="hero-actions">
          <Link href="/login" className="btn-hero">
            Get Early Access — It&apos;s Free →
          </Link>
          <a className="btn-secondary" href="#features">
            <span>▶</span> See how it works
          </a>
        </div>

        <div className="hero-social-proof">
          <div className="proof-avatars">
            <div className="proof-avatar">JS</div>
            <div className="proof-avatar" style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)' }}>
              MK
            </div>
            <div className="proof-avatar" style={{ background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}>
              AR
            </div>
            <div className="proof-avatar" style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)' }}>
              TC
            </div>
            <div className="proof-avatar" style={{ background: 'linear-gradient(135deg,#a78bfa,#6c63ff)' }}>
              PR
            </div>
          </div>
          <span>
            Joined by students from <strong style={{ color: 'var(--text2)' }}>MIT, Stanford, CMU, Berkeley</strong> and
            400+ schools
          </span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[
            { emoji: '🔵', name: 'Google', pay: '$55/hr' },
            { emoji: '🟠', name: 'Amazon', pay: '$48/hr' },
            { emoji: '🟣', name: 'Stripe', pay: '$60/hr' },
            { emoji: '🟦', name: 'Meta', pay: '$52/hr' },
            { emoji: '⚫', name: 'OpenAI', pay: '$65/hr' },
            { emoji: '🟤', name: 'Jane Street', pay: '$120/hr' },
            { emoji: '🔴', name: 'Netflix', pay: '$58/hr' },
            { emoji: '🔷', name: 'Microsoft', pay: '$46/hr' },
            { emoji: '🟡', name: 'Figma', pay: '$45/hr' },
            { emoji: '🟢', name: 'Airbnb', pay: '$50/hr' },
            // Duplicate for seamless loop
            { emoji: '🔵', name: 'Google', pay: '$55/hr' },
            { emoji: '🟠', name: 'Amazon', pay: '$48/hr' },
            { emoji: '🟣', name: 'Stripe', pay: '$60/hr' },
            { emoji: '🟦', name: 'Meta', pay: '$52/hr' },
            { emoji: '⚫', name: 'OpenAI', pay: '$65/hr' },
            { emoji: '🟤', name: 'Jane Street', pay: '$120/hr' },
            { emoji: '🔴', name: 'Netflix', pay: '$58/hr' },
            { emoji: '🔷', name: 'Microsoft', pay: '$46/hr' },
            { emoji: '🟡', name: 'Figma', pay: '$45/hr' },
            { emoji: '🟢', name: 'Airbnb', pay: '$50/hr' },
          ].map((item, i) => (
            <div key={i} className="marquee-item">
              <span style={{ fontSize: 18 }}>{item.emoji}</span>
              <span className="m-company">{item.name}</span>
              <span className="m-dot" />
              <span className="m-pay">{item.pay}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NUMBERS */}
      <section className="proof-section">
        <div className="proof-grid">
          <div className="proof-item reveal">
            <div className="proof-num">
              <span className="count-target" data-target="42819">
                42,819
              </span>
            </div>
            <div className="proof-label">Interview experiences shared</div>
          </div>
          <div className="proof-item reveal reveal-delay-1">
            <div className="proof-num">
              <span className="count-target" data-target="890">
                890
              </span>
            </div>
            <div className="proof-label">Companies tracked</div>
          </div>
          <div className="proof-item reveal reveal-delay-2">
            <div className="proof-num">
              <span className="count-target" data-target="28" data-suffix="K">
                28K
              </span>
            </div>
            <div className="proof-label">Active CS students</div>
          </div>
          <div className="proof-item reveal reveal-delay-3">
            <div className="proof-num">
              <span className="count-target" data-target="47" data-suffix="/hr">
                $47
              </span>
            </div>
            <div className="proof-label">Average intern pay tracked</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-eyebrow reveal">
          <span className="eyebrow-line" />
          What you get
        </div>
        <h2 className="section-h2 reveal reveal-delay-1">
          Everything you need
          <br />
          to land the offer.
        </h2>
        <p className="section-sub reveal reveal-delay-2">
          Stop spending hours on Reddit threads and Glassdoor reviews from 2019. InterviewIQ gives you fresh, structured
          intelligence from students who just went through it.
        </p>

        <div className="features-hero-card reveal reveal-delay-3">
          <div className="features-header">
            <div className="feature-icon-lg purple">🧠</div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Company Intelligence Hub
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text2)',
                  maxWidth: 600,
                  lineHeight: 1.6,
                }}
              >
                Every company gets its own deep page — recruiting timelines, interview breakdowns, round-by-round pass
                rates, and compensation data. All crowd-sourced and updated in real time.
              </p>
            </div>
          </div>
          <div className="features-body-cols">
            <div className="feature-col" data-num="01">
              <div className="feature-col-icon">🗓</div>
              <h3>Live Timelines</h3>
              <p>
                See exactly when OAs go out, when virtual onsites happen, and when offers drop — for every company,
                every cycle.
              </p>
            </div>
            <div className="feature-col" data-num="02">
              <div className="feature-col-icon">🎤</div>
              <h3>Interview Breakdowns</h3>
              <p>
                Know the exact topics, difficulty, and pass rates for every interview round before you walk in. No more
                surprises.
              </p>
            </div>
            <div className="feature-col" data-num="03">
              <div className="feature-col-icon">💰</div>
              <h3>Compensation Data</h3>
              <p>
                Real intern pay numbers — hourly rate, housing stipend, signing bonus — broken down by role, team, and
                location.
              </p>
            </div>
          </div>
        </div>

        <div className="features-grid" style={{ marginTop: 16 }}>
          <div className="feat-card tall reveal">
            <div className="feat-card-glow purple" />
            <div className="feat-eyebrow">📡 Live Feed</div>
            <div className="feat-h">The recruiting pulse of every CS student</div>
            <div className="feat-p">
              A structured, real-time feed of interview experiences, offer reveals, OA updates, and questions — tagged
              by company, role, round, and outcome.
            </div>
            <div className="mini-feed">
              <div className="mini-post">
                <div className="mini-av" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>
                  JS
                </div>
                <div className="mini-text">
                  <strong>Jordan S.</strong> — Google final round done. Two LC hards, system design. Offer came 5 days
                  later.
                </div>
                <span className="mini-tag badge-offer">🎉 Offer</span>
              </div>
              <div className="mini-post">
                <div className="mini-av" style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)' }}>
                  TC
                </div>
                <div className="mini-text">
                  <strong>Tyler C.</strong> — Apple focused on C++/systems, not LC. Two rounds same day. Very different
                  from what I expected.
                </div>
                <span className="mini-tag badge-offer">🎉 Offer</span>
              </div>
              <div className="mini-post">
                <div className="mini-av" style={{ background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}>
                  AR
                </div>
                <div className="mini-text">
                  <strong>Alex R.</strong> — Anyone else still waiting post-Jane Street superday? It&apos;s been 2 weeks.
                </div>
                <span className="mini-tag badge-live">⏳ Waiting</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="feat-card reveal reveal-delay-1">
              <div className="feat-card-glow cyan" />
              <div className="feat-eyebrow">📊 Compensation</div>
              <div className="feat-h">Know your worth before you negotiate</div>
              <div className="company-ratings">
                <div className="cr-row">
                  <span className="cr-logo">🟤</span>
                  <span className="cr-name">Jane St.</span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: '100%' }} />
                  </div>
                  <span className="cr-val">$120</span>
                </div>
                <div className="cr-row">
                  <span className="cr-logo">⚫</span>
                  <span className="cr-name">OpenAI</span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: '54%' }} />
                  </div>
                  <span className="cr-val">$65</span>
                </div>
                <div className="cr-row">
                  <span className="cr-logo">🟣</span>
                  <span className="cr-name">Stripe</span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: '50%' }} />
                  </div>
                  <span className="cr-val">$60</span>
                </div>
                <div className="cr-row">
                  <span className="cr-logo">🔵</span>
                  <span className="cr-name">Google</span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: '46%' }} />
                  </div>
                  <span className="cr-val">$55</span>
                </div>
                <div className="cr-row">
                  <span className="cr-logo">🟦</span>
                  <span className="cr-name">Meta</span>
                  <div className="cr-bar-track">
                    <div className="cr-bar-fill" style={{ width: '43%' }} />
                  </div>
                  <span className="cr-val">$52</span>
                </div>
              </div>
            </div>

            <div className="feat-card reveal reveal-delay-2">
              <div className="feat-card-glow green" />
              <div className="feat-eyebrow">🗓 Timelines</div>
              <div className="feat-h">Never miss a deadline again</div>
              <div className="mini-timeline">
                <div className="mt-step">
                  <div className="mt-dot done">✓</div>
                  <div className="mt-content">
                    <div className="mt-label">OA Sent</div>
                    <div className="mt-date">Sep–Oct 2025</div>
                  </div>
                </div>
                <div className="mt-step">
                  <div className="mt-dot done">✓</div>
                  <div className="mt-content">
                    <div className="mt-label">Phone Screen</div>
                    <div className="mt-date">Oct–Nov 2025</div>
                  </div>
                </div>
                <div className="mt-step">
                  <div className="mt-dot active">●</div>
                  <div className="mt-content">
                    <div className="mt-label">Virtual Onsite</div>
                    <div className="mt-date">Now — Jan 2026</div>
                  </div>
                </div>
                <div className="mt-step">
                  <div className="mt-dot pending">○</div>
                  <div className="mt-content">
                    <div className="mt-label">Offers</div>
                    <div className="mt-date">Jan–Feb 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw-section" id="how">
        <div className="hiw-inner">
          <div className="section-eyebrow reveal">
            <span className="eyebrow-line" />
            How it works
          </div>
          <h2 className="section-h2 reveal reveal-delay-1">
            Up and running
            <br />
            in 60 seconds.
          </h2>
          <div className="hiw-steps reveal reveal-delay-2">
            <div className="hiw-step">
              <div className="step-arrow">→</div>
              <div className="step-num">01 —</div>
              <div className="step-icon">🎓</div>
              <div className="step-h">Sign up with your .edu</div>
              <div className="step-p">
                Quick signup with your school email. We verify you&apos;re a CS student so the community stays
                signal-only.
              </div>
            </div>
            <div className="hiw-step">
              <div className="step-arrow">→</div>
              <div className="step-num">02 —</div>
              <div className="step-icon">🏢</div>
              <div className="step-h">Search any company</div>
              <div className="step-p">
                Find the companies you&apos;re targeting. See their full recruiting timeline, interview breakdown, and
                what others got paid.
              </div>
            </div>
            <div className="hiw-step">
              <div className="step-arrow">→</div>
              <div className="step-num">03 —</div>
              <div className="step-icon">📡</div>
              <div className="step-h">Follow the live feed</div>
              <div className="step-p">
                Get real-time updates when OAs drop, when offer waves go out, and what other students are experiencing
                right now.
              </div>
            </div>
            <div className="hiw-step">
              <div className="step-num">04 —</div>
              <div className="step-icon">🎉</div>
              <div className="step-h">Share your experience</div>
              <div className="step-p">
                Pay it forward. Post your interview experience and help the next student walk in prepared. The community
                runs on generosity.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-eyebrow reveal">
          <span className="eyebrow-line" />
          Student voices
        </div>
        <h2 className="section-h2 reveal reveal-delay-1">
          Real students.
          <br />
          Real results.
        </h2>
        <div className="testimonials-grid">
          <div className="testi-card reveal">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              I spent 3 weeks prepping LC for Meta — and almost missed that they weight behavioral{' '}
              <strong>way more than most people think</strong>. One InterviewIQ post saved my final round.
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#6c63ff,#a78bfa)' }}>
                JS
              </div>
              <div>
                <div className="testi-name">Jordan S.</div>
                <div className="testi-role">MIT · CS &apos;25</div>
              </div>
              <span className="testi-company">Google Offer ✓</span>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-1">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              The compensation data alone is worth it. I was about to accept $44/hr — then I checked InterviewIQ and saw{' '}
              <strong>three competing offers averaging $52</strong>. I negotiated up.
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}>
                LT
              </div>
              <div>
                <div className="testi-name">Layla T.</div>
                <div className="testi-role">Berkeley · CS &apos;25</div>
              </div>
              <span className="testi-company">Stripe Offer ✓</span>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-2">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              I&apos;m a first-gen CS student with zero industry connections. InterviewIQ was <strong>my network</strong>
              . I knew exactly what to expect at every company before I even applied.
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#fbbf24,#fb923c)' }}>
                DM
              </div>
              <div>
                <div className="testi-name">DeShawn M.</div>
                <div className="testi-role">Howard · CS &apos;26</div>
              </div>
              <span className="testi-company">Amazon Offer ✓</span>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-1">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              When the Jane Street OA dropped, someone posted about it within <strong>30 minutes</strong>. I had context
              on what to expect before I even opened the link.
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#a78bfa,#6c63ff)' }}>
                PR
              </div>
              <div>
                <div className="testi-name">Priya R.</div>
                <div className="testi-role">Carnegie Mellon · CS &apos;25</div>
              </div>
              <span className="testi-company">Jane St. Offer ✓</span>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-2">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              I had 6 rejections before I found this platform. I changed my prep strategy based on what I read here.{' '}
              <strong>Next cycle I had 4 offers.</strong>
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#f87171,#fb923c)' }}>
                KN
              </div>
              <div>
                <div className="testi-name">Kwame N.</div>
                <div className="testi-role">Georgia Tech · CS &apos;25</div>
              </div>
              <span className="testi-company">Netflix Offer ✓</span>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-3">
            <div className="testi-quote">"</div>
            <div className="testi-text">
              Every CS student I know refreshes this during recruiting season. It&apos;s the{' '}
              <strong>only platform that feels like it&apos;s actually for us</strong>, not for recruiters.
            </div>
            <div className="testi-footer">
              <div className="testi-av" style={{ background: 'linear-gradient(135deg,#22d3ee,#34d399)' }}>
                SC
              </div>
              <div>
                <div className="testi-name">Sofia C.</div>
                <div className="testi-role">UCLA · CS &apos;26</div>
              </div>
              <span className="testi-company">Microsoft Offer ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / VIRAL */}
      <section className="viral-section" id="pricing">
        <div className="viral-inner">
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-line" />
            Get Access
          </div>
          <h2
            className="section-h2 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(36px,4vw,52px)' }}
          >
            Fair, simple, viral.
          </h2>
          <p className="section-sub reveal reveal-delay-2" style={{ margin: '0 auto' }}>
            We built the access model around how students actually share things — in group chats, Discord servers, and
            dorm hallways.
          </p>
          <div className="viral-cards">
            <div className="viral-card reveal">
              <span className="plan-badge free">Free</span>
              <div className="plan-price">
                $0 <span>forever</span>
              </div>
              <div className="plan-desc">Browse. Explore. Get a taste of what&apos;s possible.</div>
              <div className="plan-features">
                <div className="plan-feature">
                  <span className="check">✓</span> Company overview pages
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Basic compensation data
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Read 10 feed posts/day
                </div>
                <div className="plan-feature">
                  <span className="cross">✗</span>{' '}
                  <span style={{ color: 'var(--text3)' }}>Full interview breakdowns</span>
                </div>
                <div className="plan-feature">
                  <span className="cross">✗</span>{' '}
                  <span style={{ color: 'var(--text3)' }}>Unlimited feed access</span>
                </div>
                <div className="plan-feature">
                  <span className="cross">✗</span>{' '}
                  <span style={{ color: 'var(--text3)' }}>Post experiences</span>
                </div>
              </div>
              <button
                className="btn-ghost"
                style={{ width: '100%', padding: 12, borderRadius: 10, fontSize: 14 }}
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Start Browsing
              </button>
            </div>

            <div className="viral-card featured reveal reveal-delay-1">
              <span className="plan-badge pro">⚡ Full Access</span>
              <div
                className="plan-price"
                style={{
                  background: 'linear-gradient(135deg,var(--accent2),var(--cyan))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Free <span style={{ WebkitTextFillColor: 'var(--text3)' }}>with invite or</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: -1,
                  marginBottom: 6,
                  color: 'var(--text)',
                }}
              >
                $9<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text3)' }}>/mo</span>
              </div>
              <div className="plan-desc">
                Invite 5 friends and unlock everything for free — forever. Or pay $9/mo. Either way, you win.
              </div>
              <div className="invite-visual">
                <div className="invite-dots">
                  <div className="inv-dot filled">✓</div>
                  <div className="inv-dot filled">✓</div>
                  <div className="inv-dot">3</div>
                  <div className="inv-dot">4</div>
                  <div className="inv-dot">5</div>
                </div>
                <div className="invite-label">Invite 5 → Unlock Everything</div>
              </div>
              <div className="plan-features">
                <div className="plan-feature">
                  <span className="check">✓</span> Everything in Free
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Full interview breakdowns + pass rates
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Unlimited feed — read &amp; post
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Full compensation database
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Deadline alerts &amp; notifications
                </div>
                <div className="plan-feature">
                  <span className="check">✓</span> Resume intelligence (coming soon)
                </div>
              </div>
              <Link
                href="/login"
                className="btn-hero"
                style={{ width: '100%', padding: 13, borderRadius: 10, fontSize: 14, display: 'inline-block' }}
              >
                Get Full Access →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / WAITLIST */}
      <section className="cta-section" id="signup">
        <div className="cta-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="section-eyebrow reveal"
            style={{ justifyContent: 'center', marginBottom: 20 }}
          >
            <span className="eyebrow-line" />
            Join the waitlist
          </div>
          <h2 className="reveal reveal-delay-1">
            Your next
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg,var(--accent2),var(--cyan))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              offer starts here.
            </span>
          </h2>
          <p className="cta-sub reveal reveal-delay-2">
            28,000 students are already using InterviewIQ to decode recruiting. Don&apos;t go into your next interview
            blind.
          </p>
          <div className="reveal reveal-delay-3">
            {!emailSuccess ? (
              <form className="email-form" onSubmit={handleSignup}>
                <input
                  className="email-input"
                  type="email"
                  placeholder="your@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={
                    emailError
                      ? {
                        borderColor: 'var(--red)',
                        boxShadow: '0 0 0 3px rgba(248,113,113,0.15)',
                      }
                      : undefined
                  }
                />
                <button className="email-submit" type="submit">
                  Join Free →
                </button>
              </form>
            ) : (
              <div className="success-msg show">
                <span className="success-check">✓</span> You&apos;re on the list! Check your email for next steps.
              </div>
            )}
            <div className="cta-note">No spam. No credit card. Works with any .edu address.</div>
          </div>
          <div
            className="reveal reveal-delay-4"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
              marginTop: 56,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                400+
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Universities</div>
            </div>
            <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                890
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Companies tracked</div>
            </div>
            <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                42K+
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Experiences shared</div>
            </div>
            <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--green)',
                }}
              >
                $47/hr
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>Avg intern pay tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">InterviewIQ</div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-right">Built for CS students, by CS students · 2026</div>
      </footer>
    </>
  )
}
