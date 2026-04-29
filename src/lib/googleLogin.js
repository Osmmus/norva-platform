import { supabase } from './supabase'

export async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/auth/callback'
    }
  })
  if (error) alert('Erro ao fazer login: ' + error.message)
}
