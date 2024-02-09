export interface Vacante {
  id_vacante: number;
  entidad: string;
  id_unidad_centro: number;
  num_alumnos: number;
  elegidos_total: string | null; // Puede ser null al principio
}
