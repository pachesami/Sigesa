import GradesToolbar from '../components/GradesToolbar';
import GradesTable from '../components/GradesTable';
import GradesPagination from '../components/GradesPagination';
import GradeModal from '../components/GradeModal';
import { grades, teachers } from '../data/mockData';

export default function CursosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Cursos</span>
        </nav>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <GradesToolbar teachers={teachers} />
        <GradesTable grades={grades} />
        <GradesPagination />
      </div>

      <GradeModal title="Nuevo grado" teachers={teachers} />
    </div>
  );
}
