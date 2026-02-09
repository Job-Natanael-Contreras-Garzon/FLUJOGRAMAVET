import { Injectable } from '@angular/core';
import horarioJSON from './horario.json';

export interface Materia {
  sigla: string;
  nombre: string;
  docente: string;
}

export interface Segmento {
  h: string; // Hora inicio - fin (e.g. "07:00-08:30")
  s: string; // Sigla
  a: string; // Aula
}

export interface DiaCronograma {
  dia: string;
  segmentos: Segmento[];
}

export interface Grupo {
  nombre: string;
  materias: Materia[];
  cronograma: DiaCronograma[];
}

export interface DataHorarios {
  facultad: string;
  semestre: string;
  data_por_turno: {
    manana: Grupo[];
    tarde: Grupo[];
  };
}

// Export data directly like flow.ts does
export const HORARIO_DATA: DataHorarios = horarioJSON as DataHorarios;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  getHorarioData(): DataHorarios {
    return HORARIO_DATA;
  }
}

