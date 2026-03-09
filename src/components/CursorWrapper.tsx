'use client'

import dynamic from 'next/dynamic'

const CursorEffect = dynamic(() => import('./CursorEffect'), { ssr: false })

export default function CursorWrapper() {
    return <CursorEffect />
}
