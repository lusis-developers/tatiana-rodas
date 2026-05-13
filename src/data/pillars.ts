import type { Pillar } from '@/types/content'

export const pillars: Pillar[] = [
  {
    id: 'fisiologia',
    number: '01',
    title: 'Fisiología',
    tagline: 'Despierta el cuerpo que años de oficina apagaron.',
    description:
      'La voz no sale de la garganta — sale del cuerpo entero. Trabajamos respiración, postura, regulación del sistema nervioso y presencia física para que dejes de bloquearte en los momentos importantes.',
    bullets: [
      'Respiración diafragmática aplicada a reuniones de alta presión.',
      'Postura y grounding: dejar de hablar desde el cuello.',
      'Regulación del sistema nervioso antes y durante intervenciones clave.',
    ],
    iconName: 'Activity',
  },
  {
    id: 'lenguaje',
    number: '02',
    title: 'Lenguaje',
    tagline: 'Recupera la voz que tenías antes de que tu cargo la cambiara.',
    description:
      'Tras 20 años de roles y reuniones, hablas con la voz del cargo, no con la tuya. Aquí desmontamos patrones heredados (de tus padres, del colegio, de la cultura corporativa) y volvemos a tu voz original.',
    bullets: [
      'Identificación de patrones heredados de habla.',
      'Reactivación de la voz personal previa al rol.',
      'Microcopy ejecutivo: decir más diciendo menos.',
    ],
    iconName: 'MessageCircle',
  },
  {
    id: 'enfoque',
    number: '03',
    title: 'Enfoque',
    tagline: 'Convierte 20 años de carrera en una historia que conecta.',
    description:
      'Tu CV impresiona pero tu historia no llega. Organizamos tu trayectoria como una narrativa coherente: dejas de listar logros y empiezas a contar quién eres detrás de ellos.',
    bullets: [
      'Estructura narrativa ejecutiva para 20+ años de carrera.',
      'Historias clave que llevabas sin saber cómo contar.',
      'Storytelling de marca personal sin perder autoridad.',
    ],
    iconName: 'Target',
  },
]
