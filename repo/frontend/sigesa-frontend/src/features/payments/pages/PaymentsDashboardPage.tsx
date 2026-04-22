import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatsCards from '../components/StatsCards'
import FilterPanel from '../components/FilterPanel'
import PaymentsTable from '../components/PaymentsTable'
import { payments as allPayments } from '../data/mockData'
import type { NavItem, Payment } from '../types'

const ITEMS_PER_PAGE = 8
const TOTAL_ITEMS = 1200
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)

function PaymentsDashboardPage() {
  const [activeNav, setActiveNav] = useState<NavItem>('pagos')
  const [currentPage, setCurrentPage] = useState(1)
  const [desde, setDesde] = useState('01/04/2024')
  const [estado, setEstado] = useState('')
  const [grado, setGrado] = useState('')
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>(allPayments)

  const handleFilter = () => {
    let result = allPayments

    if (estado) {
      result = result.filter((p) => p.estado === estado)
    }

    if (grado) {
      result = result.filter((p) => p.grado === grado)
    }

    setFilteredPayments(result)
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800">Pagos</span>
            </nav>
            <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-green-700">
              <Plus size={16} />
              Nuevo Pago
            </button>
          </div>

          <StatsCards />

          <div className="flex min-h-0 flex-1 gap-4">
            <FilterPanel
              desde={desde}
              setDesde={setDesde}
              estado={estado}
              setEstado={setEstado}
              grado={grado}
              setGrado={setGrado}
              onFilter={handleFilter}
            />
            <PaymentsTable
              payments={filteredPayments}
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              totalItems={TOTAL_ITEMS}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default PaymentsDashboardPage

