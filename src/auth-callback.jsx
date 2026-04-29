import { useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        window.location.href = '/'
      }
    })
  }, [])

  return <div style={{color:'white',textAlign:'center',marginTop:100}}>Entrando...</div>
}
