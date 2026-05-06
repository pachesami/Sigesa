import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export type ProtectedRouteProps = {
  roles?: string[];
};

export default function ProtectedRoute({ roles = [] }: ProtectedRouteProps) {
  const { esAutenticado, cargando, tieneRol } = useAuth();

  if (cargando) {
    return <div className="p-6 text-gray-600">Cargando sesion...</div>;
  }

  if (!esAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !tieneRol(roles)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
