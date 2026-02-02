import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FaqItem {
  initials: string;
  user: string;
  time: string;
  question: string;
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
          <div class="flex gap-3 animate-fade-in">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-white dark:ring-transparent">
              {{ item.initials }}
            </div>
            <div class="flex-1">
              <div class="bg-white dark:bg-dark-card p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 shadow-sm inline-block max-w-[90%] transition-colors duration-300">
                <span class="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">{{ item.user }}</span>
                <p class="text-xs text-slate-600 dark:text-gray-400 leading-snug">
                  {{ item.question }}
                </p>
              </div>
              <div class="flex items-center gap-4 mt-1.5 ml-2">
                <span class="text-[10px] text-slate-400 dark:text-gray-500 font-medium">Hace {{ item.time }}</span>
                <button class="text-[10px] font-bold text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Responder</button>
                <button class="text-[10px] font-bold text-slate-500 dark:text-gray-400 hover:text-primary transition-colors">Me gusta</button>
              </div>
            </div>
          </div>
        }

      </div>

      <div class="mt-6 text-center">
        <button class="text-xs font-bold text-primary hover:text-red-700 transition-colors">
          Ver más comentarios
        </button>
      </div>

      <footer class="mt-8 py-4 text-center border-t border-slate-100 dark:border-white/5 transition-colors">
        <a href="#" class="text-xs text-slate-400 dark:text-gray-500 hover:text-primary transition-colors">¿Necesitas ayuda?</a>
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
