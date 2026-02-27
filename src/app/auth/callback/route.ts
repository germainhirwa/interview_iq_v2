import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // ✅ Get the logged-in user
      const { data: { user } } = await supabase.auth.getUser()

      const email = user?.email || ''

      // ✅ Restrict to .edu
      if (!email.endsWith('.edu')) {
        // Sign them out immediately
        await supabase.auth.signOut()

        return NextResponse.redirect(
          `${origin}/login?error=Only .edu emails allowed`
        )
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

    // If something went wrong, redirect back to login
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
