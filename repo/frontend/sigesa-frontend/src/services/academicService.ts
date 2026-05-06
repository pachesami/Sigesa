import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type { Docente, DocenteDetail, Grado, Materia, Periodo } from '../types/academic';

export const academicService = {
  listarDocentes: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<Docente>>('/academic/docentes/', { params });
    return data;
  },
  obtenerDocente: async (cedula: string) => {
    const { data } = await httpClient.get<DocenteDetail>(`/academic/docentes/${cedula}/`);
    return data;
  },
  crearDocente: async (payload: Docente) => {
    const { data } = await httpClient.post<Docente>('/academic/docentes/', payload);
    return data;
  },
  actualizarDocente: async (cedula: string, payload: Partial<Docente>) => {
    const { data } = await httpClient.put<Docente>(`/academic/docentes/${cedula}/`, payload);
    return data;
  },
  eliminarDocente: async (cedula: string) => {
    await httpClient.delete(`/academic/docentes/${cedula}/`);
  },
  listarGrados: async (params?: ListParams & { id_docente?: string }) => {
    const { data } = await httpClient.get<ApiList<Grado>>('/academic/grados/', { params });
    return data;
  },
  obtenerGrado: async (idGrado: number) => {
    const { data } = await httpClient.get<Grado>(`/academic/grados/${idGrado}/`);
    return data;
  },
  crearGrado: async (payload: Omit<Grado, 'id_grado' | 'docente_nombre'>) => {
    const { data } = await httpClient.post<Grado>('/academic/grados/', payload);
    return data;
  },
  actualizarGrado: async (idGrado: number, payload: Partial<Grado>) => {
    const { data } = await httpClient.put<Grado>(`/academic/grados/${idGrado}/`, payload);
    return data;
  },
  eliminarGrado: async (idGrado: number) => {
    await httpClient.delete(`/academic/grados/${idGrado}/`);
  },
  listarMaterias: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<Materia>>('/academic/materias/', { params });
    return data;
  },
  obtenerMateria: async (idMateria: number) => {
    const { data } = await httpClient.get<Materia>(`/academic/materias/${idMateria}/`);
    return data;
  },
  crearMateria: async (payload: Omit<Materia, 'id_materia'>) => {
    const { data } = await httpClient.post<Materia>('/academic/materias/', payload);
    return data;
  },
  actualizarMateria: async (idMateria: number, payload: Partial<Materia>) => {
    const { data } = await httpClient.put<Materia>(`/academic/materias/${idMateria}/`, payload);
    return data;
  },
  eliminarMateria: async (idMateria: number) => {
    await httpClient.delete(`/academic/materias/${idMateria}/`);
  },
  listarPeriodos: async (params?: ListParams & { year?: number; numero_periodo?: number }) => {
    const { data } = await httpClient.get<ApiList<Periodo>>('/academic/periodos/', { params });
    return data;
  },
  obtenerPeriodo: async (idPeriodo: number) => {
    const { data } = await httpClient.get<Periodo>(`/academic/periodos/${idPeriodo}/`);
    return data;
  },
  crearPeriodo: async (payload: Omit<Periodo, 'id_periodo'>) => {
    const { data } = await httpClient.post<Periodo>('/academic/periodos/', payload);
    return data;
  },
  actualizarPeriodo: async (idPeriodo: number, payload: Partial<Periodo>) => {
    const { data } = await httpClient.put<Periodo>(`/academic/periodos/${idPeriodo}/`, payload);
    return data;
  },
  eliminarPeriodo: async (idPeriodo: number) => {
    await httpClient.delete(`/academic/periodos/${idPeriodo}/`);
  },
};
