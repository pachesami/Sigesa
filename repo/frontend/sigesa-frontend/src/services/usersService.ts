import httpClient from './httpClient';
import type { ApiList, ListParams } from '../types/api';
import type { Rol, Usuario } from '../types/auth';

export type UsuarioCreate = {
  username: string;
  password: string;
  estado?: 'activo' | 'inactivo';
  is_staff?: boolean;
  roles_ids?: number[];
};

export type UsuarioUpdate = {
  username?: string;
  estado?: 'activo' | 'inactivo';
  password?: string;
  is_staff?: boolean;
};

export type RolCreate = {
  nombre: string;
};

export const usersService = {
  listarUsuarios: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<Usuario>>('/users/usuarios/', { params });
    return data;
  },
  obtenerUsuario: async (idUsuario: number) => {
    const { data } = await httpClient.get<Usuario>(`/users/usuarios/${idUsuario}/`);
    return data;
  },
  crearUsuario: async (payload: UsuarioCreate) => {
    const { data } = await httpClient.post<Usuario>('/users/usuarios/', payload);
    return data;
  },
  actualizarUsuario: async (idUsuario: number, payload: UsuarioUpdate) => {
    const { data } = await httpClient.put<Usuario>(`/users/usuarios/${idUsuario}/`, payload);
    return data;
  },
  eliminarUsuario: async (idUsuario: number) => {
    await httpClient.delete(`/users/usuarios/${idUsuario}/`);
  },
  obtenerPerfil: async () => {
    const { data } = await httpClient.get<Usuario>('/users/me/');
    return data;
  },
  actualizarPerfil: async (payload: UsuarioUpdate) => {
    const { data } = await httpClient.patch<Usuario>('/users/me/', payload);
    return data;
  },
  listarRoles: async (params?: ListParams) => {
    const { data } = await httpClient.get<ApiList<Rol>>('/users/roles/', { params });
    return data;
  },
  crearRol: async (payload: RolCreate) => {
    const { data } = await httpClient.post<Rol>('/users/roles/', payload);
    return data;
  },
  actualizarRol: async (idRol: number, payload: RolCreate) => {
    const { data } = await httpClient.put<Rol>(`/users/roles/${idRol}/`, payload);
    return data;
  },
  eliminarRol: async (idRol: number) => {
    await httpClient.delete(`/users/roles/${idRol}/`);
  },
};
