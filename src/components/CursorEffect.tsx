'use client'

import { useEffect } from 'react'

export default function CursorEffect() {
  useEffect(() => {
    // Use existing cursor elements from layout.tsx
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')

    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let frameId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      // Use translate3d for better performance and to avoid layout shifts
      cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0)`
    }
    window.addEventListener('mousemove', onMove)

    const animRing = () => {
      rx += (mx - rx - 18) * 0.15
      ry += (my - ry - 18) * 0.15
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      frameId = requestAnimationFrame(animRing)
    }
    frameId = requestAnimationFrame(animRing)

    // Scale on hover over interactive elements
    const handleEnter = () => {
      cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0) scale(2.5)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(0.6)`
      ring.style.borderColor = 'rgba(124,106,255,0.8)'
    }
    const handleLeave = () => {
      cursor.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0) scale(1)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(1)`
      ring.style.borderColor = 'rgba(124,106,255,0.5)'
    }

    // Event delegation for stability on dynamic content
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) {
        handleEnter()
      }
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) {
        handleLeave()
      }
    }

    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return null
}