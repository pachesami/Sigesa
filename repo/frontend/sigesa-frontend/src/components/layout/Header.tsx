import { Search, Bell, User, Wallet, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-[64px] bg-white border-b border-gray-200 flex items-center px-6 gap-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-700 font-bold text-lg tracking-wide flex-1">
        <Wallet size={22} className="text-gray-600" />
        <span className="uppercase tracking-wider">PAGOS</span>
        <ChevronDown size={16} className="text-gray-400 ml-0.5" />
      </div>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <Search size={17} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors relative">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <User size={17} />
        </button>
        <ChevronDown size={15} className="text-gray-400" />
      </div>
    </header>
  );
}
