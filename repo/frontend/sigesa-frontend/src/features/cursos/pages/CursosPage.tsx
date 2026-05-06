import { useEffect, useState } from 'react';
import { Button, Group, Select, Table, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { academicService } from '../../../services/academicService';
import type { Docente, Grado } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function CursosPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const form = useForm({
    initialValues: {
      nombre: '',
      id_docente: '',
    },
  });

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [gradosData, docentesData] = await Promise.all([
        academicService.listarGrados({ page_size: 100 }),
        academicService.listarDocentes({ page_size: 100 }),
      ]);
      setGrados(gradosData.results);
      setDocentes(docentesData.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los cursos.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (values: { nombre: string; id_docente: string }) => {
    setError('');
    try {
      await academicService.crearGrado({
        nombre: values.nombre,
        id_docente: values.id_docente || null,
      });
      form.reset();
      await cargarDatos();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo crear el grado.'));
    }
  };

  const handleEliminar = async (idGrado: number) => {
    setError('');
    try {
      await academicService.eliminarGrado(idGrado);
      await cargarDatos();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo eliminar el grado.'));
    }
  };

  const opcionesDocentes = docentes.map((docente) => ({
    value: docente.cedula,
    label: docente.nombre,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Cursos</span>
        </nav>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800">Gestion de grados</h2>

        {error && <Alert color="red">{error}</Alert>}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group align="flex-end">
            <TextInput label="Nombre" required {...form.getInputProps('nombre')} />
            <Select label="Docente" data={opcionesDocentes} clearable searchable {...form.getInputProps('id_docente')} />
            <Button type="submit" loading={cargando} className="bg-green-600 hover:bg-green-700">
              Guardar
            </Button>
          </Group>
        </form>

        <div className="overflow-x-auto">
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Docente</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {grados.map((grado) => (
                <Table.Tr key={grado.id_grado}>
                  <Table.Td>{grado.nombre}</Table.Td>
                  <Table.Td>{grado.docente_nombre ?? 'Sin asignar'}</Table.Td>
                  <Table.Td>
                    <Button variant="light" color="red" size="xs" onClick={() => handleEliminar(grado.id_grado)}>
                      Eliminar
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
