import { Coach } from '../types';

import lucasImg from '../assets/images/coach_lucas_trainer_1791260972097.jpg';
import elenaImg from '../assets/images/coach_elena_nutrition_1791260982845.jpg';
import marcosImg from '../assets/images/coach_marcos_strength_1791260991776.jpg';
import sofiaImg from '../assets/images/coach_sofia_hiit_1791261001291.jpg';

export const INITIAL_COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'Marcos Benítez',
    gender: 'male',
    rating: 4.96,
    reviewCount: 142,
    specialty: 'Fuerza & Hipertrofia Funcional',
    experienceYears: 9,
    hourlyRateMonthly: 1500,
    bio: 'Ex-atleta de alto rendimiento y especialista en recomposición corporal. Mi metodología combina biomecánica de precisión con progresión por sobrecarga adaptativa monitoreada por los sensores de FitTrack.',
    certifications: [
      'CSCS (Certified Strength & Conditioning Specialist)',
      'Máster en Fisiología del Ejercicio (INEF)',
      'Especialista en Biomecánica Aplicada (ISSA)'
    ],
    photoUrl: marcosImg,
    availableSlots: '3 cupos este mes',
    clientCount: 28,
    tags: ['Hipertrofia', 'Biomecánica', 'Postura']
  },
  {
    id: 'coach-2',
    name: 'Elena Morales, RD',
    gender: 'female',
    rating: 4.98,
    reviewCount: 189,
    specialty: 'Nutrición Deportiva & Pérdida de Grasa',
    experienceYears: 8,
    hourlyRateMonthly: 1500,
    bio: 'Nutrióloga clínica y entrenadora de acondicionamiento físico. Me enfoco en hábitos sostenibles sin dietas restrictivas, calculando tus macros en tiempo real según tu gasto calórico real registrado por tus sensores.',
    certifications: [
      'Licenciada en Nutrición Humana y Dietética',
      'Certificación CISSN (Sports Nutritionist)',
      'Entrenadora Personal Certificada ACE'
    ],
    photoUrl: elenaImg,
    availableSlots: '2 cupos este mes',
    clientCount: 34,
    tags: ['Nutrición', 'Déficit Calórico', 'Recomposición']
  },
  {
    id: 'coach-3',
    name: 'Lucas Varela',
    gender: 'male',
    rating: 4.91,
    reviewCount: 97,
    specialty: 'Resistencia, Running & Movilidad',
    experienceYears: 6,
    hourlyRateMonthly: 1500,
    bio: 'Entrenador de corredores de fondo y atletas híbridos. Utilizo la telemetría en tiempo real de tu GPS y cadencia de pasos para ajustar zonas de frecuencia cardíaca y prevenir lesiones articulares.',
    certifications: [
      'Entrenador Nivel 2 UESCA Running Coach',
      'Certificación FMS (Functional Movement Screen)',
      'NSCA-CPT Personal Trainer'
    ],
    photoUrl: lucasImg,
    availableSlots: 'Disponible inmediato',
    clientCount: 22,
    tags: ['Running', 'Resistencia', 'Prevención Lesiones']
  },
  {
    id: 'coach-4',
    name: 'Sofía Carrión',
    gender: 'female',
    rating: 4.95,
    reviewCount: 164,
    specialty: 'HIIT Metabólico & Definición',
    experienceYears: 7,
    hourlyRateMonthly: 1500,
    bio: 'Especialista en entrenamientos de alta intensidad con impacto articular controlado. Diseñé programas para personas con agenda ocupada que buscan maximizar el consumo de oxígeno post-ejercicio (EPOC).',
    certifications: [
      'NASM Master Personal Trainer',
      'Especialista en Entrenamiento Metabólico HIIT',
      'Coach Certificada Kettlebell IKFF'
    ],
    photoUrl: sofiaImg,
    availableSlots: '4 cupos este mes',
    clientCount: 31,
    tags: ['HIIT', 'Quema Rápida', 'Movilidad']
  }
];
