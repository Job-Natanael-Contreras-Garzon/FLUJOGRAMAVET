import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent, FaqItem } from './faq.component';

export interface StepData {
    id: number;
    title: string;
    description: string;
    details?: string[];
    paymentDetails?: {
        amount: string;
        method: string;
        requirement?: string;
    };
    requirements?: string[];
    locations?: {
        place: string;
        cost: string;
        notes: string;
    }[];
    actionText: string;
    nextStep: number | null;
    faq: FaqItem[];
    icon?: string;
}

@Component({
    selector: 'app-step-viewer',
    standalone: true,
    imports: [CommonModule, FaqComponent],
    template: `
    <div class="min-h-screen flex flex-col bg-[#f8f6f6] dark:bg-dark-bg transition-colors duration-300">
      
      <!-- Header -->
      <header class="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md sticky top-0 z-20 px-4 py-3 flex items-center shadow-sm dark:shadow-black/20 border-b border-transparent dark:border-white/5 transition-colors duration-300">
        <button (click)="back.emit()" class="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors" aria-label="Volver atrás">
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 class="flex-1 text-center font-bold text-slate-800 dark:text-white text-lg pr-8 truncate">
          Paso {{ step().id }}: {{ step().title }}
        </h2>
      </header>

      <div class="flex-1 max-w-md mx-auto w-full p-4 pb-24">
        
        <!-- Progress Bar -->
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

        <!-- Main Card -->
        <div class="bg-white dark:bg-dark-card rounded-[2rem] shadow-sm p-6 mb-8 border border-slate-100 dark:border-white/5 transition-colors duration-300 relative overflow-hidden">
          
          <!-- Decorative Background for icon area -->
          <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-red-50 to-transparent dark:from-white/5 dark:to-transparent opacity-50 pointer-events-none"></div>

          <!-- Icon -->
          <div class="w-20 h-20 bg-white dark:bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-sm border border-slate-100 dark:border-white/10">
             <span class="material-symbols-outlined text-4xl text-primary">{{ getIcon() }}</span>
          </div>

          <!-- Title & Description -->
          <h3 class="text-center text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
            {{ step().title }}
          </h3>
          <p class="text-center text-slate-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
            {{ step().description }}
          </p>

          <!-- Dynamic Content: Simple Details List -->
          @if (step().details) {
            <div class="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-100 dark:border-white/5">
              <ul class="space-y-3">
                @for (detail of step().details; track detail) {
                  <li class="flex gap-3 text-sm text-slate-700 dark:text-gray-300">
                    <span class="material-symbols-outlined text-primary text-lg flex-shrink-0">check_small</span>
                    <span [innerHTML]="highlightText(detail)"></span>
                  </li>
                }
              </ul>
            </div>
          }

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

          <!-- Dynamic Content: Final Requirements Checklist -->
          @if (step().requirements) {
            <div class="mb-6">
               <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                 <span class="material-symbols-outlined text-primary">folder_open</span>
                 Documentos Requeridos
               </h4>
               <div class="grid grid-cols-1 gap-2">
                 @for (req of step().requirements; track req) {
                   <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                      <div class="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center group-hover:border-primary transition-colors">
                        <span class="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100">check</span>
                      </div>
                      <span class="text-sm text-slate-700 dark:text-gray-300">{{ req }}</span>
                   </label>
                 }
               </div>
            </div>
          }

          <!-- Actions -->
          <div class="space-y-3 mt-8">
            <button 
              (click)="handleAction()"
              class="w-full h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl active:scale-95 bg-primary text-white shadow-primary/30">
              <span>{{ step().actionText }}</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>

            <!-- Secondary Action for Step 1 Only (Simulation) -->
            @if (step().id === 1) {
              <button 
                class="w-full h-14 rounded-full border-2 flex items-center justify-center gap-2 transition-all duration-300 font-bold text-base box-border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5">
                <span class="material-symbols-outlined text-xl">close</span>
                No
              </button>
            }
          </div>

        </div>

        <!-- FAQ Section -->
        <app-faq [items]="step().faq" />

      </div>

      <!-- Floating Chat Button -->
      <button class="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-red-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30">
        <span class="material-symbols-outlined text-2xl">chat_bubble</span>
      </button>

    </div>
  `,
    styles: []
})
export class StepViewerComponent {
    step = input.required<StepData>();
    next = output<void>();
    back = output<void>();

    progressPercentage = computed(() => {
        // Assuming 7 steps total based on input data
        const totalSteps = 7;
        return Math.round((this.step().id / totalSteps) * 100);
    });

    getIcon(): string {
        const map: Record<number, string> = {
            1: 'mark_email_read',
            2: 'login',
            3: 'lock_reset',
            4: 'payments',
            5: 'account_balance_wallet',
            6: 'print',
            7: 'school'
        };
        return map[this.step().id] || 'info';
    }

    highlightText(text: string): string {
        // Simple regex to bold numbers or codes in brackets [code] or just digits
        // Replacing [text] with yellow highlight span
        return text.replace(/(\d{9})/g, '<span class="text-primary dark:text-secondary font-mono font-bold">$1</span>')
            .replace(/uagrm_login/g, '<span class="text-primary dark:text-secondary font-bold underline cursor-pointer">uagrm_login</span>');
    }

    handleAction() {
        this.next.emit();
    }
}
