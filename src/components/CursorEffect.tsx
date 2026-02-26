'use client'

import { useEffect } from 'react'

export default function CursorEffect() {
  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement('div')
    const ring = document.createElement('div')
    cursor.id = 'cursor'
    ring.id = 'cursorRing'
    cursor.className = 'cursor'
    ring.className = 'cursor-ring'
    document.body.appendChild(cursor)
    document.body.appendChild(ring)

    let mx = 0, my = 0, rx = 0, ry = 0
    let frameId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = `${mx - 5}px`
      cursor.style.top = `${my - 5}px`
    }
    document.addEventListener('mousemove', onMove)

    const animRing = () => {
      rx += (mx - rx - 18) * 0.12
      ry += (my - ry - 18) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      frameId = requestAnimationFrame(animRing)
    }
    frameId = requestAnimationFrame(animRing)

    // Scale on hover over interactive elements
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

    // Use event delegation so it works on dynamically rendered elements
    document.addEventListener('mouseover', (e) => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) {
        handleEnter()
      }
    })
    document.addEventListener('mouseout', (e) => {
      if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) {
        handleLeave()
      }
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameId)
      cursor.remove()
      ring.remove()
    }
  }, [])

  return null
}