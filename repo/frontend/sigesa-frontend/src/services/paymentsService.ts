import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type {
  ConceptoPago,
  CuentaCobro,
  CuentaCobroDetail,
  MetodoPago,
  Pago,
  PagoDetail,
  RegistrarPagoPayload,
} from '../types/payments';

export const paymentsService = {
  listarConceptos: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<ConceptoPago>>('/payments/conceptos/', { params });
    return data;
  },
  obtenerConcepto: async (idConcepto: number) => {
    const { data } = await httpClient.get<ConceptoPago>(`/payments/conceptos/${idConcepto}/`);
    return data;
  },
  crearConcepto: async (payload: Omit<ConceptoPago, 'id_concepto_pago'>) => {
    const { data } = await httpClient.post<ConceptoPago>('/payments/conceptos/', payload);
    return data;
  },
  actualizarConcepto: async (idConcepto: number, payload: Partial<ConceptoPago>) => {
    const { data } = await httpClient.put<ConceptoPago>(`/payments/conceptos/${idConcepto}/`, payload);
    return data;
  },
  eliminarConcepto: async (idConcepto: number) => {
    await httpClient.delete(`/payments/conceptos/${idConcepto}/`);
  },
  listarMetodos: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<MetodoPago>>('/payments/metodos/', { params });
    return data;
  },
  obtenerMetodo: async (idMetodo: number) => {
    const { data } = await httpClient.get<MetodoPago>(`/payments/metodos/${idMetodo}/`);
    return data;
  },
  crearMetodo: async (payload: Omit<MetodoPago, 'id_metodo'>) => {
    const { data } = await httpClient.post<MetodoPago>('/payments/metodos/', payload);
    return data;
  },
  actualizarMetodo: async (idMetodo: number, payload: Partial<MetodoPago>) => {
    const { data } = await httpClient.put<MetodoPago>(`/payments/metodos/${idMetodo}/`, payload);
    return data;
  },
  eliminarMetodo: async (idMetodo: number) => {
    await httpClient.delete(`/payments/metodos/${idMetodo}/`);
  },
  listarCuentas: async (params?: ListParams & { id_matricula?: number; estado?: string; mes?: number; year?: number; id_concepto_pago?: number }) => {
    const { data } = await httpClient.get<ApiList<CuentaCobro>>('/payments/cuentas/', { params });
    return data;
  },
  obtenerCuenta: async (idCuenta: number) => {
    const { data } = await httpClient.get<CuentaCobroDetail>(`/payments/cuentas/${idCuenta}/`);
    return data;
  },
  crearCuenta: async (payload: Omit<CuentaCobro, 'id_cuenta'>) => {
    const { data } = await httpClient.post<CuentaCobro>('/payments/cuentas/', payload);
    return data;
  },
  actualizarCuenta: async (idCuenta: number, payload: Partial<CuentaCobro>) => {
    const { data } = await httpClient.put<CuentaCobro>(`/payments/cuentas/${idCuenta}/`, payload);
    return data;
  },
  eliminarCuenta: async (idCuenta: number) => {
    await httpClient.delete(`/payments/cuentas/${idCuenta}/`);
  },
  registrarPago: async (idCuenta: number, payload: RegistrarPagoPayload) => {
    const { data } = await httpClient.post<Pago>(`/payments/cuentas/${idCuenta}/pagar/`, payload);
    return data;
  },
  listarPagos: async (params?: ListParams & { id_cuenta_cobro?: number; id_metodo_pago?: number; fecha_pago?: string }) => {
    const { data } = await httpClient.get<ApiList<Pago>>('/payments/pagos/', { params });
    return data;
  },
  obtenerPago: async (idPago: number) => {
    const { data } = await httpClient.get<PagoDetail>(`/payments/pagos/${idPago}/`);
    return data;
  },
  crearPago: async (payload: Omit<Pago, 'id_pago'>) => {
    const { data } = await httpClient.post<Pago>('/payments/pagos/', payload);
    return data;
  },
  actualizarPago: async (idPago: number, payload: Partial<Pago>) => {
    const { data } = await httpClient.put<Pago>(`/payments/pagos/${idPago}/`, payload);
    return data;
  },
  eliminarPago: async (idPago: number) => {
    await httpClient.delete(`/payments/pagos/${idPago}/`);
  },
};
