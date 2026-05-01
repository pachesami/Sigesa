export type PaymentStatus = 'completado' | 'pendiente' | 'atrasado';
export type PaymentMethod = 'En Linea' | 'Transferencia' | 'Efectivo' | 'Cheque';

export interface RecentPayment {
  id: string;
  estudiante: string;
  fecha: string;
  valor: number;
  estado: PaymentStatus;
  metodo: PaymentMethod;
}

export type AlertType = 'Pago atrasado' | 'Matricula pendiente';

export interface PendingAlert {
  id: string;
  estudiante: string;
  detalle: string;
  vencimiento: string;
  valor: number;
  estado: PaymentStatus;
  tipo: AlertType;
}
