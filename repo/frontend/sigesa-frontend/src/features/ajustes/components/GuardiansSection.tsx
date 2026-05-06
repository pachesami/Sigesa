import { useEffect, useState } from 'react';
import { Button, Group, Table, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { studentsService } from '../../../services/studentsService';
import { usersService } from '../../../services/usersService';
import type { Acudiente } from '../../../types/students';
import { obtenerMensajeError } from '../../../utils/apiErrors';

const normalizarRol = (valor: string) => valor.trim().toLowerCase();

export default function GuardiansSection() {
  const [acudientes, setAcudientes] = useState<Acudiente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      cedula: '',
      nombre: '',
      telefono: '',
      correo: '',
      username: '',
      password: '',
    },
  });

  const cargarAcudientes = async () => {
    try {
      setCargando(true);
      const data = await studentsService.listarAcudientes({ page_size: 100 });
      setAcudientes(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los acudientes.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarAcudientes();
  }, []);

  const obtenerRolAcudiente = async () => {
    const data = await usersService.listarRoles({ page_size: 100 });
    const rol = data.results.find((item) => normalizarRol(item.nombre) === 'acudiente');
    return rol?.id_rol;
  };

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      const idRol = await obtenerRolAcudiente();
      if (!idRol) {
        setError('No existe el rol Acudiente.');
        return;
      }

      const usuario = await usersService.crearUsuario({
        username: values.username,
        password: values.password,
        roles_ids: [idRol],
        estado: 'activo',
      });

      await studentsService.crearAcudiente({
        cedula: values.cedula,
        nombre: values.nombre,
        telefono: values.telefono || null,
        correo: values.correo || null,
        direccion: null,
        direccion_trabajo: null,
        telefono_trabajo: null,
        id_usuario: usuario.id_usuario,
      });

      form.reset();
      await cargarAcudientes();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo registrar el acudiente.'));
    }
  };

  const handleEliminar = async (cedula: string) => {
    setError('');
    try {
      await studentsService.eliminarAcudiente(cedula);
      await cargarAcudientes();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo eliminar el acudiente.'));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Acudientes</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end" grow>
          <TextInput label="Cedula" required {...form.getInputProps('cedula')} />
          <TextInput label="Nombre" required {...form.getInputProps('nombre')} />
        </Group>
        <Group align="flex-end" grow mt="md">
          <TextInput label="Telefono" {...form.getInputProps('telefono')} />
          <TextInput label="Correo" type="email" {...form.getInputProps('correo')} />
        </Group>
        <Group align="flex-end" grow mt="md">
          <TextInput label="Usuario" required {...form.getInputProps('username')} />
          <TextInput label="Contrasena" type="password" required {...form.getInputProps('password')} />
          <Button type="submit" loading={cargando} className="bg-green-600 hover:bg-green-700">
            Guardar
          </Button>
        </Group>
      </form>

      <div className="overflow-x-auto">
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Cedula</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Correo</Table.Th>
              <Table.Th>Telefono</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {acudientes.map((acudiente) => (
              <Table.Tr key={acudiente.cedula}>
                <Table.Td>{acudiente.cedula}</Table.Td>
                <Table.Td>{acudiente.nombre}</Table.Td>
                <Table.Td>{acudiente.correo ?? '-'}</Table.Td>
                <Table.Td>{acudiente.telefono ?? '-'}</Table.Td>
                <Table.Td>
                  <Button variant="light" color="red" size="xs" onClick={() => handleEliminar(acudiente.cedula)}>
                    Eliminar
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
