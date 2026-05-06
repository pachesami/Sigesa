import { useEffect, useMemo, useState } from 'react';
import { Button, Select, Table, TextInput, Alert } from '@mantine/core';
import { paymentsService } from '../../../services/paymentsService';
import type { CuentaCobro } from '../../../types/payments';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function PagosDashboardPage() {
  const [cuentas, setCuentas] = useState<CuentaCobro[]>([]);
  const [estado, setEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const cargarCuentas = async () => {
    try {
      setCargando(true);
      const data = await paymentsService.listarCuentas({ page_size: 200, estado: estado || undefined });
      setCuentas(data.results);
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudieron cargar los pagos.'));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCuentas();
  }, [estado]);

  const cuentasFiltradas = useMemo(() => {
    if (!busqueda) return cuentas;
    const valor = busqueda.toLowerCase();
    return cuentas.filter((cuenta) => String(cuenta.id_matricula).includes(valor));
  }, [busqueda, cuentas]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-700">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Pagos</span>
        </nav>
        <Button className="bg-green-600 hover:bg-green-700">Nuevo Pago</Button>
      </div>

      {error && <Alert color="red">{error}</Alert>}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <TextInput
            placeholder="Buscar matricula"
            value={busqueda}
            onChange={(event) => setBusqueda(event.currentTarget.value)}
          />
          <Select
            placeholder="Estado"
            data={['pendiente', 'pagada', 'vencida', 'anulada']}
            value={estado}
            onChange={(value) => setEstado(value ?? '')}
            clearable
          />
          <Button variant="default" onClick={cargarCuentas} loading={cargando}>
            Actualizar
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cuenta</Table.Th>
                <Table.Th>Matricula</Table.Th>
                <Table.Th>Concepto</Table.Th>
                <Table.Th>Mes</Table.Th>
                <Table.Th>Ano</Table.Th>
                <Table.Th>Valor</Table.Th>
                <Table.Th>Estado</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cuentasFiltradas.map((cuenta) => (
                <Table.Tr key={cuenta.id_cuenta}>
                  <Table.Td>{cuenta.id_cuenta}</Table.Td>
                  <Table.Td>{cuenta.id_matricula}</Table.Td>
                  <Table.Td>{cuenta.id_concepto_pago}</Table.Td>
                  <Table.Td>{cuenta.mes}</Table.Td>
                  <Table.Td>{cuenta.year}</Table.Td>
                  <Table.Td>{cuenta.valor_deuda}</Table.Td>
                  <Table.Td className="capitalize">{cuenta.estado}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
