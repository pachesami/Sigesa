import { Button, Checkbox, Group, Modal, Select, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';

interface GuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: GuardianFormData) => void;
  loading?: boolean;
  error?: string;
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

export default function GuardianModal({ isOpen, onClose, onAdd, loading, error }: GuardianModalProps) {
  const form = useForm<GuardianFormData>({
    initialValues: {
      identity: '',
      name: '',
      address: '',
      phone: '',
      workAddress: '',
      workPhone: '',
      email: '',
      relationship: 'Padre',
      isPrimary: false,
    },
  });

  const handleSubmit = (values: GuardianFormData) => {
    onAdd(values);
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Agregar Acudiente" size="lg">
      {error && <Alert color="red" mb="md">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group grow>
          <TextInput label="Cedula" required {...form.getInputProps('identity')} />
          <TextInput label="Nombre" required {...form.getInputProps('name')} />
        </Group>
        <Group grow mt="md">
          <TextInput label="Direccion" {...form.getInputProps('address')} />
          <TextInput label="Telefono" {...form.getInputProps('phone')} />
        </Group>
        <Group grow mt="md">
          <TextInput label="Direccion Trabajo" {...form.getInputProps('workAddress')} />
          <TextInput label="Telefono Trabajo" {...form.getInputProps('workPhone')} />
        </Group>
        <TextInput mt="md" label="Correo" type="email" {...form.getInputProps('email')} />
        <Group grow mt="md">
          <Select
            label="Parentesco"
            data={['Padre', 'Madre', 'Abuelo/a', 'Tio/a', 'Hermano/a', 'Otro']}
            {...form.getInputProps('relationship')}
          />
          <Checkbox
            mt={28}
            label="Acudiente Principal"
            checked={form.values.isPrimary}
            onChange={(event) => form.setFieldValue('isPrimary', event.currentTarget.checked)}
          />
        </Group>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} className="bg-green-600 hover:bg-green-700">
            Guardar
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
