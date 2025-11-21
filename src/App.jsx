import React from 'react'
// Usa solo el PNG existente (Linux es case-sensitive y respeta espacios)
import logo from './assets/Waylo sin fondo.png'

import ResetPassword from './pages/ResetPassword'
import NoTokenPage from './pages/NoTokenPage'


function App() {
  // Try both hash and query params for backwards compatibility
  const hash = window.location.hash.substring(1) // Remove #
  const hashParams = new URLSearchParams(hash)
  const queryParams = new URLSearchParams(window.location.search)
  
  const token = hashParams.get('token') || queryParams.get('token')
  
  // Debug: log what we're getting
  console.log('Current URL:', window.location.href)
  console.log('Hash:', window.location.hash)
  console.log('Search params:', window.location.search)
  console.log('Token found:', token)
  
  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <img
            src={logo}
            alt="Waylo"
            className="brand-logo"
            loading="lazy"
            decoding="async"
            width={72}
            height={72}
          />
          <div className="brand">
            <h1>Waylo</h1>
            <p className="subtitle">Restablecimiento de contraseña</p>
          </div>
        </div>
      </header>
      <main className="main-content">
        {token ? <ResetPassword token={token} /> : <NoTokenPage />}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Waylo. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App
