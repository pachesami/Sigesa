import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/pages/LoginPage.tsx'
import PagosDashboardPage from './features/pagos/pages/PagosDashboardPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/pagos" element={<PagosDashboardPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
