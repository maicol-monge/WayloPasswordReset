import React from 'react'

export default function NoTokenPage() {
  const currentUrl = window.location.href
  const searchParams = window.location.search
  
  return (
    <div className="token-missing">
      <h2>Token no encontrado</h2>
      <p>
        El enlace de restablecimiento es inválido o ha expirado.
        Solicita uno nuevo desde la página de inicio de sesión.
      </p>
      <details style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
        <summary style={{cursor: 'pointer'}}>Información de debug</summary>
        <div style={{marginTop: '10px', textAlign: 'left', wordBreak: 'break-all'}}>
          <p><strong>URL completa:</strong> {currentUrl}</p>
          <p><strong>Query string:</strong> {searchParams || '(vacío)'}</p>
        </div>
      </details>
      <a href="https://panel.waylo.app" className="back-btn">
        ← Volver al inicio de sesión
      </a>
    </div>
  )
}