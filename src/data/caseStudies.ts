import type { CaseStudy } from '@/types/content'

export const caseStudies: CaseStudy[] = [
  {
    id: 'luciano-ar',
    name: 'Luciano',
    role: 'Empresario',
    location: 'Argentina · Miami',
    before: [
      'Organizó una conferencia y no sabía por dónde empezar.',
      'Hablaba como el experto técnico, no como el dueño del proyecto.',
      'Sentía que el escenario lo achicaba en lugar de potenciarlo.',
    ],
    after: [
      'Abrió un evento de 1.000 personas con música — algo inédito en su industria.',
      'Marcó un antes y un después en su industria y en su país.',
      'Sube al escenario como Luciano, no como el experto.',
    ],
    quote:
      'Necesitaba subir como Luciano, no como el experto. Eso me cambió la forma de liderar también dentro de la empresa.',
    metrics: [
      { value: '1.000', label: 'asistentes en su evento de apertura' },
      { value: '1°', label: 'evento con música en su industria' },
    ],
  },
  {
    id: 'empresario-mx',
    name: 'Empresario senior',
    role: 'CEO · Industria tradicional',
    location: 'México',
    before: [
      'Vendía uno a uno; frente a grupos grandes se bloqueaba.',
      'Personalidad fuerte sin balance — presentaciones como monólogos de poder.',
      'Estrés y nerviosismo previo a cada intervención pública.',
    ],
    after: [
      'Conecta con el auditorio sin perder esencia, sumando humanidad.',
      'Encontró el equilibrio entre fuerza y conexión.',
      'Regula el sistema nervioso con respiración y música antes de salir.',
      'Sus presentaciones son ahora conversaciones, no demostraciones de poder.',
    ],
    quote:
      'Dejé de querer ganar la sala y empecé a querer reunirla. Cambió el resultado y cambió mi día a día.',
    metrics: [
      { value: '0', label: 'bloqueos en sus últimas 5 keynotes' },
      { value: '+', label: 'cierre en pitch grupales' },
    ],
  },
  {
    id: 'maria-pe',
    name: 'María Angélica Castro',
    role: 'Conferencista · Especialista',
    location: 'Perú',
    before: [
      'Conocimiento estancado, sin metodología propia.',
      'Paralizada frente a cámara; sin vehículo para monetizar.',
      'Buscaba permiso externo para autorizarse.',
    ],
    after: [
      'Creó y lanzó su propia metodología.',
      'Se convirtió en creadora de contenido en su nicho.',
      'Vendió su método a clientes reales.',
      'Genera su propia autoridad sin pedir permiso.',
    ],
    quote:
      'Llevaba años pidiendo permiso para validarme. Aprendí a dármelo yo. Hoy mi método es mi activo más rentable.',
    metrics: [
      { value: '1', label: 'metodología propia lanzada' },
      { value: 'Sí', label: 'monetización directa con clientes' },
    ],
  },
]
