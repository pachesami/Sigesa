export type PaymentStatus = 'completado' | 'pendiente' | 'atrasado';
export type PaymentMethod = 'En Línea' | 'Transferencia' | 'Efectivo' | 'Cheque';

export interface Payment {
  id: string;
  alumno: string;
  grado: string;
  referencia: string;
  fecha: string;
  monto: number;
  estado: PaymentStatus;
  metodo: PaymentMethod;
  avatarSeed: number;
  female?: boolean;
}

export type NavItem = 'dashboard' | 'estudiantes' | 'pagos' | 'cursos' | 'ajustes';
