import type { ReactNode } from 'react';
import { LayoutDashboard, Users, Wallet, BookOpen, Settings, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export type NavItem = 'dashboard' | 'estudiantes' | 'pagos' | 'cursos' | 'ajustes';

const navItems: { key: NavItem; label: string; icon: ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
  { key: 'estudiantes', label: 'Estudiantes', icon: <Users size={24} /> },
  { key: 'pagos', label: 'Pagos', icon: <Wallet size={24} /> },
  { key: 'cursos', label: 'Cursos', icon: <BookOpen size={24} /> },
  { key: 'ajustes', label: 'Ajustes', icon: <Settings size={24} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-[110px] min-h-screen bg-white border-r border-gray-200 flex flex-col items-center pt-4 pb-6 gap-1 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-center w-16 h-16 mb-4">
        <GraduationCap size={42} className="text-amber-700" strokeWidth={1.5} />
      </div>

      {/* Navegacion */}
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={`/secretaria/${item.key}`}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1.5 w-full py-3 px-2 transition-all duration-150 relative group
            ${
              isActive
                ? 'bg-gray-100 text-green-700 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Barra lateral activa */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-green-600 rounded-r-full" />
              )}

              {/* Icono */}
              <span className={isActive ? 'text-green-700' : 'text-gray-400 group-hover:text-gray-600'}>
                {item.icon}
              </span>

              {/* Texto */}
              <span className="text-xs leading-tight">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </aside>
  );
}
