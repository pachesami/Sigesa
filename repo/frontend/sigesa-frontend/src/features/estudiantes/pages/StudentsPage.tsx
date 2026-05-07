import { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import { studentsService } from '../../../services/studentsService';
import { academicService } from '../../../services/academicService';
import type { Grado } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

interface StudentFormData {
  identity: string;
  fullName: string;
  dateOfBirth: string;
  bloodType: string;
  address: string;
  observations: string;
  guardianIdentity: string;
  guardianName: string;
  guardianAddress: string;
  guardianPhone: string;
  guardianWorkAddress: string;
  guardianWorkPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
  guardianIsPrimary: boolean;
  gradeId: string;
  enrollmentYear: string;
  enrollmentDate: string;
  enrollmentStatus: string;
}

export default function StudentsPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cargarGrados = async () => {
    try {
      const data = await academicService.listarGrados({ page_size: 100 });
      setGrados(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los grados.'));
    }
  };

  useEffect(() => {
    cargarGrados();
  }, []);

  const handleSaveStudent = async (data: StudentFormData) => {
    setError('');
    try {
      setLoading(true);
      await studentsService.registroCompleto({
        estudiante: {
          numero_identidad: data.identity,
          nombre: data.fullName,
          fecha_nacimiento: data.dateOfBirth || null,
          rh: data.bloodType || null,
          direccion: data.address || null,
          observaciones: data.observations || null,
        },
        matricula: {
          id_grado: Number(data.gradeId),
          year: Number(data.enrollmentYear),
          fecha_matricula: data.enrollmentDate,
          estado: data.enrollmentStatus,
        },
        acudientes: [
          {
            cedula: data.guardianIdentity,
            nombre: data.guardianName,
            direccion: data.guardianAddress || null,
            telefono: data.guardianPhone || null,
            direccion_trabajo: data.guardianWorkAddress || null,
            telefono_trabajo: data.guardianWorkPhone || null,
            correo: data.guardianEmail || null,
            parentesco: data.guardianRelationship,
            acudiente_principal: data.guardianIsPrimary,
          },
        ],
      });
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo guardar el registro.'));
    } finally {
      setLoading(false);
    }
  };

  const opcionesGrados = grados.map((grado) => ({
    value: String(grado.id_grado),
    label: `${grado.nombre}${grado.docente_nombre ? ` - ${grado.docente_nombre}` : ''}`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Estudiantes</span>
        </nav>
      </div>

      <StudentForm onSave={handleSaveStudent} loading={loading} error={error} gradeOptions={opcionesGrados} />
    </div>
  );
}
