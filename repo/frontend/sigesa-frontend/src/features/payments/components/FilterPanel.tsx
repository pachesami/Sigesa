import { Calendar } from 'lucide-react';

interface FilterPanelProps {
  desde: string;
  setDesde: (v: string) => void;
  estado: string;
  setEstado: (v: string) => void;
  grado: string;
  setGrado: (v: string) => void;
  onFilter: () => void;
}

export default function FilterPanel({ desde, setDesde, estado, setEstado, grado, setGrado, onFilter }: FilterPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm w-[220px] shrink-0">
      <h3 className="font-semibold text-gray-700 text-sm mb-4">Filtrar por Fecha</h3>

      <label className="block text-xs text-gray-500 mb-1 font-medium">Desde:</label>
      <div className="relative mb-4">
        <input
          type="text"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          placeholder="dd/mm/aaaa"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 pr-9 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <label className="block text-xs text-gray-500 mb-1 font-medium">Estado</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
      >
        <option value="">Seleccionar estado</option>
        <option value="completado">Completado</option>
        <option value="pendiente">Pendiente</option>
        <option value="atrasado">Atrasado</option>
      </select>

      <select
        value={grado}
        onChange={(e) => setGrado(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
      >
        <option value="">Grado</option>
        <option value="1°">1°</option>
        <option value="2°">2°</option>
        <option value="3°">3°</option>
        <option value="4°">4°</option>
        <option value="5°">5°</option>
        <option value="6°">6°</option>
      </select>

      <button
        onClick={onFilter}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150"
      >
        Filtrar
      </button>
    </div>
  );
}
