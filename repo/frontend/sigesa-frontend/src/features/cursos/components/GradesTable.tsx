import type { Grade } from '../types';

interface GradesTableProps {
  grades: Grade[];
}

const docenteStyles = (docente: string) => {
  if (docente === 'Sin asignar') {
    return 'bg-gray-100 text-gray-500';
  }
  return 'bg-green-50 text-green-700';
};

export default function GradesTable({ grades }: GradesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre del grado</th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Docente asignado</th>
            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, idx) => (
            <tr key={grade.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
              <td className="px-4 py-3">
                <span className="font-medium text-gray-800">{grade.nombre}</span>
              </td>
              <td className="px-3 py-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${docenteStyles(grade.docente)}`}>
                  {grade.docente}
                </span>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-md text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    Editar
                  </button>
                  <button className="px-3 py-1.5 rounded-md text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
