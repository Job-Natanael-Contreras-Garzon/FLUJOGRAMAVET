import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface FaqItem {
  initials: string;
  user: string;
  time: string;
  question: string;
}

export interface PaymentDetails {
  amount: string;
  method: string;
  requirement: string;
}

export interface LocationDetail {
  place: string;
  cost: string;
  notes: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  details?: string[];
  actionText: string;
  nextStep: number | null;
  faq?: FaqItem[];
  paymentDetails?: PaymentDetails;
  locations?: LocationDetail[];
  requirements?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private readonly STORAGE_KEY = 'vet_flow_progress';

  private steps: Step[] = [
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
        {
          initials: "AM",
          user: "Ana M.",
          time: "2 horas",
          question: "¿Qué hago si no recibí el código de registro?"
        },
        {
          initials: "CR",
          user: "Carlos R.",
          time: "1 día",
          question: "¿El código expira después de cierto tiempo?"
        }
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
        {
          initials: "LT",
          user: "Lucía T.",
          time: "3 horas",
          question: "¿Qué pasa si olvidé mi número de carnet?"
        },
        {
          initials: "JM",
          user: "Juan M.",
          time: "5 horas",
          question: "¿El enlace funciona en móviles?"
        }
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
        {
          initials: "PL",
          user: "Pedro L.",
          time: "1 día",
          question: "¿Qué requisitos debe cumplir la nueva contraseña?"
        },
        {
          initials: "MR",
          user: "María R.",
          time: "2 días",
          question: "¿Puedo revertir el cambio de contraseña?"
        }
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
        {
          initials: "RS",
          user: "Roberto S.",
          time: "4 horas",
          question: "¿Qué entidades financieras están autorizadas?"
        },
        {
          initials: "VG",
          user: "Valeria G.",
          time: "1 día",
          question: "¿Puedo pagar con tarjeta de débito?"
        }
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
        {
          initials: "DC",
          user: "Diego C.",
          time: "6 horas",
          question: "¿Es obligatorio este pago para inscribirme?"
        },
        {
          initials: "KL",
          user: "Karen L.",
          time: "12 horas",
          question: "¿Dónde queda exactamente la caja de la facultad?"
        }
      ]
    },
    {
      id: 6,
      title: "Obtención de hojita de inscripción",
      description: "Consigue tu documento físico para continuar con la inscripción",
      locations: [
        {
          place: "Fotocopia de Veterinaria",
          cost: "2 × 50 ctvs",
          notes: "Horario: 8:00 - 18:00"
        },
        {
          place: "Centro Interno de Veterinaria",
          cost: "Gratis",
          notes: "Presentar comprobante de pagos"
        }
      ],
      actionText: "✓ Tengo mi hojita de inscripción",
      nextStep: 7,
      faq: [
        {
          initials: "FM",
          user: "Fernanda M.",
          time: "3 horas",
          question: "¿Puedo imprimir la hojita desde casa?"
        },
        {
          initials: "ER",
          user: "Eduardo R.",
          time: "1 día",
          question: "¿Qué pasa si pierdo la hojita después de conseguirla?"
        }
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
        {
          initials: "AP",
          user: "Antonio P.",
          time: "5 horas",
          question: "¿Hay horario específico para presentar documentos?"
        },
        {
          initials: "SL",
          user: "Sofía L.",
          time: "2 días",
          question: "¿Puedo delegar la entrega a un familiar?"
        }
      ]
    }
  ];

  private currentStepIdSubject = new BehaviorSubject<number>(1);
  public currentStepId$ = this.currentStepIdSubject.asObservable();

  private completedStepsSubject = new BehaviorSubject<Set<number>>(new Set());
  public completedSteps$ = this.completedStepsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadProgress();
  }

  getSteps(): Step[] {
    return this.steps;
  }

  getCurrentStep() {
    return this.steps.find(s => s.id === this.currentStepIdSubject.value);
  }

  getStep(id: number) {
    return this.steps.find(s => s.id === id);
  }

  markStepCompleted(stepId: number) {
    const currentCompleted = this.completedStepsSubject.value;
    currentCompleted.add(stepId);
    this.completedStepsSubject.next(currentCompleted);
    this.saveProgress();
  }

  setCurrentStep(stepId: number) {
    if (this.steps.find(s => s.id === stepId)) {
      this.currentStepIdSubject.next(stepId);
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    }
  }

  completeCurrentStepAndAdvance() {
    const currentId = this.currentStepIdSubject.value;
    this.markStepCompleted(currentId);

    const currentStep = this.getStep(currentId);
    if (currentStep && currentStep.nextStep !== null) {
      this.setCurrentStep(currentStep.nextStep);
    }
  }

  isStepCompleted(stepId: number): boolean {
    return this.completedStepsSubject.value.has(stepId);
  }

  private saveProgress() {
    if (isPlatformBrowser(this.platformId)) {
      const data = {
        completed: Array.from(this.completedStepsSubject.value),
        current: this.currentStepIdSubject.value
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  private loadProgress() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.completed && Array.isArray(parsed.completed)) {
            this.completedStepsSubject.next(new Set(parsed.completed));
          }
          if (parsed.current) {
            if (this.steps.find(s => s.id === parsed.current)) {
              this.currentStepIdSubject.next(parsed.current);
            }
          }
        } catch (e) {
          console.error('Failed to load progress', e);
        }
      }
    }
  }

  getProgressPercentage(): number {
    const total = this.steps.length;
    const current = this.currentStepIdSubject.value;
    return Math.min(((current) / total) * 100, 100);
  }
}
