import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './progressbar.html',
  styleUrl: './progressbar.scss',
})
export class ProgressbarComponent {
  @Input() progress: number = 0;
}
