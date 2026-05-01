import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import CursosPage from '../features/cursos/pages/CursosPage'
import PagosDashboardPage from '../features/pagos/pages/PagosDashboardPage'
import StudentsPage from '../features/estudiantes/pages/StudentsPage'
import DashboardLayout from '../layouts/DashboardLayout'
import SettingsPage from '../features/ajustes/pages/SettingsPage'
export default function AppRouter() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard con layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* rutas hijas */}
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="estudiantes" element={<StudentsPage />} />
        <Route path="pagos" element={<PagosDashboardPage />} />
        <Route path="cursos" element={<CursosPage />} />
        <Route path="ajustes" element={<SettingsPage />} />

      </Route> {/* 👈 ESTE TE FALTABA */}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}
