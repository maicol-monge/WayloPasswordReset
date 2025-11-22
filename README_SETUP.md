# WayloPasswordReset — Sitio de frontend para recuperación de contraseña

Este pequeño README explica cómo crear y desplegar un frontend estático que sirva el formulario de "reset password" que recibe el token del backend.

El objetivo principal del repositorio `WayloApi` es enviar un enlace con `FRONTEND_BASE_URL/?token=...` que el usuario usará para abrir una página donde podrá establecer su nueva contraseña.

Puedes implementar esta página con cualquier stack estático (Vite/React, plain HTML, Next.js, Svelte, etc.). A continuación algunos pasos mínimos usando una página estática simple.

Requisitos
- Node.js 18+ (si usas Vite/React)
- Un host estático: Vercel, Netlify, GitHub Pages, Render Static Sites, S3+CloudFront, etc.

Estructura mínima
- `index.html` -> formulario que lee `token` desde query string y envía `POST /api/waylo/auth/password/reset` con { token, contrasena }
- `styles.css` y `app.js`

Ejemplo rápido (fetch):

```js
// app.js
const params = new URLSearchParams(window.location.search);
const token = params.get('token');

async function submit(password) {
  const res = await fetch('https://wayloapi.onrender.com/api/waylo/auth/password/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, contrasena: password })
  });
  const json = await res.json();
  // manejar respuesta
}
```

Configuración del backend
- En `WayloApi/controllers/waylo/passwordResetController.js` el backend genera un `link` usando `FRONTEND_BASE_URL` (env). Asegúrate de configurar `FRONTEND_BASE_URL` en el `.env` del backend para apuntar a la URL de despliegue de este sitio.

Despliegue
- Deploy en Vercel/Netlify: conectar repositorio y setear dominio.
- Asegúrate que la URL pública coincide con `FRONTEND_BASE_URL` en el backend.

Seguridad y UX
- El token es válido por 1 hora (según la implementación actual). Muestra mensajes claros si el token ha expirado.
- Verifica el password strength en el cliente (longitud mínima, confirmación de contraseña).
- Usa HTTPS en producción.

Want help?
- Si quieres, puedo generar un esqueleto Vite+React con la página de reset preintegrada y listo para desplegar (incluye validación, manejo de errores y estilo simple).