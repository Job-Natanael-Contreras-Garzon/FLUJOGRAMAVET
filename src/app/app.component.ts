import { Component, signal, effect, inject, computed } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome.component';
import { StepViewerComponent } from './components/step-viewer.component';
import { FlowService, StepData } from './services/flow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WelcomeComponent, StepViewerComponent],
  template: `
    <main class="w-full min-h-screen relative overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      
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
  currentStepId = signal<number>(0);
  isDarkMode = signal<boolean>(false);
  private _doc = inject(DOCUMENT);
  private flowService = inject(FlowService);

  private stepsData = signal<StepData[]>([]);

  currentStepData = computed(() => {
    return this.stepsData().find(s => s.id === this.currentStepId()) || null;
  });

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);

    // Load steps async
    this.loadSteps();

    effect(() => {
      if (this.isDarkMode()) {
        this._doc.documentElement.classList.add('dark');
      } else {
        this._doc.documentElement.classList.remove('dark');
      }
    });
  }

  private async loadSteps() {
    const steps = await this.flowService.getSteps();
    this.stepsData.set(steps);
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
  }

  goToStep(stepId: number) {
    this.currentStepId.set(stepId);
  }

  handleNext(nextStepId: number | null) {
    if (nextStepId !== null) {
      this.flowService.saveProgress(nextStepId);
      this.currentStepId.set(nextStepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.finish();
    }
  }

  handleBack() {
    const current = this.currentStepId();
    if (current > 1) {
      this.currentStepId.set(current - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.currentStepId.set(0);
    }
  }

  finish() {
    this.flowService.clearProgress();
    this.currentStepId.set(0);
  }
}