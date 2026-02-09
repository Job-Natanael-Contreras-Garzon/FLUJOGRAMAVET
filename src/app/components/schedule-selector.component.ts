import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaces based on the new JSON structure
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

export interface ScheduleData {
  facultad: string;
  semestre: string;
  data_por_turno: {
    manana: Grupo[];
    tarde: Grupo[];
  };
}

@Component({
  selector: 'app-schedule-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      
      <div class="flex justify-center items-center w-full p-4">
        <div class="grid grid-cols-2 gap-6 w-full max-w-sm">
          
          <button 
            type="button"
            (click)="openModal('manana')"
            class="flex flex-col items-center justify-center p-6 bg-yellow-100/50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700/30 rounded-2xl hover:bg-yellow-200/50 hover:border-yellow-400 transition-all active:scale-95 group w-full aspect-square shadow-sm">
            
            <div class="w-14 h-14 rounded-full bg-yellow-400 text-white grid place-items-center mb-3 shadow-md group-hover:scale-110 transition-transform">
               <span class="material-symbols-outlined text-3xl leading-none">wb_sunny</span>
            </div>
            
            <h3 class="font-black text-yellow-800 dark:text-yellow-100 text-lg">Mañana</h3>
            <p class="text-xs text-yellow-600 dark:text-yellow-200/70 font-medium">Ver grupos</p>
          </button>

          <button 
            type="button"
            (click)="openModal('tarde')"
            class="flex flex-col items-center justify-center p-6 bg-indigo-100/50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700/30 rounded-2xl hover:bg-indigo-200/50 hover:border-indigo-400 transition-all active:scale-95 group w-full aspect-square shadow-sm">
            
            <div class="w-14 h-14 rounded-full bg-indigo-500 text-white grid place-items-center mb-3 shadow-md group-hover:scale-110 transition-transform">
               <span class="material-symbols-outlined text-3xl leading-none">dark_mode</span>
            </div>
            
            <h3 class="font-black text-indigo-900 dark:text-indigo-100 text-lg">Tarde</h3>
            <p class="text-xs text-indigo-600 dark:text-indigo-200/70 font-medium">Ver grupos</p>
          </button>

        </div>
      </div>

    </div>

    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" (click)="closeModal()"></div>

        <div class="relative w-full max-w-6xl h-[92vh] sm:h-[88vh] bg-white dark:bg-[#1a1a1a] sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">

          <div class="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-[#1f1f1f] dark:to-[#252525] border-b border-slate-300 dark:border-slate-700/50 p-3 sm:p-4 flex justify-between items-center shrink-0">
            <div>
              <span class="text-xs font-bold text-red-500 dark:text-red-500 tracking-wider uppercase block mb-1">Selección de Horario</span>
              <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-none">
                {{ data().facultad }}
              </h3>
            </div>
            <button type="button" (click)="closeModal()" class="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700/80 hover:bg-slate-400 dark:hover:bg-slate-600 grid place-items-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-90">
              <span class="material-symbols-outlined text-lg leading-none">close</span>
            </button>
          </div>

          <div class="flex items-center justify-between px-3 py-3 sm:p-4 bg-slate-100 dark:bg-[#1f1f1f] shrink-0 shadow-md z-10 border-b border-slate-300 dark:border-slate-700/50 select-none">
            <button type="button" (click)="prevGroup()" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed grid place-items-center active:scale-95" [disabled]="currentGroupIndex() === 0">
              <span class="material-symbols-outlined text-3xl sm:text-4xl leading-none">chevron_left</span>
            </button>

            <div class="flex-1 flex flex-col items-center justify-center px-2">
              <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none text-center">
                {{ currentGroup().nombre }}
              </h2>
              <p class="text-xs font-bold text-slate-500 dark:text-slate-500 mt-1 leading-none">
                {{ currentGroupIndex() + 1 }} de {{ currentGroups().length }}
              </p>
            </div>

            <button type="button" (click)="nextGroup()" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed grid place-items-center active:scale-95" [disabled]="currentGroupIndex() === currentGroups().length - 1">
              <span class="material-symbols-outlined text-3xl sm:text-4xl leading-none">chevron_right</span>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0f0f0f] p-3 sm:p-5">

            <div class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-300 dark:border-slate-700/70 overflow-hidden mb-5 flex flex-col">
              
              <div class="w-full overflow-x-auto pb-0 scrollbar-hide">
                
                <div class="min-w-[600px] sm:min-w-full flex flex-col">

                  <div class="grid grid-cols-5 border-b-2 border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-[#2a2a2a] dark:to-[#252525]">
                    @for (day of daysOfWeek; track day) {
                      <div class="py-2.5 sm:py-3 px-1 sm:px-2 text-center text-[9px] sm:text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider border-r border-slate-300 dark:border-slate-700/50 last:border-r-0">
                        <span class="hidden sm:inline">{{ day }}</span>
                        <span class="sm:hidden">{{ day.substring(0, 3) }}</span>
                      </div>
                    }
                  </div>

                  <div class="grid grid-cols-5 bg-slate-50 dark:bg-[#151515] flex-grow">
                    @for (day of daysOfWeek; track day) {
                      <div class="relative border-r border-slate-300 dark:border-slate-700/50 last:border-r-0 flex flex-col h-full bg-slate-50 dark:bg-[#151515]">
                        <div class="flex flex-col gap-2 p-1.5 sm:p-2 flex-grow min-h-[150px]">
                          
                          @for (segment of getSegments(day); track segment.s + segment.h) {
                            <div class="relative group rounded-lg border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center p-2 gap-1.5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-default" [class]="getColorClass(segment.s)">
                              
                              <span class="text-xs sm:text-sm font-black opacity-100 leading-none tracking-wide text-center uppercase drop-shadow-md">
                                {{ segment.s }}
                              </span>

                              <div class="w-8 h-px bg-slate-400/30 dark:bg-white/20 rounded-full"></div>

                              <div class="flex flex-col items-center w-full gap-0.5">
                                <span class="text-[9px] sm:text-[10px] font-bold opacity-90 leading-tight whitespace-nowrap">
                                  {{ segment.h }}
                               </span>
                                <span class="bg-white/50 dark:bg-black/30 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold text-slate-800 dark:text-white/90 shadow-sm mt-0.5 border border-slate-300 dark:border-white/10">
                                  {{ segment.a }}
                                </span>
                              </div>
                            </div>
                          }

                          @if (getSegments(day).length === 0) {
                            <div class="flex flex-col items-center justify-center py-10 opacity-20 gap-2 select-none h-full text-slate-500 dark:text-slate-400">
                              <span class="material-symbols-outlined text-3xl">event_busy</span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div> 

                </div> 
              </div> 
            </div> 

            <div class="mt-4 sm:mt-6">
              <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 px-1">Materias del {{ currentGroup().nombre }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                @for (materia of currentGroup().materias; track materia.sigla) {
                  <div class="bg-white dark:bg-[#252525]/80 backdrop-blur-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700/60 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all shadow-sm">
                    <div class="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center font-black text-[9px] text-white shadow-lg" [class]="getColorClass(materia.sigla)">
                      {{ materia.sigla }}
                    </div>
                    <div class="flex-1 min-w-0 overflow-hidden">
                      <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight mb-1 truncate">{{ materia.nombre }}</p>
                      <p class="text-[10px] text-slate-600 dark:text-slate-400 leading-tight truncate">{{ materia.docente }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

          </div> 

          <div class="p-3 sm:p-4 bg-gradient-to-t from-slate-100 to-white dark:from-[#1f1f1f] dark:to-[#1a1a1a] border-t border-slate-300 dark:border-slate-700/50 shrink-0 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div class="text-xs text-slate-600 dark:text-slate-400 hidden sm:flex flex-col gap-0.5">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                Turno: <strong class="capitalize text-slate-700 dark:text-slate-300">{{ currentTurno() }}</strong>
              </span>
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                Materias: <strong class="text-slate-700 dark:text-slate-300">{{ currentGroup().materias.length }}</strong>
              </span>
            </div>
            <button 
              (click)="confirmSelection()"
              class="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 px-6 sm:px-8 rounded-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 hover:shadow-red-500/30">
              
              <span class="text-sm sm:text-base leading-none pt-0.5">
                Confirmar {{ currentGroup().nombre }}
              </span>

              <span class="material-symbols-outlined text-xl leading-none">
                check_circle
              </span>

            </button>   
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    /* Scrollbar Styling for the modal content */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
      border-radius: 3px;
    }
  `]
})
export class ScheduleSelectorComponent {
  data = input.required<ScheduleData>();
  selected = output<string>();

  // State
  isOpen = signal(false);
  currentTurno = signal<'manana' | 'tarde'>('manana');
  currentGroupIndex = signal(0);

  daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  // Cache for random colors per sigla to keep consistency during re-renders
  private colorCache = new Map<string, string>();
  private availableColors = [
    'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100',
    'bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100',
    'bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-100',
    'bg-orange-100 text-orange-900 dark:bg-orange-900/40 dark:text-orange-100',
    'bg-pink-100 text-pink-900 dark:bg-pink-900/40 dark:text-pink-100',
    'bg-teal-100 text-teal-900 dark:bg-teal-900/40 dark:text-teal-100',
    'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-100',
    'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/40 dark:text-cyan-100'
  ];

  currentGroups = computed(() => {
    return this.data().data_por_turno[this.currentTurno()] || [];
  });

  currentGroup = computed(() => {
    const groups = this.currentGroups();
    return groups[this.currentGroupIndex()] || groups[0];
  });

  openModal(turno: 'manana' | 'tarde') {
    this.currentTurno.set(turno);
    this.currentGroupIndex.set(0);
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }

  nextGroup() {
    if (this.currentGroupIndex() < this.currentGroups().length - 1) {
      this.currentGroupIndex.update(i => i + 1);
    }
  }

  prevGroup() {
    if (this.currentGroupIndex() > 0) {
      this.currentGroupIndex.update(i => i - 1);
    }
  }

  getSegments(day: string): Segmento[] {
    const group = this.currentGroup();
    if (!group) return [];

    const dayData = group.cronograma.find(d => d.dia === day);
    if (!dayData) return [];

    // Sort by start time just in case
    return [...dayData.segmentos].sort((a, b) => {
      const startA = a.h.split('-')[0];
      const startB = b.h.split('-')[0];
      return startA.localeCompare(startB);
    });
  }

  getMateriaName(sigla: string): string {
    const mat = this.currentGroup().materias.find(m => m.sigla === sigla);
    return mat ? mat.nombre : sigla;
  }

  getColorClass(sigla: string): string {
    if (!this.colorCache.has(sigla)) {
      // Deterministic assignment based on sigla string char codes sum
      const sum = sigla.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const color = this.availableColors[sum % this.availableColors.length];
      this.colorCache.set(sigla, color);
    }
    return this.colorCache.get(sigla)!;
  }

  confirmSelection() {
    this.closeModal();
    this.selected.emit(this.currentGroup().nombre);
  }
}