import type { Grade, TeacherOption } from '../types';

export const teachers: TeacherOption[] = [
  { id: 't-1', nombre: 'Maria Lopez' },
  { id: 't-2', nombre: 'Carlos Mendez' },
  { id: 't-3', nombre: 'Ana Rivera' },
  { id: 't-4', nombre: 'Jose Ramirez' },
  { id: 't-5', nombre: 'Sin asignar' },
];

export const grades: Grade[] = [
  { id: 'g-1', nombre: 'Grado 1ro', docente: 'Maria Lopez' },
  { id: 'g-2', nombre: 'Grado 2do', docente: 'Carlos Mendez' },
  { id: 'g-3', nombre: 'Grado 3ro', docente: 'Ana Rivera' },
  { id: 'g-4', nombre: 'Grado 4to', docente: 'Sin asignar' },
  { id: 'g-5', nombre: 'Grado 5to', docente: 'Jose Ramirez' },
  { id: 'g-6', nombre: 'Grado 6to', docente: 'Sin asignar' },
  { id: 'g-7', nombre: 'Preparatoria', docente: 'Maria Lopez' },
];
