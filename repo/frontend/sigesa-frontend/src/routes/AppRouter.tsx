import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import PagosDashboardPage from '../features/pagos/pages/PagosDashboardPage'
import StudentsPage from '../features/estudiantes/pages/StudentsPage'
import DashboardLayout from '../layouts/DashboardLayout'

export default function AppRouter() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard con layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* rutas hijas */}
        <Route index element={<PagosDashboardPage />} />
        <Route path="estudiantes" element={<StudentsPage />} />
        <Route path="pagos" element={<PagosDashboardPage />} />
        <Route path="cursos" element={<PagosDashboardPage />} />
        <Route path="ajustes" element={<PagosDashboardPage />} />

      </Route> {/* 👈 ESTE TE FALTABA */}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}