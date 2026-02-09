import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FaqItem {
  initials: string;
  user: string;
  time: string;
  question: string;
  answer?: string;
  useranswer?: string;
  userimage?: string;
  useranswerimage?: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-6">Preguntas Frecuentes</h3>
      
      <div class="space-y-6">
        
        @for (item of items(); track item.question) {
          <!-- Main Question -->
          <div class="flex gap-3 animate-fade-in group">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-[10px] font-bold shadow-sm ring-2 ring-white dark:ring-transparent">
              <img [src]="'personas/'+ item.userimage" alt="{{ item.user }}" loading="lazy" class="rounded-full">
            </div>
            <div class="flex-1">
              <div class="bg-white dark:bg-dark-card p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 shadow-sm inline-block max-w-[90%] transition-colors duration-300">
                <span class="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">{{ item.user }}</span>
                <p class="text-xs text-slate-600 dark:text-gray-400 leading-snug">
                  {{ item.question }}
                </p>
              </div>

              <!-- Nested Answer (Thread Style) -->
              @if (item.answer) {
                 <div class="mt-4 flex gap-3 relative before:absolute before:left-[-20px] before:top-[-20px] before:h-[40px] before:w-[12px] before:border-l-2 before:border-b-2 before:border-slate-200 dark:before:border-slate-700 before:rounded-bl-xl">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                       <img [src]="'personas/'+ item.useranswerimage" alt="{{ item.useranswer }}" loading="lazy" class="rounded-full">
                    </div>
                    <div class="flex-1">
                       <div class="bg-red-50 dark:bg-red-900/10 p-3 rounded-2xl rounded-tl-none border border-red-100 dark:border-red-900/20 shadow-sm inline-block max-w-full">
                          <span class="text-xs font-bold text-primary block mb-0.5">{{item.useranswer}}</span>
                          <p class="text-xs text-slate-700 dark:text-gray-300 leading-snug whitespace-pre-line">
                             {{ item.answer }}
                          </p>
                       </div>
                       
                    </div>
                 </div>
              }
            </div>
          </div>
        }

      </div>

      <footer class="mt-8 py-4 text-center border-t border-slate-100 dark:border-white/5 transition-colors">
        <a href="#" class="text-xs text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">Copyright © 2026 TUKI-VET. Todos los derechos reservados.</a>
      </footer>

    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `]
})
export class FaqComponent {
  items = input<FaqItem[]>([]);
}
