import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { supabase } from './lib/supabase'

function Root() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    // Detecta sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Escuta mudanças de auth (inclui redirect do Google)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      // Se acabou de logar, limpa a URL
      if (event === 'SIGNED_IN' && window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Carregando
  if (user === undefined) {
    return (
      <div style={{background:'#070d1a',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{color:'white',fontSize:16}}>Carregando...</div>
      </div>
    )
  }

  // Logado — passa o user para o App
  return <App googleUser={user} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
