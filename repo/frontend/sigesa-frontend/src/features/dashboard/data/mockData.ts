import type { PendingAlert, RecentPayment } from '../types';

export const stats = {
  totalRecaudado: 78240,
  pagosPendientes: 68,
  estudiantesRegistrados: 386,
  pagosDelDia: 24,
};

export const recentPayments: RecentPayment[] = [
  {
    id: 'p-1001',
    estudiante: 'Sofia Herrera',
    fecha: '22/04/2026',
    valor: 120.0,
    estado: 'completado',
    metodo: 'En Linea',
  },
  {
    id: 'p-1002',
    estudiante: 'Mateo Lopez',
    fecha: '22/04/2026',
    valor: 180.0,
    estado: 'completado',
    metodo: 'Transferencia',
  },
  {
    id: 'p-1003',
    estudiante: 'Valeria Cruz',
    fecha: '21/04/2026',
    valor: 160.0,
    estado: 'pendiente',
    metodo: 'Efectivo',
  },
  {
    id: 'p-1004',
    estudiante: 'Diego Ramos',
    fecha: '21/04/2026',
    valor: 200.0,
    estado: 'completado',
    metodo: 'Cheque',
  },
  {
    id: 'p-1005',
    estudiante: 'Camila Vega',
    fecha: '20/04/2026',
    valor: 140.0,
    estado: 'atrasado',
    metodo: 'Transferencia',
  },
  {
    id: 'p-1006',
    estudiante: 'Lucas Paredes',
    fecha: '20/04/2026',
    valor: 150.0,
    estado: 'completado',
    metodo: 'En Linea',
  },
];

export const pendingAlerts: PendingAlert[] = [
  {
    id: 'a-2001',
    estudiante: 'Isabel Ortiz',
    detalle: 'Cuota marzo sin registrar',
    vencimiento: '15/04/2026',
    valor: 130.0,
    estado: 'atrasado',
    tipo: 'Pago atrasado',
  },
  {
    id: 'a-2002',
    estudiante: 'Julian Silva',
    detalle: 'Matricula pendiente de confirmacion',
    vencimiento: '30/04/2026',
    valor: 220.0,
    estado: 'pendiente',
    tipo: 'Matricula pendiente',
  },
  {
    id: 'a-2003',
    estudiante: 'Emma Vargas',
    detalle: 'Cuota abril sin evidencia',
    vencimiento: '18/04/2026',
    valor: 110.0,
    estado: 'atrasado',
    tipo: 'Pago atrasado',
  },
  {
    id: 'a-2004',
    estudiante: 'Tomas Guerrero',
    detalle: 'Matricula pendiente de firma',
    vencimiento: '05/05/2026',
    valor: 200.0,
    estado: 'pendiente',
    tipo: 'Matricula pendiente',
  },
];

export const chartSeries = [
  { label: 'Ene', value: 32 },
  { label: 'Feb', value: 46 },
  { label: 'Mar', value: 58 },
  { label: 'Abr', value: 52 },
  { label: 'May', value: 70 },
  { label: 'Jun', value: 60 },
];
