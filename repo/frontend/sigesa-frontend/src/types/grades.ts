export type Nota = {
  id_nota: number;
  id_matricula: number;
  id_materia: number;
  id_periodo: number;
  nota: number | string | null;
  observacion: string | null;
};

export type NotaDetail = Nota & {
  estudiante_nombre: string;
  grado_nombre: string;
  materia_nombre: string;
  periodo_numero: number;
  periodo_year: number;
};

export type NotaBulk = {
  id_matricula: number;
  id_materia: number;
  id_periodo: number;
  nota: number | string | null;
  observacion?: string | null;
};
