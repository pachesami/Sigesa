import { useState } from 'react'
import { Plus } from 'lucide-react'
import StatsCards from '../components/StatsCards'
import FilterPanel from '../components/FilterPanel'
import RecentActivityTable from '../components/RecentActivityTable'
import AlertsPanel from '../components/AlertsPanel'
import RevenueChartCard from '../components/RevenueChartCard'
import { chartSeries, pendingAlerts, recentPayments } from '../data/mockData'

function DashboardPage() {
  const [desde, setDesde] = useState('01/04/2026')
  const [hasta, setHasta] = useState('30/04/2026')
  const [estado, setEstado] = useState('')
  const [query, setQuery] = useState('')

  const handleFilter = () => {
    return
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800">Control de pagos</span>
            </nav>
            <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-green-700">
              <Plus size={16} />
              Registrar pago
            </button>
          </div>

          <StatsCards />

          <div className="grid grid-cols-12 gap-4 min-h-0 flex-1">
            <div className="col-span-3 flex flex-col gap-4">
              <FilterPanel
                desde={desde}
                setDesde={setDesde}
                hasta={hasta}
                setHasta={setHasta}
                estado={estado}
                setEstado={setEstado}
                query={query}
                setQuery={setQuery}
                onFilter={handleFilter}
              />
              <AlertsPanel alerts={pendingAlerts} />
            </div>
            <div className="col-span-9 flex flex-col gap-4 min-w-0">
              <RevenueChartCard series={chartSeries} />
              <RecentActivityTable payments={recentPayments} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
