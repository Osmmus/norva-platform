import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { supabase } from './lib/supabase'

function Root() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div style={{background:'#070d1a',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Carregando...</div>

  return <App supabaseSession={session} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
