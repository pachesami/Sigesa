import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface GuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: GuardianFormData) => void;
}

export interface GuardianFormData {
  identity: string;
  name: string;
  address: string;
  phone: string;
  workAddress: string;
  workPhone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export default function GuardianModal({ isOpen, onClose, onAdd }: GuardianModalProps) {
  const [tab, setTab] = useState<'search' | 'new'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<GuardianFormData>({
    identity: '',
    name: '',
    address: '',
    phone: '',
    workAddress: '',
    workPhone: '',
    email: '',
    relationship: 'Padre',
    isPrimary: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    onAdd(formData);
    setFormData({
      identity: '',
      name: '',
      address: '',
      phone: '',
      workAddress: '',
      workPhone: '',
      email: '',
      relationship: 'Padre',
      isPrimary: false,
    });
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Agregar Acudiente</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setTab('search')}
              className={`pb-3 px-4 font-medium text-sm transition-colors ${
                tab === 'search'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Buscar Acudiente
            </button>
            <button
              onClick={() => setTab('new')}
              className={`pb-3 px-4 font-medium text-sm transition-colors ${
                tab === 'new'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Nuevo Acudiente
            </button>
          </div>

          {tab === 'search' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por cédula o nombre
              </label>
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ingrese cédula o nombre"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500 text-sm">No hay acudientes disponibles para esta búsqueda</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cédula</label>
                  <input
                    type="text"
                    name="identity"
                    value={formData.identity}
                    onChange={handleFormChange}
                    placeholder="Ingrese cédula"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Ingrese nombre"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Ingrese dirección"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Ingrese teléfono"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección Trabajo</label>
                  <input
                    type="text"
                    name="workAddress"
                    value={formData.workAddress}
                    onChange={handleFormChange}
                    placeholder="Ingrese dirección trabajo"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono Trabajo</label>
                  <input
                    type="tel"
                    name="workPhone"
                    value={formData.workPhone}
                    onChange={handleFormChange}
                    placeholder="Ingrese teléfono trabajo"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Ingrese correo"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Parentesco</label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Abuelo/a">Abuelo/a</option>
                    <option value="Tío/a">Tío/a</option>
                    <option value="Hermano/a">Hermano/a</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={formData.isPrimary}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Acudiente Principal</label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
