import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
}

const mockSubjects: Subject[] = [
  { id: '1', name: 'Matemáticas' },
  { id: '2', name: 'Español' },
  { id: '3', name: 'Ciencias Naturales' },
  { id: '4', name: 'Educación Física' },
];

export default function SubjectsSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Materias</h2>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
          <Plus size={16} />
          Nueva materia
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockSubjects.map((subject, idx) => (
              <tr
                key={subject.id}
                className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}
              >
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{subject.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{subject.name}</td>
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
