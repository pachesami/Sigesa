import { useEffect, useState } from 'react';
import { Button, Group, NumberInput, Table, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { academicService } from '../../../services/academicService';
import type { Periodo } from '../../../types/academic';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function PeriodsSection() {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      numero_periodo: 1,
      year: new Date().getFullYear(),
    },
  });

  const cargarPeriodos = async () => {
    try {
      setCargando(true);
      const data = await academicService.listarPeriodos({ page_size: 100 });
      setPeriodos(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los periodos.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPeriodos();
  }, []);

  const handleSubmit = async (values: { numero_periodo: number; year: number }) => {
    setError('');
    try {
      await academicService.crearPeriodo(values);
      await cargarPeriodos();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo crear el periodo.'));
    }
  };

  const handleEliminar = async (idPeriodo: number) => {
    setError('');
    try {
      await academicService.eliminarPeriodo(idPeriodo);
      await cargarPeriodos();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo eliminar el periodo.'));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Periodos</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end">
          <NumberInput
            label="Numero"
            min={1}
            max={4}
            required
            {...form.getInputProps('numero_periodo')}
          />
          <NumberInput
            label="Ano"
            min={2000}
            max={2100}
            required
            {...form.getInputProps('year')}
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
              <Table.Th>ID</Table.Th>
              <Table.Th>Numero</Table.Th>
              <Table.Th>Ano</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {periodos.map((periodo) => (
              <Table.Tr key={periodo.id_periodo}>
                <Table.Td>{periodo.id_periodo}</Table.Td>
                <Table.Td>{periodo.numero_periodo}</Table.Td>
                <Table.Td>{periodo.year}</Table.Td>
                <Table.Td>
                  <Button variant="light" color="red" size="xs" onClick={() => handleEliminar(periodo.id_periodo)}>
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
