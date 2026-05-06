import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LoginResponse, Usuario } from '../types/auth';
import type { Tokens } from '../services/authStorage';
import { guardarTokens, limpiarTokens, obtenerTokens } from '../services/authStorage';
import { authService } from '../services/authService';

const CLAVE_USUARIO = 'sigesa_usuario';

const obtenerUsuarioGuardado = (): Usuario | null => {
  try {
    const valor = localStorage.getItem(CLAVE_USUARIO);
    if (!valor) return null;
    return JSON.parse(valor) as Usuario;
  } catch {
    return null;
  }
};

const guardarUsuario = (usuario: Usuario) => {
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
};

const limpiarUsuario = () => {
  localStorage.removeItem(CLAVE_USUARIO);
};

const normalizarRol = (valor: string) => valor.trim().toLowerCase();

const mapearRol = (valor: string) => {
  const rol = normalizarRol(valor);
  if (rol === 'profesor') return 'docente';
  return rol;
};

export type AuthContextValue = {
  usuario: Usuario | null;
  tokens: Tokens | null;
  cargando: boolean;
  esAutenticado: boolean;
  iniciarSesion: (data: LoginResponse) => void;
  cerrarSesion: (opciones?: { informarServidor?: boolean }) => Promise<void>;
  tieneRol: (roles: string[]) => boolean;
  obtenerRutaPorUsuario: (usuario: Usuario) => string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => obtenerUsuarioGuardado());
  const [tokens, setTokens] = useState<Tokens | null>(() => obtenerTokens());
  const [cargando, setCargando] = useState(false);

  const obtenerRoles = useCallback((valor: Usuario | null) => {
    if (!valor) return [] as string[];
    return valor.roles?.map((rol) => mapearRol(rol.rol.nombre)) ?? [];
  }, []);

  const tieneRol = useCallback(
    (roles: string[]) => {
      if (!usuario) return false;
      if (roles.length === 0) return true;
      const rolesUsuario = obtenerRoles(usuario);
      const rolesPermitidos = roles.map(mapearRol);
      if (rolesPermitidos.includes('secretaria') && usuario.is_staff) {
        return true;
      }
      return rolesPermitidos.some((rol) => rolesUsuario.includes(rol));
    },
    [obtenerRoles, usuario]
  );

  const obtenerRutaPorUsuario = useCallback(
    (valor: Usuario) => {
      const rolesUsuario = obtenerRoles(valor);
      if (valor.is_staff || rolesUsuario.includes('secretaria')) {
        return '/secretaria/dashboard';
      }
      if (rolesUsuario.includes('docente')) {
        return '/docente/dashboard';
      }
      if (rolesUsuario.includes('acudiente')) {
        return '/acudiente/dashboard';
      }
      return '/login';
    },
    [obtenerRoles]
  );

  const iniciarSesion = useCallback((data: LoginResponse) => {
    guardarTokens({ access: data.access, refresh: data.refresh });
    guardarUsuario(data.usuario);
    setTokens({ access: data.access, refresh: data.refresh });
    setUsuario(data.usuario);
  }, []);

  const cerrarSesion = useCallback(
    async (opciones?: { informarServidor?: boolean }) => {
      const refresh = tokens?.refresh;
      setCargando(true);
      limpiarTokens();
      limpiarUsuario();
      setTokens(null);
      setUsuario(null);
      if (opciones?.informarServidor && refresh) {
        try {
          await authService.logout(refresh);
        } catch {
          // Silenciar errores de logout remoto.
        }
      }
      setCargando(false);
    },
    [tokens]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      tokens,
      cargando,
      esAutenticado: Boolean(usuario && tokens?.access),
      iniciarSesion,
      cerrarSesion,
      tieneRol,
      obtenerRutaPorUsuario,
    }),
    [usuario, tokens, cargando, iniciarSesion, cerrarSesion, tieneRol, obtenerRutaPorUsuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }
  return context;
};
