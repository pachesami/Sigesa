import { Search, Download, Settings2, Filter, ChevronDown, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsRight, AlignJustify } from 'lucide-react';
import type { Payment, PaymentStatus } from '../types';

interface PaymentsTableProps {
  payments: Payment[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-blue-100 text-blue-700', 'bg-rose-100 text-rose-700', 'bg-teal-100 text-teal-700', 'bg-amber-100 text-amber-700', 'bg-green-100 text-green-700'];
  const colorIdx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${colors[colorIdx]} shrink-0`}>
      {initials}
    </div>
  );
}

export default function PaymentsTable({ payments, currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaymentsTableProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const amountColor = (status: PaymentStatus) => {
    if (status === 'completado') return 'bg-green-600 text-white';
    if (status === 'pendiente') return 'bg-amber-400 text-white';
    return 'bg-red-500 text-white';
  };

  const pageNumbers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 min-w-0 flex flex-col">
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-gray-100 flex-wrap">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <Download size={13} /> Exportar <ChevronDown size={12} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <Settings2 size={13} /> Acciones <ChevronDown size={12} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <Filter size={13} /> Raudes <ChevronDown size={12} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors font-medium">
          <AlignJustify size={13} /> Pagos <ChevronDown size={12} />
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Alumno</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Grado</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Referencia</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Monto</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Método</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={p.alumno} />
                    <span className="font-medium text-gray-800 text-sm">{p.alumno}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-gray-600 text-sm">{p.grado}</td>
                <td className="px-3 py-3 text-gray-500 text-sm font-mono">{p.referencia}</td>
                <td className="px-3 py-3 text-gray-500 text-sm">{p.fecha}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${amountColor(p.estado)}`}>
                    ${p.monto.toFixed(2)}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium capitalize
                    ${p.estado === 'completado' ? 'text-green-700' : p.estado === 'pendiente' ? 'text-amber-600' : 'text-red-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.estado === 'completado' ? 'bg-green-500' : p.estado === 'pendiente' ? 'bg-amber-400' : 'bg-red-500'}`} />
                    {p.estado.charAt(0).toUpperCase() + p.estado.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-600 text-sm">{p.metodo}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Mostrando {start} - {end} de {totalItems.toLocaleString()} pagos
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          {pageNumbers.map((n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium transition-colors
                ${currentPage === n
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              {n}
            </button>
          ))}
          <span className="w-7 h-7 flex items-center justify-center text-gray-400 text-xs">...</span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ChevronsRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

