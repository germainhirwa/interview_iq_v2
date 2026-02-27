import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import CursorEffect from '@/components/CursorEffect'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side auth check — redirect to login if not authenticated
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile for sidebar
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, school, graduation_year, major, is_premium')
    .eq('id', user.id)
    .single()

  return (
    <div className="app">
      <CursorEffect />
      <Sidebar profile={profile} />
      <div className="main">
        <Topbar user={user} />
        {children}
      </div>
    </div>
  )
}