export type ConceptoPago = {
  id_concepto_pago: number;
  nombre: string;
};

export type MetodoPago = {
  id_metodo: number;
  nombre: string;
};

export type CuentaCobroEstado = 'pendiente' | 'pagada' | 'vencida' | 'anulada';

export type CuentaCobro = {
  id_cuenta: number;
  id_matricula: number;
  id_concepto_pago: number;
  mes: number;
  year: number;
  valor_deuda: number | string;
  estado: CuentaCobroEstado;
};

export type Pago = {
  id_pago: number;
  id_cuenta_cobro: number;
  fecha_pago: string;
  monto_pago: number | string;
  id_metodo_pago: number;
  observaciones: string | null;
};

export type CuentaCobroDetail = CuentaCobro & {
  pagos: Pago[];
  saldo_pendiente: number | string;
  estudiante_nombre: string;
  concepto_nombre: string;
};

export type PagoDetail = Pago & {
  metodo_nombre: string;
  estudiante_nombre: string;
  concepto_nombre: string;
};

export type RegistrarPagoPayload = {
  fecha_pago: string;
  monto_pago: number | string;
  id_metodo_pago: number;
  observaciones?: string | null;
};
