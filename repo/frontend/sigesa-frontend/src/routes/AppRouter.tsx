import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import PagosDashboardPage from '../features/pagos/pages/PagosDashboardPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Rutas de la aplicación para el administrador "secretaria" */}
        <Route path="/dashboard/" element={<PagosDashboardPage />} />
        <Route path="/dashboard/estudiantes" element={<PagosDashboardPage />} />
        <Route path="/dashboard/pagos" element={<PagosDashboardPage />} />
        <Route path="/dashboard/cursos" element={<PagosDashboardPage />} />
        <Route path="/dashboard/ajustes" element={<PagosDashboardPage />} />


      {/* Rutas de la aplicación para el docente "profesor" */}
      <Route path="/" element={<PagosDashboardPage />} />


      {/* Rutas de la aplicación para el acudiente "acudiente" */}
      
      <Route path="/cursos" element={<PagosDashboardPage />} />



        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}