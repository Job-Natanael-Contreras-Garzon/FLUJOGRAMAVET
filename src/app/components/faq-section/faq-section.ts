import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqItem } from '../../services/flow';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSectionComponent {
  @Input() questions: FaqItem[] = [];
}
