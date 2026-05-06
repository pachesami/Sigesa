export type Rol = {
  id_rol: number;
  nombre: string;
};

export type UsuarioRol = {
  id_usuario_rol: number;
  id_rol: number;
  rol: Rol;
};

export type Usuario = {
  id_usuario: number;
  username: string;
  estado: 'activo' | 'inactivo';
  fecha_creacion: string;
  is_staff: boolean;
  roles: UsuarioRol[];
};

export type LoginResponse = {
  access: string;
  refresh: string;
  usuario: Usuario;
};
