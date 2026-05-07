import { Button, Group, Select, TextInput, Textarea, Alert, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

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

interface StudentFormProps {
  onSave: (data: StudentFormData) => void;
  loading?: boolean;
  error?: string;
  gradeOptions: Array<{ value: string; label: string }>;
}

const ESTADOS_MATRICULA = [
  { value: 'activa', label: 'Activa' },
  { value: 'inactiva', label: 'Inactiva' },
  { value: 'retirado', label: 'Retirado' },
  { value: 'graduado', label: 'Graduado' },
  { value: 'trasladado', label: 'Trasladado' },
];

export default function StudentForm({ onSave, loading, error, gradeOptions }: StudentFormProps) {
  const form = useForm<StudentFormData>({
    initialValues: {
      identity: '',
      fullName: '',
      dateOfBirth: '',
      bloodType: 'O+',
      address: '',
      observations: '',
      guardianIdentity: '',
      guardianName: '',
      guardianAddress: '',
      guardianPhone: '',
      guardianWorkAddress: '',
      guardianWorkPhone: '',
      guardianEmail: '',
      guardianRelationship: 'Padre',
      guardianIsPrimary: true,
      gradeId: '',
      enrollmentYear: String(new Date().getFullYear()),
      enrollmentDate: '',
      enrollmentStatus: 'activa',
    },
  });

  const handleSubmit = (values: StudentFormData) => {
    onSave(values);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Registro de Estudiante</h2>
        <p className="text-sm text-gray-500">Completa los datos del estudiante, acudiente y matricula.</p>
      </div>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Estudiante</h3>
          <Group grow>
            <TextInput label="Numero de Identidad" required {...form.getInputProps('identity')} />
            <TextInput label="Nombre Completo" required {...form.getInputProps('fullName')} />
          </Group>
          <Group grow mt="md">
            <TextInput type="date" label="Fecha de Nacimiento" {...form.getInputProps('dateOfBirth')} />
            <Select
              label="RH"
              data={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']}
              {...form.getInputProps('bloodType')}
            />
          </Group>
          <TextInput mt="md" label="Direccion" {...form.getInputProps('address')} />
          <Textarea mt="md" label="Observaciones" {...form.getInputProps('observations')} />
        </div>

        <Divider />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Acudiente</h3>
          <Group grow>
            <TextInput label="Cedula" required {...form.getInputProps('guardianIdentity')} />
            <TextInput label="Nombre" required {...form.getInputProps('guardianName')} />
          </Group>
          <Group grow mt="md">
            <TextInput label="Direccion" {...form.getInputProps('guardianAddress')} />
            <TextInput label="Telefono" {...form.getInputProps('guardianPhone')} />
          </Group>
          <Group grow mt="md">
            <TextInput label="Direccion Trabajo" {...form.getInputProps('guardianWorkAddress')} />
            <TextInput label="Telefono Trabajo" {...form.getInputProps('guardianWorkPhone')} />
          </Group>
          <Group grow mt="md">
            <TextInput label="Correo" type="email" {...form.getInputProps('guardianEmail')} />
            <Select
              label="Parentesco"
              data={['Padre', 'Madre', 'Abuelo/a', 'Tio/a', 'Hermano/a', 'Otro']}
              {...form.getInputProps('guardianRelationship')}
            />
          </Group>
          <Select
            mt="md"
            label="Acudiente Principal"
            data={[
              { value: 'true', label: 'Si' },
              { value: 'false', label: 'No' },
            ]}
            value={form.values.guardianIsPrimary ? 'true' : 'false'}
            onChange={(value) => form.setFieldValue('guardianIsPrimary', value === 'true')}
          />
        </div>

        <Divider />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Matricula</h3>
          <Group grow>
            <Select
              label="Grado"
              placeholder="Selecciona un grado"
              data={gradeOptions}
              required
              searchable
              {...form.getInputProps('gradeId')}
            />
            <TextInput
              label="Ano"
              type="number"
              required
              {...form.getInputProps('enrollmentYear')}
            />
          </Group>
          <Group grow mt="md">
            <TextInput
              type="date"
              label="Fecha Matricula"
              required
              {...form.getInputProps('enrollmentDate')}
            />
            <Select
              label="Estado"
              data={ESTADOS_MATRICULA}
              {...form.getInputProps('enrollmentStatus')}
            />
          </Group>
        </div>

        <Button type="submit" loading={loading} className="bg-green-600 hover:bg-green-700">
          Guardar
        </Button>
      </form>
    </div>
  );
}
