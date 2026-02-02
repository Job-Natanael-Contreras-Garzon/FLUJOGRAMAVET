import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { FaqItem } from '../components/faq.component';

export type { FaqItem };

export interface StepData {
  id: number;
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
}

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private readonly STORAGE_KEY = 'vet_flow_progress';

  private steps: StepData[] = [
    {
      id: 1,
      title: "Habilitación del registro",
      description: "Revisa el correo que usaste en tu preinscripción. Recibirás un código de 9 dígitos (ej.: 222084006) para habilitar tu registro.",
      details: [
        "📧 Revisa el correo de tu preinscripción",
        "🔢 Recibirás un código de 9 dígitos (ej.: 222084006)"
      ],
      actionText: "TUKI-LISTO",
      nextStep: 2,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Qué es ese código?", answer: "Es tu número único de estudiante, te identifica dentro de la UAGRM 🎓" },
        { initials: "📩", user: "Soporte", time: "Hace un momento", question: "¿No recibiste el correo?", answer: "Revisa tu SPAM o verifica que el correo registrado sea correcto." },
        { initials: "📍", user: "Info", time: "Hace un momento", question: "¿Dónde preguntar?", answer: "En Dirección de Carrera de la Facultad de Ciencias Veterinarias o en el CPD facultativo." }
      ]
    },
    {
      id: 2,
      title: "Activa tu perfil universitario",
      description: "Ingresa al link 🔗, selecciona la opción Estudiante y completa los datos",
      details: [
        "Enlace: uagrm_login",
        "🆔 Registro: 218007663",
        "🔑 Contraseña: tu número de carnet de identidad"
      ],
      actionText: "TUKI-LISTO",
      nextStep: 3,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Tu carnet está vencido?", answer: "No afecta en nada tu proceso de ingreso ✅" },
        { initials: "🌐", user: "Soporte", time: "Hace un momento", question: "¿La página no carga?", answer: "Verifica tu conexión a Internet o intenta ingresar desde otro dispositivo 📱💻" }
      ]
    },
    {
      id: 3,
      title: "🔒 Cambia tu contraseña (obligatorio)",
      description: "Es fundamental para la seguridad de tu perfil.",
      details: [
        "1️⃣ Ingresa al Menú",
        "2️⃣ Selecciona Cambiar contraseña",
        "3️⃣ Crea una nueva contraseña y guarda los cambios"
      ],
      actionText: "TUKI-LISTO",
      nextStep: 4,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Qué pasa si no cambio mi contraseña?", answer: "No podrás agarrar materias en el semestre regular ❌" },
        { initials: "🔑", user: "Consejo Tuki", time: "Hace un momento", question: "¿Qué contraseña puedo usar?", answer: "Debe incluir: ✔ letras mayúsculas y minúsculas, ✔ números, ✔ signos (recomendado)" },
        { initials: "🔄", user: "Soporte", time: "Hace un momento", question: "¿Olvidaste tu contraseña?", answer: "Ingresa a tu perfil universitario, haz clic en “Olvidé mi contraseña” y sigue el proceso de recuperación." }
      ]
    },
    {
      id: 4,
      title: "💳 Realiza tus Tuki-pagos",
      description: "🏦 Cancela tu matrícula en las entidades financieras habilitadas",
      bankLogos: [
        "LogoEcofuturo.svg",
        "LogoProdem.png",
        "logo-fie.svg",
        "logoCopLaMerced.png",
        "logoCrecer.png",
        "logoFarmacorp.webp",
        "logoJNazareno.webp",
        "logoSMporrez.png"
      ],
      details: [
        "🆔 Presenta tu carnet de identidad y número de registro",
        "⚠️ Pago único y en efectivo"
      ],
      paymentDetails: {
        amount: "300 Bs",
        method: "Efectivo en entidades financieras autorizadas",
        requirement: "Presentar carnet de identidad"
      },
      actionText: "TUKI-LISTO",
      nextStep: 5,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Por qué es importante cancelar este pago?", answer: "Incluye tus análisis médicos y revisiones que realizarás durante la carrera 🩺" },
        { initials: "🚫", user: "Advertencia", time: "Hace un momento", question: "¿Qué pasa si no cancelo?", answer: "No podrás continuar con la inscripción de materias." },
        { initials: "🧾", user: "Info", time: "Hace un momento", question: "¿Por qué necesito la boleta de pago?", answer: "El CPD la solicita al momento de inscribir tus materias." }
      ]
    },
    {
      id: 5,
      title: "💳 Realiza tus Tuki-pagos",
      description: "🏫 Aporte facultativo: Dirígete a la Facultad de Ciencias Veterinarias, sector Cajas.",
      paymentDetails: {
        amount: "1.500 Bs",
        method: "⚠️ Pago en efectivo",
        requirement: "Presentar recibo de pago de matrícula"
      },
      actionText: "TUKI-LISTO",
      nextStep: 6,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Por qué el monto es elevado?", answer: "Porque es un pago único al inicio de la carrera. Durante los 5 años no volverás a cancelarlo ✅" },
        { initials: "📲", user: "Soporte", time: "Hace un momento", question: "¿Puedo pagar por QR?", answer: "No. El pago debe realizarse solo en efectivo, ya que el personal verifica que el monto y los datos sean correctos." },
        { initials: "🏥", user: "Info", time: "Hace un momento", question: "¿En qué se utiliza este dinero?", answer: "Contribuye a la compra de insumos para prácticas y materiales de laboratorio de la facultad 🧪" }
      ]
    },
    {
      id: 6,
      title: "📝 Tuki-inscripción",
      description: "Obtén tu hojita de inscripción en:",
      locations: [
        { place: "Fotocopiadora", cost: "2x50 ctv", notes: "Compra tu hojita aquí" },
        { place: "Centro Interno", cost: "Gratis", notes: "Solicítala sin costo" },
        { place: "🎁 Tuki-amigos", cost: "Gratis", notes: "Estarán regalando hojas el día de la inscripción" }
      ],
      actionText: "TUKI-LISTO",
      nextStep: 7,
      faq: [
        { initials: "❓", user: "Duda Frecuente", time: "Ahora", question: "¿Para qué sirve la hojita de inscripción?", answer: "Es la que entregarás al CPD para inscribir tus materias 📝" },
        { initials: "🚫", user: "Advertencia", time: "Hace un momento", question: "¿Qué pasa si no tengo la hojita?", answer: "Compra una o pide ayuda a tu Tuki-amigo para no quedarte sin inscribir ✅" },
        { initials: "✏️", user: "Consejo Tuki", time: "Hace un momento", question: "¿Debo colocar algo extra?", answer: "No, solo completa lo solicitado y llena los espacios requeridos" }
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

  constructor() { }

  getSteps(): StepData[] {
    return this.steps;
  }

  getStep(id: number): StepData | undefined {
    return this.steps.find(s => s.id === id);
  }
}
