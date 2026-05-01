import { User, BookOpen, Calendar, Users } from 'lucide-react';

interface SettingsSidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: 'profile', label: 'Mi perfil', icon: <User size={18} /> },
  { id: 'subjects', label: 'Materias', icon: <BookOpen size={18} /> },
  { id: 'periods', label: 'Períodos', icon: <Calendar size={18} /> },
  { id: 'teachers', label: 'Docentes', icon: <Users size={18} /> },
];

export default function SettingsSidebar({ activeSection, onSelectSection }: SettingsSidebarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-fit sticky top-6">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === item.id
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span className={activeSection === item.id ? 'text-green-600' : 'text-gray-400'}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
