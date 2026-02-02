import { Component, signal, effect, inject, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { WelcomeComponent } from './components/welcome.component';
import { StepViewerComponent, StepData } from './components/step-viewer.component';

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
    currentStepId = signal<number>(0); // 0 = Welcome, 1-7 = Steps
    isDarkMode = signal<boolean>(false);
    private _doc = inject(DOCUMENT);

    // Data provided by user
    private stepsData: StepData[] = [
        {
            id: 1,
            title: "Verificación de código de registro",
            description: "Revisa el correo electrónico asociado a tu formulario del CUP. Busca un código de 9 dígitos.",
            details: [
                "Ejemplo de código: 222085444",
                "Verifica bandeja de entrada y spam"
            ],
            actionText: "✓ Sí, recibí mi código",
            nextStep: 2,
            faq: [
                { initials: "AM", user: "Ana M.", time: "2 horas", question: "¿Qué hago si no recibí el código de registro?" },
                { initials: "CR", user: "Carlos R.", time: "1 día", question: "¿El código expira después de cierto tiempo?" }
            ]
        },
        {
            id: 2,
            title: "Acceso al sistema",
            description: "Ingresa al portal universitario con tus credenciales",
            details: [
                "Enlace: uagrm_login",
                "Registro: Tu código de 9 dígitos (ej: 222085444)",
                "Contraseña: Número de tu carnet de identidad"
            ],
            actionText: "Ingresar al sistema",
            nextStep: 3,
            faq: [
                { initials: "LT", user: "Lucía T.", time: "3 horas", question: "¿Qué pasa si olvidé mi número de carnet?" },
                { initials: "JM", user: "Juan M.", time: "5 horas", question: "¿El enlace funciona en móviles?" }
            ]
        },
        {
            id: 3,
            title: "Cambio de contraseña",
            description: "Actualiza tu contraseña en el perfil universitario",
            details: [
                "Inicia sesión con tus credenciales actuales",
                "Ve al menú de usuario",
                "Selecciona 'Cambiar contraseña'",
                "Guarda los cambios con una nueva contraseña segura"
            ],
            actionText: "Contraseña actualizada",
            nextStep: 4,
            faq: [
                { initials: "PL", user: "Pedro L.", time: "1 día", question: "¿Qué requisitos debe cumplir la nueva contraseña?" },
                { initials: "MR", user: "María R.", time: "2 días", question: "¿Puedo revertir el cambio de contraseña?" }
            ]
        },
        {
            id: 4,
            title: "Pago de matrícula",
            description: "Realiza el pago obligatorio de matrícula",
            paymentDetails: {
                amount: "300 Bs",
                method: "Efectivo en entidades financieras autorizadas",
                requirement: "Presentar carnet de identidad"
            },
            actionText: "✓ Pago de matrícula realizado",
            nextStep: 5,
            faq: [
                { initials: "RS", user: "Roberto S.", time: "4 horas", question: "¿Qué entidades financieras están autorizadas?" },
                { initials: "VG", user: "Valeria G.", time: "1 día", question: "¿Puedo pagar con tarjeta de débito?" }
            ]
        },
        {
            id: 5,
            title: "Aporte facultativo",
            description: "Realiza el pago del aporte facultativo",
            paymentDetails: {
                amount: "1500 Bs",
                method: "Caja de la facultad de Medicina Veterinaria",
                requirement: "Presentar recibo de pago de matrícula"
            },
            actionText: "✓ Aporte facultativo realizado",
            nextStep: 6,
            faq: [
                { initials: "DC", user: "Diego C.", time: "6 horas", question: "¿Es obligatorio este pago para inscribirme?" },
                { initials: "KL", user: "Karen L.", time: "12 horas", question: "¿Dónde queda exactamente la caja de la facultad?" }
            ]
        },
        {
            id: 6,
            title: "Obtención de hojita de inscripción",
            description: "Consigue tu documento físico para continuar con la inscripción",
            locations: [
                { place: "Fotocopia de Veterinaria", cost: "2 × 50 ctvs", notes: "Horario: 8:00 - 18:00" },
                { place: "Centro Interno de Veterinaria", cost: "Gratis", notes: "Presentar comprobante de pagos" }
            ],
            actionText: "✓ Tengo mi hojita de inscripción",
            nextStep: 7,
            faq: [
                { initials: "FM", user: "Fernanda M.", time: "3 horas", question: "¿Puedo imprimir la hojita desde casa?" },
                { initials: "ER", user: "Eduardo R.", time: "1 día", question: "¿Qué pasa si pierdo la hojita después de conseguirla?" }
            ]
        },
        {
            id: 7,
            title: "¡Listo para inscribirte!",
            description: "Dirígete a la facultad con estos documentos:",
            requirements: [
                "Hojita de inscripción",
                "Carnet de identidad original",
                "Recibos de pagos",
                "Código de registro"
            ],
            actionText: "Finalizar trámite",
            nextStep: null,
            faq: [
                { initials: "AP", user: "Antonio P.", time: "5 horas", question: "¿Hay horario específico para presentar documentos?" },
                { initials: "SL", user: "Sofía L.", time: "2 días", question: "¿Puedo delegar la entrega a un familiar?" }
            ]
        }
    ];

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
