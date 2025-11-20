import React, { useState, useMemo } from 'react'
import { resetPasswordRequest } from '../config'

export default function ResetPassword({ token }) {
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const strength = useMemo(() => {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[a-z]/.test(pass)) score++
    if (/\d/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }, [pass])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (pass !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    try {
      const res = await resetPasswordRequest(token, pass)
      if (res.success) {
        setSuccess('Contraseña actualizada correctamente. Ya puedes iniciar sesión.')
        setDone(true)
      } else {
        setError(res.message || 'Error al actualizar la contraseña.')
      }
    } catch (err) {
      setError(err.message || 'Error inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-live="polite">
      <div className="form-group">
        <label>Nueva contraseña</label>
        <input
          className="input"
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
            aria-required="true"
        />
        <div className="password-meter">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={strength >= i ? 'active' : ''} />
          ))}
        </div>
        <div className="helper">
          Usa mayúsculas, números y símbolos para mayor seguridad.
        </div>
      </div>

      <div className="form-group">
        <label>Confirmar contraseña</label>
        <input
          className="input"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="Repite la contraseña"
          required
        />
      </div>

      <div className="actions">
        <button
          className="btn"
          type="submit"
          disabled={loading || pass.length < 8}
        >
          {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
        </button>
        {!done && (
          <button
            type="button"
            className="link-soft"
            onClick={() => {
              setPass('')
              setConfirm('')
              setError('')
              setSuccess('')
            }}
          >
            Limpiar campos
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}
      {success && <div className="alert alert-success">✅ {success}</div>}
    </form>
  )
}
