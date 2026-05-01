import { Plus, Search } from 'lucide-react';
import type { TeacherOption } from '../types';

interface GradesToolbarProps {
  teachers: TeacherOption[];
}

export default function GradesToolbar({ teachers }: GradesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar grado..."
          className="pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <select
        defaultValue=""
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
      >
        <option value="">Filtrar por docente</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.nombre}>
            {teacher.nombre}
          </option>
        ))}
      </select>

      <button className="ml-auto flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-green-700">
        <Plus size={16} />
        Nuevo grado
      </button>
    </div>
  );
}
