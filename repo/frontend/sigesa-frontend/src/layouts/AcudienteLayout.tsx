import { Outlet } from 'react-router-dom';

export default function AcudienteLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-bold text-gray-800">Panel Acudiente</h1>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
