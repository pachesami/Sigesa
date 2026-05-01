import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Dr. Juan García', email: 'juan.garcia@escuela.com', phone: '+57 312 456 7890' },
  { id: '2', name: 'Dra. María López', email: 'maria.lopez@escuela.com', phone: '+57 313 567 8901' },
  { id: '3', name: 'Ing. Carlos Rodríguez', email: 'carlos.rodriguez@escuela.com', phone: '+57 314 678 9012' },
];

export default function TeachersSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Docentes</h2>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
          <Plus size={16} />
          Nuevo docente
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cédula</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Correo</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Teléfono</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockTeachers.map((teacher, idx) => (
              <tr
                key={teacher.id}
                className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}
              >
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">123456{teacher.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{teacher.name}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{teacher.email}</td>
                <td className="px-4 py-3 text-gray-600">{teacher.phone}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
