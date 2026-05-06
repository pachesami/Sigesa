import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type { Nota, NotaBulk, NotaDetail } from '../types/grades';

export const gradesService = {
  listarNotas: async (params?: ListParams & { id_matricula?: number; id_materia?: number; id_periodo?: number; id_matricula__id_estudiante?: string; id_matricula__id_grado?: number }) => {
    const { data } = await httpClient.get<ApiList<Nota>>('/grades/notas/', { params });
    return data;
  },
  obtenerNota: async (idNota: number) => {
    const { data } = await httpClient.get<NotaDetail>(`/grades/notas/${idNota}/`);
    return data;
  },
  crearNota: async (payload: Omit<Nota, 'id_nota'>) => {
    const { data } = await httpClient.post<Nota>('/grades/notas/', payload);
    return data;
  },
  actualizarNota: async (idNota: number, payload: Partial<Nota>) => {
    const { data } = await httpClient.put<Nota>(`/grades/notas/${idNota}/`, payload);
    return data;
  },
  eliminarNota: async (idNota: number) => {
    await httpClient.delete(`/grades/notas/${idNota}/`);
  },
  crearNotasMasivo: async (payload: NotaBulk[]) => {
    const { data } = await httpClient.post<{ detail: string }>('/grades/notas/bulk/', payload);
    return data;
  },
};
