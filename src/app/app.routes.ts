import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { StepComponent } from './components/step/step';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'paso/:id', component: StepComponent },
    { path: '**', redirectTo: '' }
];
