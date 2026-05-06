export type Docente = {
  cedula: string;
  nombre: string;
  telefono: string | null;
  correo: string | null;
  id_usuario: number | null;
};

export type DocenteDetail = Docente & {
  usuario_username: string | null;
};

export type Grado = {
  id_grado: number;
  nombre: string;
  id_docente: string | null;
  docente_nombre?: string | null;
};

export type Materia = {
  id_materia: number;
  nombre: string;
};

export type Periodo = {
  id_periodo: number;
  numero_periodo: number;
  year: number;
};
