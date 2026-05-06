import { useEffect, useState } from 'react';
import { Button, Group, Table, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { academicService } from '../../../services/academicService';
import { usersService } from '../../../services/usersService';
import type { Docente } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

const normalizarRol = (valor: string) => valor.trim().toLowerCase();

export default function TeachersSection() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
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

  const cargarDocentes = async () => {
    try {
      setCargando(true);
      const data = await academicService.listarDocentes({ page_size: 100 });
      setDocentes(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los docentes.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDocentes();
  }, []);

  const obtenerRolDocente = async () => {
    const data = await usersService.listarRoles({ page_size: 100 });
    const rol = data.results.find((item) => {
      const nombre = normalizarRol(item.nombre);
      return nombre === 'docente' || nombre === 'profesor';
    });
    return rol?.id_rol;
  };

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      const idRol = await obtenerRolDocente();
      if (!idRol) {
        setError('No existe el rol Docente/Profesor.');
        return;
      }

      const usuario = await usersService.crearUsuario({
        username: values.username,
        password: values.password,
        roles_ids: [idRol],
        estado: 'activo',
      });

      await academicService.crearDocente({
        cedula: values.cedula,
        nombre: values.nombre,
        telefono: values.telefono || null,
        correo: values.correo || null,
        id_usuario: usuario.id_usuario,
      });

      form.reset();
      await cargarDocentes();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo registrar el docente.'));
    }
  };

  const handleEliminar = async (cedula: string) => {
    setError('');
    try {
      await academicService.eliminarDocente(cedula);
      await cargarDocentes();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo eliminar el docente.'));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Docentes</h2>

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
            {docentes.map((docente) => (
              <Table.Tr key={docente.cedula}>
                <Table.Td>{docente.cedula}</Table.Td>
                <Table.Td>{docente.nombre}</Table.Td>
                <Table.Td>{docente.correo ?? '-'}</Table.Td>
                <Table.Td>{docente.telefono ?? '-'}</Table.Td>
                <Table.Td>
                  <Button variant="light" color="red" size="xs" onClick={() => handleEliminar(docente.cedula)}>
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
