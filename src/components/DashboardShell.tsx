'use client'

import { useState, useCallback } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import type { User } from '@supabase/supabase-js'

interface Profile {
    display_name: string | null
    school: string | null
    graduation_year: number | null
    major: string | null
    is_premium: boolean | null
}

interface DashboardShellProps {
    user: User
    profile: Profile | null
    children: React.ReactNode
}

export default function DashboardShell({ user, profile, children }: DashboardShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const openSidebar = useCallback(() => setSidebarOpen(true), [])
    const closeSidebar = useCallback(() => setSidebarOpen(false), [])

    return (
        <div className="app">
            {/* Backdrop overlay — click to close sidebar on mobile */}
            <div
                className={`sidebar-overlay${sidebarOpen ? ' active' : ''}`}
                onClick={closeSidebar}
                aria-hidden="true"
            />

            <Sidebar profile={profile} isOpen={sidebarOpen} onClose={closeSidebar} />

            <div className="main">
                <Topbar user={user} onMenuOpen={openSidebar} />
                {children}
            </div>
        </div>
    )
}
