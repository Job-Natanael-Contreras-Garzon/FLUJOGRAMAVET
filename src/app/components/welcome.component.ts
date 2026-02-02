import { Component, output } from '@angular/core';

@Component({
    selector: 'app-welcome',
    standalone: true,
    template: `
    <div class="relative h-screen w-full flex flex-col items-center justify-center p-6">
      <!-- Background Image & Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop" 
          alt="Veterinary Background" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/80 transition-all duration-300"></div>
      </div>

      <!-- Content Card -->
      <div class="relative z-10 w-full max-w-sm bg-white dark:bg-dark-card/90 dark:backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in-up border border-transparent dark:border-white/10 transition-colors duration-300">
        
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center relative transition-colors duration-300">
            <span class="material-symbols-outlined text-5xl text-primary">stethoscope</span>
            <!-- Decorative paw icon -->
            <div class="absolute bottom-2 right-2 w-8 h-8 bg-white dark:bg-[#333] rounded-full flex items-center justify-center shadow-sm border border-red-100 dark:border-transparent">
               <span class="material-symbols-outlined text-lg text-primary">pets</span>
            </div>
          </div>
        </div>

        <!-- Text -->
        <h1 class="text-2xl font-extrabold text-center text-slate-900 dark:text-white mb-4 leading-tight">
          Bienvenido/a a la carrera de Medicina Veterinaria y Zootecnia
        </h1>
        
        <div class="w-10 h-1 bg-red-100 dark:bg-red-900 mx-auto rounded-full mb-6"></div>

        <p class="text-center text-slate-500 dark:text-gray-400 text-sm font-medium mb-8 leading-relaxed">
          Para completar tu inscripción, hemos preparado una lista de verificación paso a paso. Asegúrate de tener todos tus documentos listos antes de continuar.
        </p>

        <!-- Button -->
        <button 
          (click)="start.emit()"
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all transform active:scale-95 group">
          <span>Comencemos</span>
          <span class="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>

      </div>
      
      <div class="relative z-10 mt-8 text-white/40 text-xs font-semibold tracking-widest uppercase">
        Facultad de Veterinaria
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
  `]
})
export class WelcomeComponent {
    start = output<void>();
}
