import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { FaqItem } from '../components/faq.component';

export type { FaqItem };

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

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private readonly STORAGE_KEY = 'vet_flow_progress';
  private steps: StepData[] = [
    {
      id: 1,
      subtitle: "REGISTRO",
      title: "Habilitación del registro",
      description: "Revisa el correo electrónico que utilizaste en tu preinscripción.",
      details: [

        " Recibirás un código de 9 dígitos ej.: 222084006",
        " Con este codigo podras ingresar a tu perfil universitario"

      ],
      actionText: "TUKI-LISTO",
      nextStep: 2,
      faq: [
        { initials: "❓", user: "ARIANE", time: "Ahora", question: "¿Qué es ese código?", answer: "Es tu número único de estudiante, te identifica dentro de la UAGRM 🎓", useranswer: "CESAR", userimage: "ariane.webp", useranswerimage: "cesar.webp" },
        { initials: "📩", user: "MARGARITA", time: "Hace un momento", question: "¿No recibiste el correo?", answer: "Revisa tu SPAM o verifica que el correo registrado sea correcto.", useranswer: "MOISES", userimage: "margarita.webp", useranswerimage: "moises.webp" },
        { initials: "📍", user: "VALERIA", time: "Hace un momento", question: "¿Dónde preguntar?", answer: "En Dirección de Carrera de la Facultad de Ciencias Veterinarias o en el CPD facultativo.", useranswer: "GABRIEL", userimage: "valeria.webp", useranswerimage: "gabriel.webp" }
      ]
    },
    {
      id: 2,
      subtitle: "ACTIVACION",
      title: "Activa tu perfil universitario",
      description: "Ingresa al link 🔗, selecciona la opción Estudiante y completa los datos",
      details: [
        "Click aqui 🔗: Perfil UAGRM",
        "Registro: 218007663",
        "Contraseña 🔑: Ingresa tu Número de C. I."
      ],
      actionText: "TUKI-LISTO",
      nextStep: 3,
      faq: [
        { initials: "❓", user: "PABLO", time: "Ahora", question: "¿Tu carnet está vencido?", answer: "No afecta en nada tu proceso de ingreso ✅", useranswer: "DYRCE", userimage: "pablo.webp", useranswerimage: "dyrce.webp" },
        { initials: "🌐", user: "MAURICIO", time: "Hace un momento", question: "¿La página no carga?", answer: "Verifica tu conexión a Internet o intenta ingresar desde otro dispositivo 📱💻", useranswer: "ARIANE", userimage: "mauricio.webp", useranswerimage: "ariane.webp" },
        { initials: "🌐", user: "CESAR", time: "Hace un momento", question: "¿Como ingreso al perfil universitario?", answer: "En el buscador de google escribe : UAGRM PERFIL e ingresa al primer enlace ", useranswer: "LUCIANA", userimage: "cesar.webp", useranswerimage: "luciana.webp" }
      ]
    },
    {
      id: 3,
      subtitle: "CONTRASEÑA",
      title: "🔒 Cambia tu contraseña (obligatorio)",
      description: "Es fundamental para la seguridad de tu perfil.",
      details: [
        "Ingresa al Menú de tu perfil universitario",
        "Selecciona Cambiar contraseña",
        "Crea una nueva contraseña y guarda los cambios"
      ],
      actionText: "TUKI-LISTO",
      nextStep: 4,
      faq: [
        { initials: "❓", user: "LUCIANA", time: "Ahora", question: "¿Qué pasa si no cambio mi contraseña?", answer: "No podrás agarrar materias en el semestre regular ❌", useranswer: "DENILSON", userimage: "luciana.webp", useranswerimage: "denilson.webp" },
        { initials: "🔑", user: "ARIANE", time: "Hace un momento", question: "¿Qué contraseña puedo usar?", answer: "Debe incluir: ✔ letras mayúsculas y minúsculas, ✔ números, ✔ signos (recomendado)", useranswer: "NICOLAS", userimage: "ariane.webp", useranswerimage: "nicolas.webp" },
        { initials: "🔄", user: "SOFIA", time: "Hace un momento", question: "¿Olvidaste tu contraseña?", answer: "Ingresa a tu perfil universitario, haz clic en “Olvidé mi contraseña” y sigue el proceso de recuperación.", useranswer: "REIMAR", userimage: "sofia.webp", useranswerimage: "reimar.webp" }
      ]
    },
    {
      id: 4,
      subtitle: "TUKI-PAGOS",
      title: "💳 Paga tu Matrícula",
      description: "🏦 Realiza el pago en las entidades financieras habilitadas",
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
        "Presenta tu carnet de identidad y número de registro",
        "Pago único en efectivo ",
        "Conserva la boleta de pago"
      ],
      paymentDetails: {
        amount: "300 Bs",
        method: "Efectivo en entidades financieras autorizadas",
        requirement: "Presentar carnet de identidad"
      },
      actionText: "TUKI-LISTO",
      nextStep: 5,
      faq: [
        {
          initials: "❓", user: "ARIANE", time: "Ahora", question: "¿Que incluye este pago?", answer: `Incluye lo siguiente:
• Matrícula universitaria: 40 Bs
• Actualización de datos personales: 25 Bs
• Análisis de laboratorio: 120 Bs
• Revisión médica: 80 Bs
• Orientación vocacional: 3 Bs
• Servicio fotográfico: 12 Bs
• Aporte extraordinario C.U.B.: 20 Bs`, useranswer: "PABLO", userimage: "ariane.webp", useranswerimage: "pablo.webp"
        },
        { initials: "🚫", user: "DYRCE", time: "Hace un momento", question: "¿Qué pasa si no cancelo?", answer: "No podrás inscribir materias.", useranswer: "MOISES", userimage: "margarita.webp", useranswerimage: "moises.webp" },
        { initials: "🧾", user: "LUCIANA", time: "Hace un momento", question: "¿Por qué necesito la boleta de pago?", answer: "El CPD lo solicita al momento de inscribir tus materias. (guarda una copia)", useranswer: "GABRIEL", userimage: "valeria.webp", useranswerimage: "gabriel.webp" }
      ]
    },
    {
      id: 5,
      subtitle: "TUKI-PAGOS",
      title: "💳 Aporte facultativo",
      description: "🏫 Dirígete a la Facultad de Ciencias Veterinarias MOD 228, sector Cajas CUP.",
      paymentDetails: {
        amount: "1.500 Bs",
        method: "⚠️ Pago en efectivo",
        requirement: "Presentar recibo de pago de matrícula"
      },
      actionText: "TUKI-LISTO",
      nextStep: 6,
      faq: [
        { initials: "❓", user: "CESAR", time: "Ahora", question: "¿Por qué el monto es elevado?", answer: "Porque es un pago único al inicio de la carrera. Durante los 5 años no volverás a cancelarlo ✅", useranswer: "VALERIA", userimage: "cesar.webp", useranswerimage: "valeria.webp" },
        { initials: "📲", user: "BRAYAN", time: "Hace un momento", question: "¿Puedo pagar por QR?", answer: "No. El pago debe realizarse solo en efectivo, ya que el personal verifica que el monto y los datos sean correctos.", useranswer: "LUCIANA", userimage: "brayan.webp", useranswerimage: "luciana.webp" },
        { initials: "🏥", user: "MAURICIO", time: "Hace un momento", question: "¿En qué se utiliza este dinero?", answer: "Contribuye a la compra de insumos para prácticas y materiales de laboratorio de la facultad 🧪", useranswer: "SOFIA", userimage: "mauricio.webp", useranswerimage: "sofia.webp" }
      ],
      imagenes: [
        "imagen.webp",
        "imagen2.webp",

      ]
    },
    {
      id: 6,
      subtitle: "TUKI INSCRIPCION",
      title: "📝 Rellena tu Boleta",
      description: "Obtén tu hojita de inscripción en:",
      locations: [
        { place: "Fotocopiadora", cost: "2x50 ctv", notes: "Compra tu hojita aquí" },
        { place: "Centro Interno", cost: "Gratis", notes: "Solicítala sin costo" },
        { place: "🎁 Tuki-amigos", cost: "Gratis", notes: "Estarán regalando hojas el día de la inscripción" }
      ],
      actionText: "TUKI-LISTO",
      nextStep: 7,
      faq: [
        { initials: "❓", user: "MARGARITA", time: "Ahora", question: "¿Para qué sirve la hojita de inscripción?", answer: "Es la que entregarás al CPD para inscribir tus materias 📝", useranswer: "GABRIEL", userimage: "margarita.webp", useranswerimage: "gabriel.webp" },
        { initials: "🚫", user: "DYRCE", time: "Hace un momento", question: "¿Qué pasa si no tengo la hojita?", answer: "Compra una o pide ayuda a tu Tuki-amigo para no quedarte sin inscribir ✅", useranswer: "PABLO", userimage: "dyrce.webp", useranswerimage: "pablo.webp" },
        { initials: "✏️", user: "ARIANE", time: "Hace un momento", question: "¿Debo colocar algo extra?", answer: "No, solo completa lo solicitado y llena los espacios requeridos", useranswer: "MOISES", userimage: "ariane.webp", useranswerimage: "moises.webp" }
      ]
    },
    {
      id: 7,
      subtitle: "ELIGE TU HORARIO",
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
        { initials: "AP", user: "VALERIA", time: "5 horas", question: "¿Hay horario específico para presentar documentos?", useranswer: "CESAR", userimage: "valeria.webp", useranswerimage: "cesar.webp" },
        { initials: "SL", user: "SOFIA", time: "2 días", question: "¿Puedo delegar la entrega a un familiar?", useranswer: "MAURICIO", userimage: "sofia.webp", useranswerimage: "mauricio.webp" }
      ]
    },
    {
      id: 8,
      subtitle: "INSCRIBETE",
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
        { initials: "AP", user: "VALERIA", time: "5 horas", question: "¿Hay horario específico para presentar documentos?", useranswer: "CESAR", userimage: "valeria.webp", useranswerimage: "cesar.webp" },
        { initials: "SL", user: "SOFIA", time: "2 días", question: "¿Puedo delegar la entrega a un familiar?", useranswer: "MAURICIO", userimage: "sofia.webp", useranswerimage: "mauricio.webp" }
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
