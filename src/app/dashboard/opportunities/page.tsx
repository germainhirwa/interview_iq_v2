import { createClient } from '@/lib/supabase/server'
import OpportunitiesClient from './OpportunitiesClient'

export default async function OpportunitiesPage() {
  const supabase = await createClient()

  // Fetch all opportunities — we load everything so client-side filtering is instant.
  // Supabase default page size is 1000; we'll increase range to get a good batch.
  const { data, error, count } = await supabase
    .from('opportunities')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, 2999) // up to 3000 rows

  if (error) {
    console.error('Supabase fetch error:', error)
  }

  const opportunities = data ?? []
  const totalCount = count ?? opportunities.length

  return (
    <OpportunitiesClient
      opportunities={opportunities}
      totalCount={totalCount}
    />
  )
}