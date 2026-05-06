import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type { Matricula, MatriculaDetail, MatriculaEstado } from '../types/enrollment';

export const enrollmentService = {
  listarMatriculas: async (params?: ListParams & { id_grado?: number; id_estudiante?: string; year?: number; estado?: MatriculaEstado }) => {
    const { data } = await httpClient.get<ApiList<Matricula>>('/enrollment/matriculas/', { params });
    return data;
  },
  obtenerMatricula: async (idMatricula: number) => {
    const { data } = await httpClient.get<MatriculaDetail>(`/enrollment/matriculas/${idMatricula}/`);
    return data;
  },
  crearMatricula: async (payload: Omit<Matricula, 'id_matricula'>) => {
    const { data } = await httpClient.post<Matricula>('/enrollment/matriculas/', payload);
    return data;
  },
  actualizarMatricula: async (idMatricula: number, payload: Partial<Matricula>) => {
    const { data } = await httpClient.put<Matricula>(`/enrollment/matriculas/${idMatricula}/`, payload);
    return data;
  },
  eliminarMatricula: async (idMatricula: number) => {
    await httpClient.delete(`/enrollment/matriculas/${idMatricula}/`);
  },
};
