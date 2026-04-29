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
