import { Component, output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="relative h-screen w-full flex flex-col items-center justify-center p-6">
      <!-- Background Image & Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="/imagenes/herofondo.webp"
          alt="Veterinary Background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm dark:bg-black/80 transition-all duration-300"></div>
      </div>

      <!-- Content Card -->
      <div class="relative z-10 w-full max-w-sm bg-white dark:bg-dark-card/90 dark:backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in-up border border-transparent dark:border-white/10 transition-colors duration-300">

        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <div class="relative w-32 h-32 transition-transform duration-300 hover:scale-110">
            <img
               src="/logoTuki.webp"
               alt="Tuki Logo"
               class="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        <!-- Text -->
        <h1 class="text-2xl font-extrabold text-center text-slate-900 dark:text-white mb-4 leading-tight">
          🎉 Bienvenid@ a Medicina Veterinaria y Zootecnia
        </h1>

        <div class="w-10 h-1 bg-red-100 dark:bg-red-900 mx-auto rounded-full mb-6"></div>

        <p class="text-center text-slate-500 dark:text-gray-400 text-sm font-medium mb-8 leading-relaxed">
          Esta TukiLista está aquí para guiarte paso a paso en tu proceso de ingreso.
          <br class="hidden sm:block" />
          Sigue cada punto con atención y cumple todos los requisitos.
        </p>

        <!-- Button -->
        <button
          (click)="start.emit()"
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-red-500/30 dark:shadow-red-900/50 transition-all transform active:scale-95 group">
          <span>✨ ¡Tuki-éxitos! Comencemos ✨</span>
        </button>

      </div>

      <div class="relative z-10 mt-8 text-white/40 text-xs font-semibold tracking-widest uppercase">
        Facultad de Ciencias Veterinarias
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
