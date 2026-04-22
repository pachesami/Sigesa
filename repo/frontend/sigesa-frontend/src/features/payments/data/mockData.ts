import type { Payment } from '../types';

export const payments: Payment[] = [
  { id: '1', alumno: 'Diego Gómez', grado: '5°', referencia: 'REF-5698', fecha: '20/04/2024', monto: 150, estado: 'completado', metodo: 'En Línea', avatarSeed: 1 },
  { id: '2', alumno: 'Ana Martinez', grado: '5°', referencia: 'REF-5697', fecha: '19/04/2024', monto: 160, estado: 'pendiente', metodo: 'Transferencia', avatarSeed: 2, female: true },
  { id: '3', alumno: 'Javier Ruiz', grado: '3°', referencia: 'REF-5696', fecha: '19/04/2024', monto: 160, estado: 'completado', metodo: 'Efectivo', avatarSeed: 3 },
  { id: '4', alumno: 'Laura Torres', grado: '4°', referencia: 'REF-5695', fecha: '18/04/2024', monto: 200, estado: 'atrasado', metodo: 'Cheque', avatarSeed: 4, female: true },
  { id: '5', alumno: 'Andrés Castro', grado: '5°', referencia: 'REF-5694', fecha: '16/04/2024', monto: 160, estado: 'completado', metodo: 'Transferencia', avatarSeed: 5 },
  { id: '6', alumno: 'Valentina Ortiz', grado: '5°', referencia: 'REF-5693', fecha: '16/04/2024', monto: 140, estado: 'pendiente', metodo: 'Efectivo', avatarSeed: 6, female: true },
  { id: '7', alumno: 'Daniel Silva', grado: '6°', referencia: 'REF-5692', fecha: '15/04/2024', monto: 180, estado: 'completado', metodo: 'En Línea', avatarSeed: 7 },
  { id: '8', alumno: 'Sofía Pérez', grado: '6°', referencia: 'REF-5691', fecha: '14/04/2024', monto: 150, estado: 'atrasado', metodo: 'En Línea', avatarSeed: 8, female: true },
];

export const stats = {
  totalPagos: 55280,
  completados: 1048,
  pendientes: 152,
  atrasados: 25,
};

