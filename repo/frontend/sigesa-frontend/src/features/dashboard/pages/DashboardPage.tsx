import { useEffect, useState } from 'react';
import { Card, SimpleGrid, Text, Alert } from '@mantine/core';
import { studentsService } from '../../../services/studentsService';
import { paymentsService } from '../../../services/paymentsService';
import { obtenerMensajeError } from '../../../utils/apiErrors';

interface StatsState {
  estudiantes: number;
  cuentas: number;
  pagos: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsState>({ estudiantes: 0, cuentas: 0, pagos: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [estudiantesData, cuentasData, pagosData] = await Promise.all([
          studentsService.listarEstudiantes({ page_size: 1 }),
          paymentsService.listarCuentas({ page_size: 1 }),
          paymentsService.listarPagos({ page_size: 1 }),
        ]);
        setStats({
          estudiantes: estudiantesData.count,
          cuentas: cuentasData.count,
          pagos: pagosData.count,
        });
      } catch (err) {
        setError(obtenerMensajeError(err, 'No se pudo cargar el resumen.'));
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Resumen</span>
        </nav>
      </div>

      {error && <Alert color="red">{error}</Alert>}

      <SimpleGrid cols={3} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase">Estudiantes</Text>
          <Text size="xl" fw={700}>{stats.estudiantes}</Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase">Cuentas de cobro</Text>
          <Text size="xl" fw={700}>{stats.cuentas}</Text>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase">Pagos registrados</Text>
          <Text size="xl" fw={700}>{stats.pagos}</Text>
        </Card>
      </SimpleGrid>
    </div>
  );
}
