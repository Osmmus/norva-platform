import { supabase } from './lib/supabase'

export async function handleAuthCallback() {
  const hash = window.location.hash
  if (hash && hash.includes('access_token')) {
    const { data, error } = await supabase.auth.getSession()
    if (data?.session) {
      window.location.href = '/'
      return data.session
    }
  }
  return null
}

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUserProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}
