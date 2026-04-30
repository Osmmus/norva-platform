import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App, { AppWithAuth } from './App'
import { supabase } from './lib/supabase'

function Root() {
  const [user, setUser] = useState(undefined)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_IN' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (user === undefined) return (
    <div style={{background:'#070d1a',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'system-ui'}}>
      Carregando...
    </div>
  )

  if (user) return (
    <AppWithAuth
      googleUser={user}
      onLogout={async () => { await supabase.auth.signOut(); setUser(null); }}
    />
  )

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><Root /></React.StrictMode>
)
