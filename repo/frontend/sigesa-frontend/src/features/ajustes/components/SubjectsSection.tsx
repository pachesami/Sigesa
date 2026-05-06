import { useEffect, useState } from 'react';
import { Button, Group, Table, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { academicService } from '../../../services/academicService';
import type { Materia } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function SubjectsSection() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      nombre: '',
    },
  });

  const cargarMaterias = async () => {
    try {
      setCargando(true);
      const data = await academicService.listarMaterias({ page_size: 100 });
      setMaterias(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar las materias.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  const handleSubmit = async (values: { nombre: string }) => {
    setError('');
    try {
      await academicService.crearMateria({ nombre: values.nombre });
      form.reset();
      await cargarMaterias();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo crear la materia.'));
    }
  };

  const handleEliminar = async (idMateria: number) => {
    setError('');
    try {
      await academicService.eliminarMateria(idMateria);
      await cargarMaterias();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo eliminar la materia.'));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Materias</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end">
          <TextInput label="Nombre" placeholder="Ej: Matematicas" required {...form.getInputProps('nombre')} />
          <Button type="submit" loading={cargando} className="bg-green-600 hover:bg-green-700">
            Guardar
          </Button>
        </Group>
      </form>

      <div className="overflow-x-auto">
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {materias.map((materia) => (
              <Table.Tr key={materia.id_materia}>
                <Table.Td>{materia.id_materia}</Table.Td>
                <Table.Td>{materia.nombre}</Table.Td>
                <Table.Td>
                  <Button variant="light" color="red" size="xs" onClick={() => handleEliminar(materia.id_materia)}>
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
