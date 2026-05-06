import { useEffect, useState } from 'react';
import { gradesService } from '../../services/gradesService';
import type { Nota } from '../../types/grades';
import { obtenerMensajeError } from '../../utils/apiErrors';

export default function DashboardDocentePage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;
    const cargarNotas = async () => {
      try {
        const data = await gradesService.listarNotas({ page_size: 20 });
        if (activo) {
          setNotas(data.results);
        }
      } catch (err) {
        if (activo) {
          setError(obtenerMensajeError(err, 'No se pudieron cargar las notas.'));
        }
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarNotas();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Resumen de notas</h2>

      {cargando && <p className="text-gray-600">Cargando...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!cargando && !error && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Matricula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Materia</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Periodo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nota</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.id_nota} className="border-b border-gray-50">
                  <td className="px-4 py-3 text-gray-700">{nota.id_matricula}</td>
                  <td className="px-4 py-3 text-gray-700">{nota.id_materia}</td>
                  <td className="px-4 py-3 text-gray-700">{nota.id_periodo}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{nota.nota ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
