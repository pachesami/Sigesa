# SIGESA Frontend

Frontend en React + TypeScript + Vite para SIGESA.

## Estructura

- `src/features/auth`: modulo de autenticacion (pantalla de login).
- `src/features/payments`: dashboard de pagos integrado desde el proyecto adjunto.
- `src/App.tsx`: router principal.
- `src/main.tsx`: bootstrap de React + `BrowserRouter`.

## Rutas

- `/login`: pantalla de inicio de sesion.
- `/dashboard/pagos`: dashboard de pagos.
- `/`: redirige a `/login`.

## Requisitos

- Node.js 18 o superior.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Notas

- Tailwind CSS esta habilitado mediante `tailwind.config.js` y `postcss.config.js`.
- El login actual esta en modo simulacion (valida campos y redirige). La conexion al backend puede agregarse en `src/features/auth/pages/LoginPage.tsx`.
