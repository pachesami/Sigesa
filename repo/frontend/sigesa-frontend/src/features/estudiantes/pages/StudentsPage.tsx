import { useState } from 'react';
import StudentForm from '../components/StudentForm';
import GuardiansList from '../components/GuardiansList';
import GuardianModal from '../components/GuardianModal';
import type { GuardianFormData } from '../components/GuardianModal';
import { studentsService } from '../../../services/studentsService';
import { obtenerMensajeError } from '../../../utils/apiErrors';

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
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingGuardian, setLoadingGuardian] = useState(false);
  const [errorStudent, setErrorStudent] = useState('');
  const [errorGuardian, setErrorGuardian] = useState('');

  const handleSaveStudent = async (data: StudentFormData) => {
    setErrorStudent('');
    try {
      setLoadingStudent(true);
      const estudiante = await studentsService.crearEstudiante({
        numero_identidad: data.identity,
        nombre: data.fullName,
        fecha_nacimiento: data.dateOfBirth || null,
        rh: data.bloodType || null,
        direccion: data.address || null,
        observaciones: data.observations || null,
      });
      setStudentId(estudiante.numero_identidad);
    } catch (err) {
      setErrorStudent(obtenerMensajeError(err, 'No se pudo guardar el estudiante.'));
    } finally {
      setLoadingStudent(false);
    }
  };

  const handleAddGuardian = async (guardian: GuardianFormData) => {
    if (!studentId) {
      setErrorGuardian('Primero registra al estudiante.');
      return;
    }
    setErrorGuardian('');
    try {
      setLoadingGuardian(true);
      const acudiente = await studentsService.crearAcudiente({
        cedula: guardian.identity,
        nombre: guardian.name,
        direccion: guardian.address || null,
        telefono: guardian.phone || null,
        direccion_trabajo: guardian.workAddress || null,
        telefono_trabajo: guardian.workPhone || null,
        correo: guardian.email || null,
        id_usuario: null,
      });

      await studentsService.crearRelacion({
        id_estudiante: studentId,
        id_acudiente: acudiente.cedula,
        parentesco: guardian.relationship,
        acudiente_principal: guardian.isPrimary,
      });

      setGuardians((prev) => [...prev, guardian]);
      setIsModalOpen(false);
    } catch (err) {
      setErrorGuardian(obtenerMensajeError(err, 'No se pudo registrar el acudiente.'));
    } finally {
      setLoadingGuardian(false);
    }
  };

  const handleRemoveGuardian = (index: number) => {
    setGuardians((prev) => prev.filter((_, i) => i !== index));
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

      <StudentForm onSave={handleSaveStudent} loading={loadingStudent} error={errorStudent} />
      <GuardiansList guardians={guardians} onAddClick={() => setIsModalOpen(true)} onRemove={handleRemoveGuardian} />
      <GuardianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGuardian}
        loading={loadingGuardian}
        error={errorGuardian}
      />
    </div>
  );
}
