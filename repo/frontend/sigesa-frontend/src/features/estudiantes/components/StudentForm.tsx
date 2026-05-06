import { Button, Group, Select, TextInput, Textarea, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';

interface StudentFormData {
  identity: string;
  fullName: string;
  dateOfBirth: string;
  bloodType: string;
  address: string;
  observations: string;
}

interface StudentFormProps {
  onSave: (data: StudentFormData) => void;
  loading?: boolean;
  error?: string;
}

export default function StudentForm({ onSave, loading, error }: StudentFormProps) {
  const form = useForm<StudentFormData>({
    initialValues: {
      identity: '',
      fullName: '',
      dateOfBirth: '',
      bloodType: 'O+',
      address: '',
      observations: '',
    },
  });

  const handleSubmit = (values: StudentFormData) => {
    onSave(values);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Formulario de Estudiante</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <Button type="submit" mt="lg" loading={loading} className="bg-green-600 hover:bg-green-700">
          Guardar Estudiante
        </Button>
      </form>
    </div>
  );
}
