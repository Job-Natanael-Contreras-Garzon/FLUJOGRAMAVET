import { Component, signal, effect, inject, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { WelcomeComponent } from './components/welcome.component';
import { StepViewerComponent } from './components/step-viewer.component';
import { FlowService, StepData } from './services/flow';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, WelcomeComponent, StepViewerComponent],
    template: `
    <main class="w-full min-h-screen relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      
      <!-- Dark Mode Toggle Button (Floating) -->
      <button 
        (click)="toggleDarkMode()"
        class="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-slate-800 dark:text-white dark:bg-black/20 hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode">
        @if (isDarkMode()) {
          <span class="material-symbols-outlined">light_mode</span>
        } @else {
          <span class="material-symbols-outlined">dark_mode</span>
        }
      </button>

      @if (currentStepId() === 0) {
        <app-welcome (start)="goToStep(1)" />
      } @else {
        @if (currentStepData(); as data) {
           <app-step-viewer 
             [step]="data" 
             (next)="handleNext(data.nextStep)" 
             (back)="handleBack()" 
           />
        }
      }

    </main>
  `,
})
export class AppComponent {
    currentStepId = signal<number>(0); // 0 = Welcome, 1-n = Steps (dynamic from FlowService)
    isDarkMode = signal<boolean>(false);
    private _doc = inject(DOCUMENT);
    private flowService = inject(FlowService);

    // Data provided by FlowService
    private stepsData: StepData[] = this.flowService.getSteps();

    currentStepData = computed(() => {
        return this.stepsData.find(s => s.id === this.currentStepId()) || null;
    });

    constructor() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);

        effect(() => {
            const isDark = this.isDarkMode();
            if (isDark) {
                this._doc.documentElement.classList.add('dark');
            } else {
                this._doc.documentElement.classList.remove('dark');
            }
        });
    }

    toggleDarkMode() {
        this.isDarkMode.update(v => !v);
    }

    goToStep(stepId: number) {
        this.currentStepId.set(stepId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleNext(nextStepId: number | null) {
        if (nextStepId) {
            this.goToStep(nextStepId);
        } else {
            this.finish();
        }
    }

    handleBack() {
        const current = this.currentStepId();
        if (current > 0) {
            this.goToStep(current - 1);
        }
    }

    finish() {
        alert('¡Felicidades! Has completado todos los pasos para tu inscripción.');
        this.goToStep(0);
    }
}
