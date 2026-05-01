import { useState } from 'react';
import StudentForm from '../components/StudentForm';
import GuardiansList from '../components/GuardiansList';
import GuardianModal from '../components/GuardianModal';
import type { GuardianFormData } from '../components/GuardianModal';

interface StudentFormData {
  identity: string;
  fullName: string;
  dateOfBirth: string;
  bloodType: string;
  address: string;
  observations: string;
}

export default function StudentsPage() {
  const [guardians, setGuardians] = useState<GuardianFormData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveStudent = (data: StudentFormData) => {
    console.log('Estudiante guardado:', data);
  };

  const handleAddGuardian = (guardian: GuardianFormData) => {
    setGuardians(prev => [...prev, guardian]);
    setIsModalOpen(false);
  };

  const handleRemoveGuardian = (index: number) => {
    setGuardians(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
                <div className="flex items-center justify-between">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800">Estudiantes</span>
            </nav>
          </div>
      <StudentForm onSave={handleSaveStudent} />
      <GuardiansList
        guardians={guardians}
        onAddClick={() => setIsModalOpen(true)}
        onRemove={handleRemoveGuardian}
      />
      <GuardianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGuardian}
      />
    </div>
  );
}
