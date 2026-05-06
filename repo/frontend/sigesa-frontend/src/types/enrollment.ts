export type MatriculaEstado = 'activa' | 'inactiva' | 'retirado' | 'graduado' | 'trasladado';

export type Matricula = {
  id_matricula: number;
  id_grado: number;
  id_estudiante: string;
  year: number;
  fecha_matricula: string;
  estado: MatriculaEstado;
};

export type MatriculaDetail = Matricula & {
  grado_nombre: string;
  docente_nombre: string | null;
  estudiante_nombre: string;
};
