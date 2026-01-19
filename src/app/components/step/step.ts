import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlowService, Step } from '../../services/flow';
import { ProgressbarComponent } from '../progressbar/progressbar';
import { FaqSectionComponent } from '../faq-section/faq-section';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressbarComponent, FaqSectionComponent],
  templateUrl: './step.html',
  styleUrl: './step.scss',
})
export class StepComponent implements OnInit, OnDestroy {
  step: Step | undefined;
  progress: number = 0;
  private sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flowService: FlowService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.flowService.setCurrentStep(id);
      this.loadStep(id);
    });

    // Also subscribe to service changes if needed, but route param should drive it
    // Update progress
    this.progress = this.flowService.getProgressPercentage();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  loadStep(id: number) {
    this.step = this.flowService.getStep(id);
    this.progress = this.flowService.getProgressPercentage(); // Recalculate based on step logic
    // Override progress calculation for smoother visual? 
    // FlowService logic: (current - 1) / total * 100.
    // Step 1: 0%. Step 5: 80%.
    // Adjust: Step 1 should show 10% maybe?
    // Let's stick to service logic or simple math here.
    const total = this.flowService.getSteps().length;
    this.progress = Math.round((id / total) * 100);
  }

  goBack() {
    const currentId = this.step?.id || 1;
    if (currentId > 1) {
      this.router.navigate(['/paso', currentId - 1]);
    } else {
      this.router.navigate(['/']);
    }
  }

  advance() {
    this.flowService.completeCurrentStepAndAdvance();
    const currentId = this.step?.id || 0;
    const nextId = currentId + 1;
    const total = this.flowService.getSteps().length;

    if (nextId <= total) {
      this.router.navigate(['/paso', nextId]);
    } else {
      // Finished
      // Render confirmation or specialized flow
      alert('¡Felicidades! Has completado todos los pasos.');
    }
  }
}
