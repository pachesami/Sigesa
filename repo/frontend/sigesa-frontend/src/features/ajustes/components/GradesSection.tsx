import { useEffect, useState } from 'react';
import { Button, Group, Select, Table, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { academicService } from '../../../services/academicService';
import type { Docente, Grado } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function GradesSection() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

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
      setError(obtenerMensajeError(err, 'No se pudieron cargar los grados.'));
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
        id_docente: values.id_docente ? values.id_docente : null,
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Grados</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end">
          <TextInput
            label="Nombre"
            placeholder="Ej: Grado 5"
            required
            {...form.getInputProps('nombre')}
          />
          <Select
            label="Docente"
            placeholder="Sin asignar"
            data={opcionesDocentes}
            clearable
            searchable
            {...form.getInputProps('id_docente')}
          />
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
  );
}
