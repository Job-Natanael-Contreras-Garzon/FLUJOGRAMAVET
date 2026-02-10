import { Component, input, output, signal, computed, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent, FaqItem } from './faq.component';
import { ScheduleSelectorComponent, ScheduleData } from './schedule-selector.component';
import { HorarioService } from '../services/horario';
import confetti from 'canvas-confetti';

import { StepData, FlowService } from '../services/flow';

@Component({
  selector: 'app-step-viewer',
  standalone: true,
  imports: [CommonModule, FaqComponent, ScheduleSelectorComponent],
  template: `
    <div class="min-h-screen flex flex-col transition-colors duration-300 relative"
         [class.bg-[#f8f6f6]]="step().id !== 9"
         [class.dark:bg-dark-bg]="step().id !== 9"
         [class.bg-white]="step().id === 9"
         [class.dark:bg-slate-900]="step().id === 9" 
         [class.overflow-hidden]="step().id === 9">
      
      <!-- Header -->
      @if (step().id !== 9){  
      <header class="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md sticky top-0 z-20 px-4 py-3 flex items-center shadow-sm dark:shadow-black/20 border-b border-transparent dark:border-white/5 transition-colors duration-300">
        <button (click)="back.emit()" class="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors" aria-label="Volver atrás">
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 class="flex-1 text-center font-bold text-slate-800 dark:text-white text-lg pr-8 truncate">
          Paso {{ step().id }}: {{ step().subtitle }}
        </h2>
      </header>
      }
      
      <!-- Main Content Container -->
      <div 
        class="flex-1 w-full mx-auto p-4 pb-24 transition-all duration-500"
        [class.max-w-md]="step().id !== 9"
        [class.flex]="step().id === 9"
        [class.flex-col]="step().id === 9"
        [class.items-center]="step().id === 9"
        [class.justify-center]="step().id === 9"
        [class.h-screen]="step().id === 9">

        <!-- Progress Bar (Hidden for Step 9) -->
        @if (step().id !== 9) {
          <div class="mb-6">
            <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-slate-500 dark:text-white tracking-wider uppercase">Progreso</span>
              <span class="text-xs font-bold text-secondary">{{ progressPercentage() }}%</span>
            </div>
            <div class="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 shadow-md"
                [style.width.%]="progressPercentage()">
              </div>
            </div>
          </div>
        }

        <!-- Main Card -->
        <div 
           class="transition-all duration-300 relative overflow-hidden"
           [class.bg-white]="step().id !== 9"
           [class.dark:bg-dark-card]="step().id !== 9"
           [class.rounded-[2rem]]="step().id !== 9"
           [class.shadow-sm]="step().id !== 9"
           [class.border]="step().id !== 9"
           [class.border-slate-100]="step().id !== 9"
           [class.dark:border-white/5]="step().id !== 9"
           [class.p-6]="step().id !== 9"
           [class.mb-8]="step().id !== 9"
           
           [class.w-full]="step().id === 9"
           [class.max-w-lg]="step().id === 9"
           [class.text-center]="step().id === 9">

          <!-- Title & Description -->
          <h3 
              class="font-bold mb-2 leading-tight"
              [class.text-center]="step().id !== 9"
              [class.text-xl]="step().id !== 9"
              [class.text-slate-900]="step().id !== 9"
              [class.dark:text-white]="step().id !== 9"
              
              [class.text-4xl]="step().id === 9"
              [class.text-slate-900]="step().id === 9"
              [class.dark:text-white]="step().id === 9"
              [class.mb-6]="step().id === 9"
              [class.animate-bloom-entry]="step().id === 9 && animationTrigger()">
            {{ step().title }}
          </h3>
          
          <p 
             class="text-sm mb-6 leading-relaxed"
             [class.text-center]="step().id !== 9"
             [class.text-slate-500]="step().id !== 9"
             [class.dark:text-gray-400]="step().id !== 9"
             
             [class.text-xl]="step().id === 9"
             [class.text-slate-600]="step().id === 9"
             [class.dark:text-gray-300]="step().id === 9"
             [class.mb-12]="step().id === 9"
             [innerHTML]="highlightText(step().description)">
          </p>


          <!-- Dynamic Content: Payment Details -->
          @if (step().paymentDetails; as pay) {
            <div class="bg-slate-50 dark:bg-white/5 rounded-xl p-5 mb-6 border border-slate-100 dark:border-white/5">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
                 <span class="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide">Monto a pagar</span>
                 <span class="text-xl font-black text-slate-900 dark:text-secondary">{{ pay.amount }}</span>
              </div>
              <div class="space-y-3">
                 <div>
                    <span class="text-xs text-slate-400 block mb-1">Método</span>
                    <p class="text-sm font-medium text-slate-800 dark:text-white flex items-center gap-2">
                       <span class="material-symbols-outlined text-primary">account_balance</span>
                       {{ pay.method }}
                    </p>
                 </div>
                 @if (pay.requirement) {
                   <div>
                      <span class="text-xs text-slate-400 block mb-1">Requisito</span>
                      <p class="text-sm font-medium text-slate-800 dark:text-white flex items-center gap-2">
                         <span class="material-symbols-outlined text-primary">badge</span>
                         {{ pay.requirement }}
                      </p>
                   </div>
                 }
              </div>
            </div>
          }
          <!-- Bank Logos Grid -->
          @if (step().bankLogos) {
            <div class="mb-6 grid grid-cols-3 gap-4">
              @for (logo of step().bankLogos; track logo) {
                <div
                  class="flex items-center justify-center h-20 w-full transition-colors duration-300 shadow-sm"
                  [class.bg-[#009FB8]]="logo.includes('Farmacorp')" 
                  [class.dark:bg-[#00B4D8]/30]="logo.includes('Farmacorp')"
                  [class.rounded-[30%]]="logo.includes('Farmacorp')"
                  [class.p-3]="logo.includes('Farmacorp')"



                  [class.bg-dark-card]="!logo.includes('Farmacorp')" 
                  [class.dark:bg-[#222831]/30]="!logo.includes('Farmacorp')"
                  [class.rounded-xl]="!logo.includes('Farmacorp')"
                  [class.p-2]="!logo.includes('Farmacorp')">
                  
                  <img 
                    [src]="'logosbancos/' + logo" 
                    loading="lazy" 
                    class="max-w-full max-h-full object-contain" 
                    alt="Bank Logo">
                </div>
              }
            </div>
          }
          @if (step().imagenes) {
            <div class="mb-6 grid grid-cols-1 gap-4 justify-items-center">
              @if (step().id === 9) {
                 <!-- Step 9 Final Animation -->
                 <div class="w-full flex flex-col items-center"
                      [class.animate-bloom-entry]="animationTrigger()">
                    @for (imagen of step().imagenes; track imagen) {
                      <div class="w-64 h-64 relative mb-12 animate-float"> 
                        <img 
                          [src]="imagen === 'logoTuki.webp' ? imagen : 'imagenes/' + imagen" 
                          class="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                          alt="Final Logo">
                      </div>
                    }
                 </div>
              } @else {
                  <!-- Normal Images Grid -->
                  <div class="grid grid-cols-3 gap-4 w-full">
                    @for (imagen of step().imagenes; track imagen) {
                        @if(!imagen.includes('tukiboleta')){
                        <div class="flex items-center justify-center h-20 w-full">
                            <img [src]="'imagenes/' + imagen" loading="lazy" class="max-w-full max-h-full object-contain" alt="modulo 228">
                        </div>
                        }
                    }
                  </div>
                   <!-- Tuki Boleta Special Case -->
                   @if (step().imagenes?.[0] === 'tukiboleta.webp') {
                    <div class="flex items-center justify-center h-[360px] w-full mt-4">
                    <img
                        [src]="'imagenes/' + step().imagenes?.[0]"
                        class="max-w-full max-h-full object-contain"
                        alt="modulo 228">
                    </div>
                }
              }
            </div>
          }

          <!-- Dynamic Content: Simple Details List -->
          @if (step().details) {
            <div class="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-100 dark:border-white/5">
              <ul class="space-y-3">
                @for (detail of processedDetails(); track detail) {
                  <li class="flex gap-3 text-sm text-slate-700 dark:text-gray-300">
                    <span class="material-symbols-outlined text-primary text-lg flex-shrink-0">check_small</span>
                    <span [innerHTML]="detail"></span>
                  </li>
                }
              </ul>
            </div>
          }
          <!-- Dynamic Content: Locations -->
          @if (step().locations) {
            <div class="space-y-4 mb-6">
              @for (loc of step().locations; track loc.place) {
                <div class="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 flex gap-3">
                   <div class="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <span class="material-symbols-outlined">location_on</span>
                   </div>
                   <div>
                      <h4 class="font-bold text-slate-900 dark:text-white text-sm">{{ loc.place }}</h4>
                      <p class="text-xs text-slate-500 dark:text-gray-400 mt-1">{{ loc.notes }}</p>
                      <span class="inline-block mt-2 text-xs font-bold text-secondary bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                        Costo: {{ loc.cost }}
                      </span>
                   </div>
                </div>
              }
            </div>
          }

          <!-- Dynamic Content: Schedule Selector (Step 6) -->
          @if (step().id === 6) {
            <div class="mb-6">
              @if (scheduleData(); as data) {
                <app-schedule-selector 
                  [data]="data" 
                  (selected)="onGroupSelected($event)"
                />
              }
              @if (selectedGroup()) {
                <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg">
                  <p class="text-sm font-bold text-green-800 dark:text-green-100 flex items-center gap-2">
                    <span class="material-symbols-outlined">check_circle</span>
                    Has seleccionado: {{ selectedGroup() }}
                  </p>
                </div>
              }
            </div>
          }

          <!-- Dynamic Content: Final Requirements Checklist -->

          @if (step().requirements) {
            <div class="mb-6">
               <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                 <span class="material-symbols-outlined text-primary">folder_open</span>
                 Selecciona los documentos que tienes
               </h4>
               <div class="grid grid-cols-1 gap-2">
                 @for (req of step().requirements; track req) {
  <div 
    (click)="toggleRequirement(req)"
    class="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer group select-none"
    [class.border-primary]="isReqSelected(req)"
    [class.bg-primary/5]="isReqSelected(req)"
    [class.dark:bg-primary/10]="isReqSelected(req)"
    [class.border-slate-100]="!isReqSelected(req)"
    [class.dark:border-white/5]="!isReqSelected(req)"
    [class.hover:bg-slate-50]="!isReqSelected(req)"
    [class.dark:hover:bg-white/5]="!isReqSelected(req)">
    
    <div 
      class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
      [class.bg-primary]="isReqSelected(req)"
      [class.border-primary]="isReqSelected(req)"
      [class.border-slate-300]="!isReqSelected(req)"
      [class.dark:border-slate-600]="!isReqSelected(req)"
      [class.group-hover:border-primary]="!isReqSelected(req)">
      
      <span 
        class="material-symbols-outlined text-sm font-bold transition-all duration-200 transform"
        [class.text-white]="isReqSelected(req)"
        [class.opacity-100]="isReqSelected(req)"
        [class.scale-100]="isReqSelected(req)"
        [class.opacity-0]="!isReqSelected(req)"
        [class.scale-50]="!isReqSelected(req)">
        check
      </span>
    </div>

    <span 
      class="text-sm transition-colors duration-200"
      [class.text-slate-900]="isReqSelected(req)"
      [class.dark:text-white]="isReqSelected(req)"
      [class.font-medium]="isReqSelected(req)"
      [class.text-slate-700]="!isReqSelected(req)"
      [class.dark:text-gray-300]="!isReqSelected(req)">
      {{ req }}
    </span>
  </div>
}
               </div>
            </div>
          }

          <!-- Actions -->
          <div class="space-y-3 mt-8" [class.max-w-xs]="step().id === 9" [class.mx-auto]="step().id === 9">
            <button
              (click)="handleAction()"
              class="w-full h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl active:scale-95 bg-primary text-white shadow-primary/30">
              <span>{{ step().actionText }}</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

        </div>
        @if (step().id !== 9){
        <!-- FAQ Section -->
        <app-faq [items]="step().faq" />
        }
      </div>
      
      @if (step().id !== 9){
      <!-- Floating Chat Button: WhatsApp -->
      <button
        type="button"
        (click)="abrirWhatsapp()"
        class="fixed bottom-24 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30"
        aria-label="Unirse al grupo de WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </button>
      }

    </div>
  `,
  styles: []
})
export class StepViewerComponent implements OnInit {
  step = input.required<StepData>();
  next = output<void>();
  back = output<void>();
  private flowService = inject(FlowService);
  private horarioService = inject(HorarioService);
  selectedRequirements = signal<Set<string>>(new Set());
  // Schedule data
  scheduleData = signal<ScheduleData>(this.horarioService.getHorarioData());
  selectedGroup = signal<string | null>(null);

  // Theme and Animation signals
  isDarkMode = input<boolean>(false);
  animationTrigger = signal<boolean>(true);

  // ✅ Signal para total de pasos (dinámico)
  totalSteps = signal<number>(8);

  // ✅ Computed memoizado para el porcentaje de progreso
  progressPercentage = computed(() => {
    return Math.round((this.step().id / this.totalSteps()) * 100);
  });

  // ✅ Computed memoizado para procesar detalles (evita regex en cada render)
  processedDetails = computed(() => {
    const details = this.step().details;
    if (!details) return [];
    return details.map(text => this.highlightText(text));
  });

  constructor() {
    effect(() => {
      // Re-run when step 9 is active OR dark mode changes
      const dark = this.isDarkMode();
      if (this.step().id === 9) {
        this.restartAnimations();
      }
    });
  }

  toggleRequirement(req: string) {
    this.selectedRequirements.update(set => {
      const newSet = new Set(set);
      if (newSet.has(req)) {
        newSet.delete(req); // Si ya está, lo quita
      } else {
        newSet.add(req); // Si no está, lo agrega
      }
      return newSet;
    });
  }
  isReqSelected(req: string): boolean {
    return this.selectedRequirements().has(req);
  }
  // ✅ Cargar total de pasos dinámicamente
  async ngOnInit() {
    const steps = await this.flowService.getSteps();
    this.totalSteps.set(steps.length);

    // Load schedule data for step 6
    if (this.step().id === 6) {
      try {
        const horarioData = this.horarioService.getHorarioData();
        this.scheduleData.set(horarioData);
      } catch (error) {
        console.error('Error loading schedule data:', error);
      }
    }
  }

  onGroupSelected(groupName: string) {
    this.selectedGroup.set(groupName);
  }

  abrirWhatsapp(): void {
    const url = 'https://chat.whatsapp.com/IVznvrbX6nW7rfueJArv21';
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  highlightText(text: string): string {
    return text.replace(/(\d{9})/g, '<span class="text-primary dark:text-secondary font-mono font-bold">$1</span>')
      .replace(/Perfil UAGRM/g, '<a href="https://perfil.uagrm.edu.bo/estudiantes/default.php" target="_blank" rel="noopener noreferrer" class="text-primary dark:text-secondary font-bold underline cursor-pointer hover:text-blue-600 transition-colors">Perfil UAGRM</a>')
      .replace(/https:\/\/chat\.whatsapp\.com\/IVznvrbX6nW7rfueJArv21/g, '<a href="https://chat.whatsapp.com/IVznvrbX6nW7rfueJArv21" target="_blank" rel="noopener noreferrer" class="text-green-500 font-bold underline hover:text-green-600 transition-colors">unirte a nuestra comunidad</a>');
  }

  handleAction() {
    this.next.emit();
  }

  private restartAnimations() {
    this.animationTrigger.set(false);
    setTimeout(() => {
      this.animationTrigger.set(true);
      this.launchConfetti();
    }, 50);
  }

  private launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      const left = confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FEDB39', '#FF0000', '#000000']
      });

      const right = confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FEDB39', '#FF0000', '#000000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}
