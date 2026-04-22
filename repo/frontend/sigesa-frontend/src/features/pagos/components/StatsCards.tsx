import type { ReactNode } from 'react';
import { DollarSign, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { stats } from '../data/mockData';

interface StatCardProps {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: string;
  sub: string;
}

function StatCard({ icon, iconBg, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center gap-4 shadow-sm flex-1 min-w-0">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-800 leading-tight">{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        icon={<DollarSign size={22} className="text-white" />}
        iconBg="bg-green-600"
        label="Total Pagos"
        value={`$${stats.totalPagos.toLocaleString()}`}
        sub="Este periodo"
      />
      <StatCard
        icon={<CheckCircle size={22} className="text-white" />}
        iconBg="bg-green-500"
        label="Pagos Completados"
        value={stats.completados.toLocaleString()}
        sub="Pagos"
      />
      <StatCard
        icon={<AlertTriangle size={22} className="text-white" />}
        iconBg="bg-amber-400"
        label="Pagos Pendientes"
        value={stats.pendientes.toLocaleString()}
        sub="Pagos"
      />
      <StatCard
        icon={<AlertCircle size={22} className="text-white" />}
        iconBg="bg-red-400"
        label="Pagos Atrasados"
        value={stats.atrasados.toLocaleString()}
        sub="Pagos"
      />
    </div>
  );
}

