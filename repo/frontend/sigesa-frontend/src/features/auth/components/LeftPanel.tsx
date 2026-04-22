import { BookOpen, GraduationCap, Handshake } from 'lucide-react';
import SchoolCrest from '../../../components/ui/SchoolCrest';
import WaveDecoration from './WaveDecoration';
export default function LeftPanel() {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 bg-white px-8 py-10 overflow-hidden">
      <div className="flex flex-col items-center z-10">
        <SchoolCrest />

        <div className="mt-5 text-center">
          <h1 className="text-4xl font-black tracking-wider text-[#5A1E08] uppercase">
            BIENVENIDO
          </h1>
          <div className="flex items-center gap-2 mt-1 justify-center">
            <span className="block h-px w-8 bg-[#D4A017]" />
            <p className="text-sm font-bold tracking-[0.25em] text-[#D4A017] uppercase">
              AL SISTEMA
            </p>
            <span className="block h-px w-8 bg-[#D4A017]" />
          </div>
        </div>

        <div className="mt-5 text-center px-4">
          <p className="text-[15px] italic text-gray-600 font-medium leading-relaxed">
            "Educamos con amor para un futuro mejor"
          </p>
          <div className="flex items-center gap-1 mt-1 justify-center">
            <span className="block h-px w-10 bg-gray-300" />
            <span className="block h-px w-12 bg-gray-400" />
            <span className="block h-px w-10 bg-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="w-3 h-3 rounded-full bg-[#D4A017]" />
          <span className="w-3 h-3 rounded-full bg-[#5A1E08]" />
          <span className="w-3 h-3 rounded-full bg-gray-300" />
        </div>

        <div className="flex items-start gap-0 mt-8 divide-x divide-gray-300">
          <div className="flex flex-col items-center gap-2 px-6">
            <BookOpen className="w-10 h-10 text-gray-800 stroke-[1.3]" />
            <span className="text-sm font-semibold text-gray-700">Matrículas</span>
          </div>
          <div className="flex flex-col items-center gap-2 px-6">
            <GraduationCap className="w-10 h-10 text-gray-800 stroke-[1.3]" />
            <span className="text-sm font-semibold text-gray-700">Plan de estudios</span>
          </div>
          <div className="flex flex-col items-center gap-2 px-6">
            <Handshake className="w-10 h-10 text-gray-800 stroke-[1.3]" />
            <span className="text-sm font-semibold text-gray-700">Pagos</span>
          </div>
        </div>
      </div>

      <WaveDecoration side="left" />
    </div>
  );
}

