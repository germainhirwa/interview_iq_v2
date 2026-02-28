import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const { searchParams } = requestUrl
  const code = searchParams.get('code')

  // Use public URL if available, fallback to headers for robust Vercel support
  const protocol = request.headers.get('x-forwarded-proto') || requestUrl.protocol.replace(':', '')
  const host = request.headers.get('host') || requestUrl.host
  const origin = `${protocol}://${host}`

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

          // Handle referral logic
          const cookieStore = await cookies()
          const refId = cookieStore.get('ref_id')?.value

          if (refId && refId !== user.id) {
            // Fetch referrer
            const { data: referrer } = await supabase
              .from('profiles')
              .select('invite_count, is_premium')
              .eq('id', refId)
              .single()

            if (referrer) {
              const newCount = (referrer.invite_count || 0) + 1
              const becomesPremium = referrer.is_premium || newCount >= 5

              // Update referrer
              await supabase
                .from('profiles')
                .update({
                  invite_count: newCount,
                  is_premium: becomesPremium,
                })
                .eq('id', refId)
            }

            // Clear the cookie
            cookieStore.delete('ref_id')
          }

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
