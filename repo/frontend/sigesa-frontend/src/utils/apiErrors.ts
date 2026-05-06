import { AxiosError } from 'axios';

export type ErrorApi = {
  detail?: string;
  non_field_errors?: string[];
  message?: string;
  [key: string]: unknown;
};

export const obtenerMensajeError = (error: unknown, fallback = 'Ocurrio un error inesperado.') => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorApi | string | undefined;
    if (typeof data === 'string') return data;
    if (data?.detail) return data.detail;
    if (data?.non_field_errors?.length) return data.non_field_errors[0];
    if (data?.message) return data.message;
    if (error.message) return error.message;
  }
  return fallback;
};
