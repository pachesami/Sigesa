import { Plus, Trash2 } from 'lucide-react';
import type { GuardianFormData } from './GuardianModal';

interface GuardiansListProps {
  guardians: GuardianFormData[];
  onAddClick: () => void;
  onRemove: (index: number) => void;
}

export default function GuardiansList({ guardians, onAddClick, onRemove }: GuardiansListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Acudientes</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors duration-150"
        >
          <Plus size={16} />
          Agregar Acudiente
        </button>
      </div>

      {guardians.length === 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cédula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Parentesco</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Principal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-12">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">No hay acudientes registrados</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cédula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Parentesco</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Principal</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acción</th>
              </tr>
            </thead>
            <tbody>
              {guardians.map((guardian, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                >
                  <td className="px-4 py-3 text-gray-800 font-medium">{guardian.name}</td>
                  <td className="px-4 py-3 text-gray-600">{guardian.identity}</td>
                  <td className="px-4 py-3 text-gray-600">{guardian.relationship}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        guardian.isPrimary
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {guardian.isPrimary ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onRemove(idx)}
                      className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
