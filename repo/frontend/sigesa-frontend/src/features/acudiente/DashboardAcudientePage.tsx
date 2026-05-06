import { useEffect, useState } from 'react';
import { paymentsService } from '../../services/paymentsService';
import type { CuentaCobro } from '../../types/payments';
import { obtenerMensajeError } from '../../utils/apiErrors';

export default function DashboardAcudientePage() {
  const [cuentas, setCuentas] = useState<CuentaCobro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;
    const cargarCuentas = async () => {
      try {
        const data = await paymentsService.listarCuentas({ page_size: 20 });
        if (activo) {
          setCuentas(data.results);
        }
      } catch (err) {
        if (activo) {
          setError(obtenerMensajeError(err, 'No se pudieron cargar las cuentas.'));
        }
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarCuentas();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Cuentas de cobro</h2>

      {cargando && <p className="text-gray-600">Cargando...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!cargando && !error && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cuenta</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Matricula</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Concepto</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mes</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ano</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Valor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cuentas.map((cuenta) => (
                <tr key={cuenta.id_cuenta} className="border-b border-gray-50">
                  <td className="px-4 py-3 text-gray-700">{cuenta.id_cuenta}</td>
                  <td className="px-4 py-3 text-gray-700">{cuenta.id_matricula}</td>
                  <td className="px-4 py-3 text-gray-700">{cuenta.id_concepto_pago}</td>
                  <td className="px-4 py-3 text-gray-700">{cuenta.mes}</td>
                  <td className="px-4 py-3 text-gray-700">{cuenta.year}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{cuenta.valor_deuda}</td>
                  <td className="px-4 py-3 text-gray-700 capitalize">{cuenta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
