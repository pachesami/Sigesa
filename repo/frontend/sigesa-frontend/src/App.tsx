import { useState } from 'react'
import {
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Handshake,
  Lock,
  User,
} from 'lucide-react'
import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Login attempt:', { usuario, contrasena })
  }

  return (
    <div className="sigesa-login-page">
      <main className="sigesa-login-shell">
        <section className="welcome-pane">
          <div className="dot-pattern" aria-hidden="true" />

          <div className="welcome-content">
            <div className="logo-wrap">
              <img
                src="/images/logo-colegio.jpg"
                alt="Logo Colegio Pedagogico San Agustin"
                className="school-logo"
              />
            </div>

            <h1 className="welcome-title">BIENVENIDO</h1>
            <div className="welcome-subtitle">
              <span className="line" aria-hidden="true" />
              <span>AL SISTEMA</span>
              <span className="line" aria-hidden="true" />
            </div>

            <p className="welcome-slogan">"Educamos con amor para un futuro mejor"</p>

            <div className="dots-indicator" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="feature-list" aria-label="Modulos del sistema">
              <article className="feature-item">
                <BookOpen strokeWidth={1.7} />
                <span>Matriculas</span>
              </article>
              <div className="feature-divider" aria-hidden="true" />
              <article className="feature-item">
                <GraduationCap strokeWidth={1.7} />
                <span>Plan de estudios</span>
              </article>
              <div className="feature-divider" aria-hidden="true" />
              <article className="feature-item">
                <Handshake strokeWidth={1.7} />
                <span>Pagos</span>
              </article>
            </div>
          </div>
        </section>

        <section className="form-pane">
          <div className="form-card">
            <h2>Inicio de Sesion</h2>
            <div className="title-divider" aria-hidden="true" />

            <form onSubmit={handleSubmit} className="login-form">
              <div className="field">
                <label htmlFor="usuario" className="field-label">
                  <User size={16} />
                  <span>Usuario</span>
                </label>
                <input
                  id="usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingrese su usuario"
                  autoComplete="username"
                />
              </div>

              <div className="field">
                <label htmlFor="contrasena" className="field-label">
                  <Lock size={16} />
                  <span>Contrasena</span>
                </label>
                <div className="password-wrap">
                  <input
                    id="contrasena"
                    type={showPassword ? 'text' : 'password'}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Ingrese su contrasena"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                INGRESAR
              </button>
            </form>

            <div className="social-block">
              <p>Puedes seguirnos en</p>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="facebook-link"
              >
                <span className="facebook-letter">f</span>
              </a>
            </div>
          </div>
        </section>

        <div className="wave-wrap" aria-hidden="true">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path
              d="M0,60 Q150,20 300,40 T600,30 T900,50 T1200,40 L1200,80 L0,80 Z"
              fill="#C4A35A"
            />
            <path
              d="M0,65 Q200,35 400,55 T800,45 T1200,55 L1200,80 L0,80 Z"
              fill="#6B3D2E"
            />
            <path
              d="M0,70 Q250,50 500,65 T1000,55 T1200,65 L1200,80 L0,80 Z"
              fill="#1D8348"
            />
          </svg>
        </div>
      </main>
    </div>
  )
}

export default App