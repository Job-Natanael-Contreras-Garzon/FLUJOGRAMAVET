import { Injectable } from '@angular/core';
import { FaqItem } from '../components/faq.component';

export interface StepData {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  details?: string[];
  paymentDetails?: {
    amount: string;
    method: string;
    requirement?: string;
  };
  bankLogos?: string[];
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
  imagenes?: string[];
}

export type { FaqItem };

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private readonly STORAGE_KEY = 'vet_flow_progress';
  private stepsCache: StepData[] | null = null;

  constructor() { }

  async getSteps(): Promise<StepData[]> {
    if (this.stepsCache) {
      return this.stepsCache;
    }

    // Lazy load steps data
    const steps = await import('./flow.json');
    this.stepsCache = steps.default as StepData[];
    return this.stepsCache;
  }

  async getStep(id: number): Promise<StepData | undefined> {
    const steps = await this.getSteps();
    return steps.find(s => s.id === id);
  }

  saveProgress(stepId: number): void {
    localStorage.setItem(this.STORAGE_KEY, stepId.toString());
  }

  getProgress(): number {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  }

  clearProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}