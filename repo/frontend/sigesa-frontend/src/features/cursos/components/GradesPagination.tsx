export default function GradesPagination() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-500">Mostrando 1 - 7 de 18 grados</p>
      <div className="flex items-center gap-1">
        <button className="px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Anterior
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded border border-green-600 bg-green-600 text-white text-xs font-medium">
          1
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50">
          2
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50">
          3
        </button>
        <button className="px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );
}
