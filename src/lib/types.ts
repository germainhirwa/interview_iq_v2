// lib/types.ts — Shared TypeScript types across the app
// These will match your Supabase table schemas

export type OutcomeType = 'offer' | 'rejected' | 'in_process' | 'oa' | 'question'

export interface Post {
  id: string
  created_at: string
  user_id: string
  company: string
  role: string
  outcome: OutcomeType
  body: string
  tags: string[]
  likes: number
  comments: number
  // Joined from users table
  author?: {
    display_name: string
    school: string
    graduation_year: number
    major: string
  }
}

export interface Company {
  id: string
  name: string
  type: string        // 'Big Tech' | 'Fintech' | 'Quant' etc.
  location: string
  logo_emoji: string
  rating: number
  avg_pay_hr: number
  post_count: number
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Extreme'
  open_roles: number
  is_hiring: boolean
}

export interface CompensationEntry {
  id: string
  company: string
  role: string
  pay_hr: number
  pay_monthly: number
  housing_stipend: number | null
  relocation: number | null
  location: string
  year: number
  reports: number
}

export interface Opportunity {
  id: string
  company: string
  logo_emoji: string
  title: string
  location: string
  type: 'Internship' | 'New Grad' | 'Research' | 'Co-op'
  pay_hr: number
  pay_monthly: number
  deadline: string | null   // ISO date string
  is_rolling: boolean
  tags: string[]
}

export interface UserProfile {
  id: string
  email: string
  display_name: string
  school: string
  major: string
  graduation_year: number
  invite_count: number
  is_premium: boolean
}

// Supabase database type helper (expand as you add tables)
export type Database = {
  public: {
    Tables: {
      posts: { Row: Post; Insert: Omit<Post, 'id' | 'created_at'>; Update: Partial<Post> }
      companies: { Row: Company; Insert: Omit<Company, 'id'>; Update: Partial<Company> }
      compensation: { Row: CompensationEntry; Insert: Omit<CompensationEntry, 'id'>; Update: Partial<CompensationEntry> }
      opportunities: { Row: Opportunity; Insert: Omit<Opportunity, 'id'>; Update: Partial<Opportunity> }
      profiles: { Row: UserProfile; Insert: Omit<UserProfile, 'id'>; Update: Partial<UserProfile> }
    }
  }
}
