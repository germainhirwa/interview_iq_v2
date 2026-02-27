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

      // ✅ Restrict to .edu emails only
      if (!email.endsWith('.edu')) {
        await supabase.auth.signOut()
        return NextResponse.redirect(
          `${origin}/login?error=Only .edu emails allowed`
        )
      }

      if (user) {
        // ✅ Try to find existing profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, school, major, graduation_year')
          .eq('id', user.id)
          .single()

        if (!existingProfile) {
          // New user — create a blank profile row
          const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            email.split('@')[0]

          await supabase.from('profiles').insert({
            id: user.id,
            email,
            display_name: displayName,
            is_premium: false,
            invite_count: 0,
          })

          // Send them to onboarding to complete their profile
          return NextResponse.redirect(`${origin}/onboarding`)
        }

        // Existing user — check if profile is complete
        const isIncomplete =
          !existingProfile.school ||
          !existingProfile.major ||
          !existingProfile.graduation_year

        if (isIncomplete) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // If something went wrong, redirect back to login
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
