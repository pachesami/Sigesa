interface RevenueChartCardProps {
  series: { label: string; value: number }[];
}

export default function RevenueChartCard({ series }: RevenueChartCardProps) {
  const maxValue = Math.max(1, ...series.map((point) => point.value));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Ingresos en el tiempo</h3>
          <p className="text-xs text-gray-400">Resumen visual de pagos</p>
        </div>
        <span className="text-xs text-gray-400">Ultimos 6 meses</span>
      </div>

      <div className="h-44 rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-4">
        <div className="flex items-end gap-3 h-full">
          {series.map((point) => (
            <div key={point.label} className="flex-1 flex flex-col items-center justify-end gap-2">
              <div
                className="w-full rounded-md bg-gradient-to-t from-green-600 via-green-500 to-green-400"
                style={{ height: `${Math.round((point.value / maxValue) * 100)}%` }}
              />
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
