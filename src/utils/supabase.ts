import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

/**
 * Browser/client Supabase helper.
 * Env must be set on Vercel:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Fallbacks exist only so `next build` can prerender pages when env is
 * temporarily missing; real login/API calls still need valid Production env.
 */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  'https://placeholder.supabase.co'

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

export const supabaseClient = createClientComponentClient({
  supabaseUrl,
  supabaseKey: supabaseAnonKey,
})
