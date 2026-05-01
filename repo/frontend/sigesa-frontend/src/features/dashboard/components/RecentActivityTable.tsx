import type { PaymentStatus, RecentPayment } from '../types';

interface RecentActivityTableProps {
  payments: RecentPayment[];
}

const amountColor = (status: PaymentStatus) => {
  if (status === 'completado') return 'bg-green-600 text-white';
  if (status === 'pendiente') return 'bg-amber-400 text-white';
  return 'bg-red-500 text-white';
};

const statusText = (status: PaymentStatus) => {
  if (status === 'completado') return 'text-green-700';
  if (status === 'pendiente') return 'text-amber-600';
  return 'text-red-600';
};

const statusDot = (status: PaymentStatus) => {
  if (status === 'completado') return 'bg-green-500';
  if (status === 'pendiente') return 'bg-amber-400';
  return 'bg-red-500';
};

export default function RecentActivityTable({ payments }: RecentActivityTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 min-w-0 flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Actividad reciente</h3>
          <p className="text-xs text-gray-400">Ultimos pagos registrados</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          Ver todos
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estudiante</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Valor</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Metodo</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-800 text-sm">{p.estudiante}</span>
                </td>
                <td className="px-3 py-3 text-gray-500 text-sm">{p.fecha}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${amountColor(p.estado)}`}>
                    ${p.valor.toFixed(2)}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium capitalize ${statusText(p.estado)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot(p.estado)}`} />
                    {p.estado}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-600 text-sm">{p.metodo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
