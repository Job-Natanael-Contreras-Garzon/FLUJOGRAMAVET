import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlowService, StepData } from '../../services/flow';
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
  step: StepData | undefined;
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
      this.loadStep(id);
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  loadStep(id: number) {
    this.step = this.flowService.getStep(id);
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
    const nextId = (this.step?.nextStep) || null;
    const total = this.flowService.getSteps().length;

    if (nextId && nextId <= total) {
      this.router.navigate(['/paso', nextId]);
    } else {
      // Finished
      alert('¡Felicidades! Has completado todos los pasos.');
      this.router.navigate(['/']);
    }
  }
}
