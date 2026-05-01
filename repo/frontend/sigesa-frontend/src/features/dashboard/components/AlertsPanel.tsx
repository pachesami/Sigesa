import type { PaymentStatus, PendingAlert } from '../types';

interface AlertsPanelProps {
  alerts: PendingAlert[];
}

const badgeStyles = (status: PaymentStatus) => {
  if (status === 'atrasado') {
    return 'bg-red-50 text-red-700 border border-red-100';
  }
  if (status === 'pendiente') {
    return 'bg-amber-50 text-amber-700 border border-amber-100';
  }
  return 'bg-green-50 text-green-700 border border-green-100';
};

const dotStyles = (status: PaymentStatus) => {
  if (status === 'atrasado') return 'bg-red-500';
  if (status === 'pendiente') return 'bg-amber-400';
  return 'bg-green-500';
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Alertas y pendientes</h3>
          <p className="text-xs text-gray-400">Seguimiento de matriculas y pagos</p>
        </div>
        <span className="text-xs text-gray-400">{alerts.length} items</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5">
            <span className={`mt-1 w-2.5 h-2.5 rounded-full ${dotStyles(alert.estado)}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800">{alert.estudiante}</p>
              <p className="text-xs text-gray-500">
                {alert.detalle} · Vence {alert.vencimiento} · ${alert.valor.toFixed(2)}
              </p>
            </div>
            <span className={`text-[11px] font-semibold px-2 py-1 rounded-md ${badgeStyles(alert.estado)}`}>
              {alert.tipo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
