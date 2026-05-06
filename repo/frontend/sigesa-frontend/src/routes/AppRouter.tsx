import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import CursosPage from '../features/cursos/pages/CursosPage'
import PagosDashboardPage from '../features/pagos/pages/PagosDashboardPage'
import StudentsPage from '../features/estudiantes/pages/StudentsPage'
import SettingsPage from '../features/ajustes/pages/SettingsPage'
import ProtectedRoute from './ProtectedRoute'
import SecretariaLayout from '../layouts/SecretariaLayout'
import DocenteLayout from '../layouts/DocenteLayout'
import AcudienteLayout from '../layouts/AcudienteLayout'
import DashboardDocentePage from '../features/docente/DashboardDocentePage'
import DashboardAcudientePage from '../features/acudiente/DashboardAcudientePage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute roles={['Secretaria']} />}>
        <Route path="/secretaria" element={<SecretariaLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
          <Route path="pagos" element={<PagosDashboardPage />} />
          <Route path="cursos" element={<CursosPage />} />
          <Route path="ajustes" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['Docente']} />}>
        <Route path="/docente" element={<DocenteLayout />}>
          <Route path="dashboard" element={<DashboardDocentePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['Acudiente']} />}>
        <Route path="/acudiente" element={<AcudienteLayout />}>
          <Route path="dashboard" element={<DashboardAcudientePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
