import type { MatriculaEstado } from './enrollment';

export type Estudiante = {
  numero_identidad: string;
  nombre: string;
  fecha_nacimiento: string | null;
  rh: string | null;
  direccion: string | null;
  observaciones: string | null;
};

export type Acudiente = {
  cedula: string;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  direccion_trabajo: string | null;
  telefono_trabajo: string | null;
  correo: string | null;
  id_usuario: number | null;
};

export type RelacionEA = {
  id_relacion: number;
  id_estudiante: string;
  estudiante_nombre?: string;
  id_acudiente: string;
  acudiente_nombre?: string;
  parentesco: string | null;
  acudiente_principal: boolean;
};

export type EstudianteDetail = Estudiante & {
  acudientes: RelacionEA[];
};

export type AcudienteRegistro = {
  cedula: string;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  direccion_trabajo: string | null;
  telefono_trabajo: string | null;
  correo: string | null;
  parentesco: string | null;
  acudiente_principal: boolean;
};

export type MatriculaRegistro = {
  id_grado: number;
  year: number;
  fecha_matricula: string;
  estado: MatriculaEstado;
};

export type RegistroEstudiantePayload = {
  estudiante: Estudiante;
  matricula: MatriculaRegistro;
  acudientes: AcudienteRegistro[];
};
