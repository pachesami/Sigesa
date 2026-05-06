import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type { Acudiente, Estudiante, EstudianteDetail, RelacionEA } from '../types/students';

export type RelacionCreate = Omit<RelacionEA, 'id_relacion' | 'estudiante_nombre' | 'acudiente_nombre'>;

export const studentsService = {
  listarEstudiantes: async (params?: ListParams & { rh?: string }) => {
    const { data } = await httpClient.get<ApiList<Estudiante>>('/students/estudiantes/', { params });
    return data;
  },
  obtenerEstudiante: async (numeroIdentidad: string) => {
    const { data } = await httpClient.get<EstudianteDetail>(`/students/estudiantes/${numeroIdentidad}/`);
    return data;
  },
  crearEstudiante: async (payload: Estudiante) => {
    const { data } = await httpClient.post<Estudiante>('/students/estudiantes/', payload);
    return data;
  },
  actualizarEstudiante: async (numeroIdentidad: string, payload: Partial<Estudiante>) => {
    const { data } = await httpClient.put<Estudiante>(`/students/estudiantes/${numeroIdentidad}/`, payload);
    return data;
  },
  eliminarEstudiante: async (numeroIdentidad: string) => {
    await httpClient.delete(`/students/estudiantes/${numeroIdentidad}/`);
  },
  listarAcudientes: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<Acudiente>>('/students/acudientes/', { params });
    return data;
  },
  obtenerAcudiente: async (cedula: string) => {
    const { data } = await httpClient.get<Acudiente>(`/students/acudientes/${cedula}/`);
    return data;
  },
  crearAcudiente: async (payload: Acudiente) => {
    const { data } = await httpClient.post<Acudiente>('/students/acudientes/', payload);
    return data;
  },
  actualizarAcudiente: async (cedula: string, payload: Partial<Acudiente>) => {
    const { data } = await httpClient.put<Acudiente>(`/students/acudientes/${cedula}/`, payload);
    return data;
  },
  eliminarAcudiente: async (cedula: string) => {
    await httpClient.delete(`/students/acudientes/${cedula}/`);
  },
  listarRelaciones: async (params?: ListParams & { id_estudiante?: string; id_acudiente?: string; acudiente_principal?: boolean }) => {
    const { data } = await httpClient.get<ApiList<RelacionEA>>('/students/relaciones/', { params });
    return data;
  },
  obtenerRelacion: async (idRelacion: number) => {
    const { data } = await httpClient.get<RelacionEA>(`/students/relaciones/${idRelacion}/`);
    return data;
  },
  crearRelacion: async (payload: RelacionCreate) => {
    const { data } = await httpClient.post<RelacionEA>('/students/relaciones/', payload);
    return data;
  },
  actualizarRelacion: async (idRelacion: number, payload: Partial<RelacionEA>) => {
    const { data } = await httpClient.put<RelacionEA>(`/students/relaciones/${idRelacion}/`, payload);
    return data;
  },
  eliminarRelacion: async (idRelacion: number) => {
    await httpClient.delete(`/students/relaciones/${idRelacion}/`);
  },
};
