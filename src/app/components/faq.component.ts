import { Component, input, signal } from '@angular/core';
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
      
      <div class="space-y-10"> @for (item of items(); track item.question) {
          <div class="flex gap-4 animate-fade-in group items-start"> <div class="flex-shrink-0 relative mt-1"> <div 
                 (click)="openImage('personas/' + item.userimage)"
                 class="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-sm ring-2 ring-white dark:ring-transparent cursor-zoom-in hover:scale-105 transition-all duration-200 group/img relative">
                 
                 <img 
                   [src]="'personas/'+ item.userimage" 
                   alt="{{ item.user }}" 
                   loading="lazy" 
                   class="w-full h-full object-cover">
                 
                 <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                    <span class="material-symbols-outlined text-white opacity-0 group-hover/img:opacity-100 text-sm drop-shadow-md transition-opacity">zoom_in</span>
                 </div>
               </div>
            </div>

            <div class="flex-1">
              <div class="bg-white dark:bg-[#252525] p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-transparent shadow-sm inline-block max-w-[95%] transition-colors duration-300">
                <div class="flex justify-between items-baseline mb-1">
                    <span class="text-xs font-bold text-slate-900 dark:text-white">{{ item.user }}</span>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  {{ item.question }}
                </p>
              </div>

              @if (item.answer) {
                 <div class="mt-4 ml-2 flex gap-4 relative">
                    <div class="absolute left-[-24px] top-[-20px] bottom-6 w-6 border-l-2 border-b-2 border-dashed border-slate-300 dark:border-indigo-500/30 rounded-bl-2xl pointer-events-none"></div>

                    <div class="flex-shrink-0 relative z-10 mt-1">
                        <div 
                          (click)="openImage('personas/' + item.useranswerimage)"
                          class="w-10 h-10 rounded-lg bg-primary overflow-hidden shadow-sm cursor-zoom-in hover:scale-105 transition-all duration-200 group/img relative ring-1 ring-white/50 dark:ring-white/10">
                          
                          <img 
                            [src]="'personas/'+ item.useranswerimage" 
                            alt="{{ item.useranswer }}" 
                            loading="lazy" 
                            class="w-full h-full object-cover">
                            
                           <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                              <span class="material-symbols-outlined text-white opacity-0 group-hover/img:opacity-100 text-xs drop-shadow-md transition-opacity">zoom_in</span>
                           </div>
                        </div>
                    </div>

                    <div class="flex-1">
                       <div class="bg-indigo-50/50 dark:bg-indigo-500/10 p-3.5 rounded-2xl rounded-tl-none border border-indigo-100 dark:border-indigo-500/10 shadow-sm inline-block max-w-full">
                          <span class="text-xs font-bold text-indigo-600 dark:text-indigo-300 block mb-1">{{item.useranswer}} </span>
                          <p class="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
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

      <footer class="mt-12 py-6 text-center border-t border-slate-100 dark:border-white/5 transition-colors">
        <a href="#" class="text-xs text-slate-400 dark:text-gray-500 hover:text-indigo-500 transition-colors">Copyright © 2026 Urizar Odessa <3. Todos los derechos reservados.</a>
      </footer>

    </div>

    @if (selectedImage()) {
        <div 
            class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in-fast"
            (click)="closeImage()">
            
            <div class="relative animate-zoom-center max-w-4xl max-h-[90vh] w-auto h-auto shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10" (click)="$event.stopPropagation()">
                <img 
                    [src]="selectedImage()" 
                    class="w-full h-full object-contain max-h-[85vh] block"
                >
                <button (click)="closeImage()" class="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full p-2 transition-all backdrop-blur-sm">
                    <span class="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
        </div>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    .animate-fade-in-fast {
        animation: fadeIn 0.2s ease-out forwards;
    }

    @keyframes zoomCenter {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .animate-zoom-center {
        animation: zoomCenter 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
  `]
})
export class FaqComponent {
  items = input<FaqItem[]>([]);

  selectedImage = signal<string | null>(null);

  openImage(src: string) {
    this.selectedImage.set(src);
    document.body.style.overflow = 'hidden';
  }

  closeImage() {
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }
}