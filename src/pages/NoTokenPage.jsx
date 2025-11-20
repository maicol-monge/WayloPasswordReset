import React from 'react'

export default function NoTokenPage() {
  return (
    <div className="token-missing">
      <h2>Token no encontrado</h2>
      <p>
        El enlace de restablecimiento es inválido o ha expirado.
        Solicita uno nuevo desde la página de inicio de sesión.
      </p>
      <a href="https://panel.waylo.app" className="back-btn">
        ← Volver al inicio de sesión
      </a>
    </div>
  )
}