import { CreditCard as Edit2 } from 'lucide-react';

export default function MyProfileSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Mi Perfil</h2>

      <div className="flex items-start gap-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold">
            AD
          </div>
          <p className="text-sm text-gray-600 mt-3">Administrador</p>
        </div>

        <div className="flex-1 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Usuario</label>
            <input
              type="text"
              defaultValue="admin@escuela.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
            <div className="flex gap-3">
              <input
                type="password"
                defaultValue="••••••••"
                disabled
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50"
              />
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Cambiar
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                Activo
              </span>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Roles</label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                Administrador
              </span>
            </div>
          </div>

          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors duration-150">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
