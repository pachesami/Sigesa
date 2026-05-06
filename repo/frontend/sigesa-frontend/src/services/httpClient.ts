import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { guardarTokens, limpiarTokens, obtenerTokens } from './authStorage';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1';

const httpClient = axios.create({
  baseURL,
});

const authClient = axios.create({
  baseURL,
});

let refrescando = false;
let colaEspera: Array<(token: string | null) => void> = [];

const resolverCola = (token: string | null) => {
  colaEspera.forEach((callback) => callback(token));
  colaEspera = [];
};

httpClient.interceptors.request.use((config) => {
  const tokens = obtenerTokens();
  if (tokens?.access) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const respuesta = error.response;
    const configOriginal = error.config as (InternalAxiosRequestConfig & { _reintento?: boolean });

    if (!respuesta || respuesta.status !== 401 || configOriginal?._reintento) {
      return Promise.reject(error);
    }

    configOriginal._reintento = true;

    const tokens = obtenerTokens();
    if (!tokens?.refresh) {
      limpiarTokens();
      return Promise.reject(error);
    }

    if (refrescando) {
      return new Promise((resolve, reject) => {
        colaEspera.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          configOriginal.headers = configOriginal.headers ?? {};
          configOriginal.headers.Authorization = `Bearer ${token}`;
          resolve(httpClient(configOriginal));
        });
      });
    }

    refrescando = true;

    try {
      const { data } = await authClient.post<{ access: string; refresh?: string }>(
        '/auth/refresh/',
        { refresh: tokens.refresh }
      );

      const nuevosTokens = {
        access: data.access,
        refresh: data.refresh ?? tokens.refresh,
      };

      guardarTokens(nuevosTokens);
      resolverCola(nuevosTokens.access);

      configOriginal.headers = configOriginal.headers ?? {};
      configOriginal.headers.Authorization = `Bearer ${nuevosTokens.access}`;

      return httpClient(configOriginal);
    } catch (refreshError) {
      limpiarTokens();
      resolverCola(null);
      return Promise.reject(refreshError);
    } finally {
      refrescando = false;
    }
  }
);

export default httpClient;
