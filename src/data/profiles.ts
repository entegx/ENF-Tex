import type { FolderItem, ProfileType } from '@/types';

const createId = () => Math.random().toString(36).substring(2, 10);

const basicProfile: FolderItem[] = [
  {
    id: createId(),
    name: 'Noticias y Medios',
    isExpanded: true,
    links: [
      { id: createId(), title: 'Medscape', url: 'https://www.medscape.com', description: 'Noticias médicas y educación continua' },
      { id: createId(), title: 'Medical News Today', url: 'https://www.medicalnewstoday.com', description: 'Noticias de salud para profesionales y público' },
      { id: createId(), title: 'BBC Health', url: 'https://www.bbc.com/news/health', description: 'Cobertura internacional de salud' },
    ],
  },
  {
    id: createId(),
    name: 'Newsletters',
    isExpanded: false,
    links: [
      { id: createId(), title: 'JAMA Network', url: 'https://jamanetwork.com/newsletters', description: 'Resúmenes semanales de investigación' },
      { id: createId(), title: 'NEJM Resident 360', url: 'https://resident360.nejm.org', description: 'Recursos para residentes' },
    ],
  },
  {
    id: createId(),
    name: 'Blogs',
    isExpanded: false,
    links: [
      { id: createId(), title: 'KevinMD', url: 'https://www.kevinmd.com', description: 'Voz de la medicina desde el médico' },
      { id: createId(), title: 'White Coat Investor', url: 'https://www.whitecoatinvestor.com', description: 'Finanzas personales para médicos' },
    ],
  },
  {
    id: createId(),
    name: 'Guías y Protocolos',
    isExpanded: false,
    links: [
      { id: createId(), title: 'UpToDate', url: 'https://www.uptodate.com', description: 'Evidencia clínica revisada por expertos' },
      { id: createId(), title: 'OMS / WHO', url: 'https://www.who.int/es', description: 'Directrices y alertas sanitarias globales' },
    ],
  },
  {
    id: createId(),
    name: 'Educación',
    isExpanded: false,
    links: [
      { id: createId(), title: 'Osmosis', url: 'https://www.osmosis.org', description: 'Videos y flashcards para medicina' },
      { id: createId(), title: 'Khan Academy Medicine', url: 'https://es.khanacademy.org/science/health-and-medicine', description: 'Fundamentos de salud gratuitos' },
    ],
  },
];

const intermediateProfile: FolderItem[] = [
  {
    id: createId(),
    name: 'Noticias y Medios',
    isExpanded: true,
    links: [
      { id: createId(), title: 'Medscape', url: 'https://www.medscape.com', description: 'Noticias médicas y educación continua' },
      { id: createId(), title: 'Medical News Today', url: 'https://www.medicalnewstoday.com', description: 'Noticias de salud para profesionales y público' },
      { id: createId(), title: 'BBC Health', url: 'https://www.bbc.com/news/health', description: 'Cobertura internacional de salud' },
      { id: createId(), title: 'STAT News', url: 'https://www.statnews.com', description: 'Periodismo de ciencias de la vida' },
      { id: createId(), title: 'The Lancet Digital Health', url: 'https://www.thelancet.com/digital-health', description: 'Transformación digital en salud' },
    ],
  },
  {
    id: createId(),
    name: 'Newsletters',
    isExpanded: false,
    links: [
      { id: createId(), title: 'JAMA Network', url: 'https://jamanetwork.com/newsletters', description: 'Resúmenes semanales de investigación' },
      { id: createId(), title: 'NEJM Resident 360', url: 'https://resident360.nejm.org', description: 'Recursos para residentes' },
      { id: createId(), title: 'BMJ Opinion', url: 'https://blogs.bmj.com/bmj', description: 'Opinión y debate en medicina' },
    ],
  },
  {
    id: createId(),
    name: 'Blogs',
    isExpanded: false,
    links: [
      { id: createId(), title: 'KevinMD', url: 'https://www.kevinmd.com', description: 'Voz de la medicina desde el médico' },
      { id: createId(), title: 'White Coat Investor', url: 'https://www.whitecoatinvestor.com', description: 'Finanzas personales para médicos' },
      { id: createId(), title: 'Skeptical Scalpel', url: 'https://skepticalscalpel.blogspot.com', description: 'Reflexiones sobre cirugía y práctica' },
    ],
  },
  {
    id: createId(),
    name: 'Revistas Científicas',
    isExpanded: false,
    links: [
      { id: createId(), title: 'New England Journal of Medicine', url: 'https://www.nejm.org', description: 'La revista médica más citada del mundo' },
      { id: createId(), title: 'The Lancet', url: 'https://www.thelancet.com', description: 'Investigación clínica y salud global' },
      { id: createId(), title: 'British Medical Journal', url: 'https://www.bmj.com', description: 'Medicina basada en evidencia' },
      { id: createId(), title: 'JAMA', url: 'https://jamanetwork.com/journals/jama', description: 'Journal of the American Medical Association' },
    ],
  },
  {
    id: createId(),
    name: 'Guías y Protocolos',
    isExpanded: false,
    links: [
      { id: createId(), title: 'UpToDate', url: 'https://www.uptodate.com', description: 'Evidencia clínica revisada por expertos' },
      { id: createId(), title: 'OMS / WHO', url: 'https://www.who.int/es', description: 'Directrices y alertas sanitarias globales' },
      { id: createId(), title: 'NICE Guidelines', url: 'https://www.nice.org.uk/guidance', description: 'Guías del Instituto Nacional de Excelencia Clínica (UK)' },
    ],
  },
  {
    id: createId(),
    name: 'Educación',
    isExpanded: false,
    links: [
      { id: createId(), title: 'Osmosis', url: 'https://www.osmosis.org', description: 'Videos y flashcards para medicina' },
      { id: createId(), title: 'Khan Academy Medicine', url: 'https://es.khanacademy.org/science/health-and-medicine', description: 'Fundamentos de salud gratuitos' },
      { id: createId(), title: 'Coursera Salud', url: 'https://www.coursera.org/browse/health', description: 'Cursos universitarios en línea' },
      { id: createId(), title: 'edX Medicine', url: 'https://www.edx.org/search?q=medicine', description: 'Cursos de universidades de élite' },
    ],
  },
  {
    id: createId(),
    name: 'Bases de Datos',
    isExpanded: false,
    links: [
      { id: createId(), title: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Base de datos biomédica del NLM' },
    ],
  },
];

const advancedProfile: FolderItem[] = [
  {
    id: createId(),
    name: 'Noticias y Medios',
    isExpanded: true,
    links: [
      { id: createId(), title: 'Medscape', url: 'https://www.medscape.com', description: 'Noticias médicas y educación continua' },
      { id: createId(), title: 'Medical News Today', url: 'https://www.medicalnewstoday.com', description: 'Noticias de salud para profesionales y público' },
      { id: createId(), title: 'BBC Health', url: 'https://www.bbc.com/news/health', description: 'Cobertura internacional de salud' },
      { id: createId(), title: 'STAT News', url: 'https://www.statnews.com', description: 'Periodismo de ciencias de la vida' },
      { id: createId(), title: 'The Lancet Digital Health', url: 'https://www.thelancet.com/digital-health', description: 'Transformación digital en salud' },
      { id: createId(), title: 'Politico Pulse', url: 'https://www.politico.com/newsletters/politico-pulse', description: 'Política de salud en EE.UU.' },
    ],
  },
  {
    id: createId(),
    name: 'Newsletters',
    isExpanded: false,
    links: [
      { id: createId(), title: 'JAMA Network', url: 'https://jamanetwork.com/newsletters', description: 'Resúmenes semanales de investigación' },
      { id: createId(), title: 'NEJM Resident 360', url: 'https://resident360.nejm.org', description: 'Recursos para residentes' },
      { id: createId(), title: 'BMJ Opinion', url: 'https://blogs.bmj.com/bmj', description: 'Opinión y debate en medicina' },
      { id: createId(), title: 'NEJM Weekly', url: 'https://www.nejm.org/medical-articles/browse?topic=news', description: 'Resumen de artículos y noticias' },
    ],
  },
  {
    id: createId(),
    name: 'Blogs',
    isExpanded: false,
    links: [
      { id: createId(), title: 'KevinMD', url: 'https://www.kevinmd.com', description: 'Voz de la medicina desde el médico' },
      { id: createId(), title: 'White Coat Investor', url: 'https://www.whitecoatinvestor.com', description: 'Finanzas personales para médicos' },
      { id: createId(), title: 'Skeptical Scalpel', url: 'https://skepticalscalpel.blogspot.com', description: 'Reflexiones sobre cirugía y práctica' },
      { id: createId(), title: 'Science-Based Medicine', url: 'https://sciencebasedmedicine.org', description: 'Medicina basada en evidencia rigurosa' },
    ],
  },
  {
    id: createId(),
    name: 'Revistas Científicas',
    isExpanded: false,
    links: [
      { id: createId(), title: 'New England Journal of Medicine', url: 'https://www.nejm.org', description: 'La revista médica más citada del mundo' },
      { id: createId(), title: 'The Lancet', url: 'https://www.thelancet.com', description: 'Investigación clínica y salud global' },
      { id: createId(), title: 'British Medical Journal', url: 'https://www.bmj.com', description: 'Medicina basada en evidencia' },
      { id: createId(), title: 'JAMA', url: 'https://jamanetwork.com/journals/jama', description: 'Journal of the American Medical Association' },
      { id: createId(), title: 'Nature Medicine', url: 'https://www.nature.com/nm', description: 'Investigación biomédica de frontera' },
      { id: createId(), title: 'Science Translational Medicine', url: 'https://www.science.org/journals/stm', description: 'De la investigación a la clínica' },
    ],
  },
  {
    id: createId(),
    name: 'Guías y Protocolos',
    isExpanded: false,
    links: [
      { id: createId(), title: 'UpToDate', url: 'https://www.uptodate.com', description: 'Evidencia clínica revisada por expertos' },
      { id: createId(), title: 'OMS / WHO', url: 'https://www.who.int/es', description: 'Directrices y alertas sanitarias globales' },
      { id: createId(), title: 'NICE Guidelines', url: 'https://www.nice.org.uk/guidance', description: 'Guías del Instituto Nacional de Excelencia Clínica (UK)' },
      { id: createId(), title: 'CDC Guidelines', url: 'https://www.cdc.gov/guidelines', description: 'Recomendaciones del CDC (EE.UU.)' },
      { id: createId(), title: 'SEIMC', url: 'https://www.seimc.org', description: 'Sociedad Española de Enfermedades Infecciosas' },
    ],
  },
  {
    id: createId(),
    name: 'Educación',
    isExpanded: false,
    links: [
      { id: createId(), title: 'Osmosis', url: 'https://www.osmosis.org', description: 'Videos y flashcards para medicina' },
      { id: createId(), title: 'Khan Academy Medicine', url: 'https://es.khanacademy.org/science/health-and-medicine', description: 'Fundamentos de salud gratuitos' },
      { id: createId(), title: 'Coursera Salud', url: 'https://www.coursera.org/browse/health', description: 'Cursos universitarios en línea' },
      { id: createId(), title: 'edX Medicine', url: 'https://www.edx.org/search?q=medicine', description: 'Cursos de universidades de élite' },
      { id: createId(), title: 'Amboss', url: 'https://www.amboss.com', description: 'Plataforma de estudio médico integral' },
    ],
  },
  {
    id: createId(),
    name: 'Bases de Datos y Recursos',
    isExpanded: false,
    links: [
      { id: createId(), title: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Base de datos biomédica del NLM' },
      { id: createId(), title: 'Cochrane Library', url: 'https://www.cochranelibrary.com', description: 'Revisiones sistemáticas de alta calidad' },
      { id: createId(), title: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov', description: 'Registro de ensayos clínicos globales' },
      { id: createId(), title: 'MedlinePlus', url: 'https://medlineplus.gov', description: 'Información de salud para pacientes' },
      { id: createId(), title: 'NCBI', url: 'https://www.ncbi.nlm.nih.gov', description: 'Centro Nacional de Información Biotecnológica' },
    ],
  },
  {
    id: createId(),
    name: 'Informes y Vigilancia',
    isExpanded: false,
    links: [
      { id: createId(), title: 'CDC', url: 'https://www.cdc.gov', description: 'Centros para el Control y la Prevención de Enfermedades' },
      { id: createId(), title: 'ECDC', url: 'https://www.ecdc.europa.eu', description: 'Centro Europeo de Prevención y Control de Enfermedades' },
      { id: createId(), title: 'PAHO / OPS', url: 'https://www.paho.org/es', description: 'Organización Panamericana de la Salud' },
    ],
  },
];

export const PROFILES: Record<ProfileType, FolderItem[]> = {
  basic: JSON.parse(JSON.stringify(basicProfile)),
  intermediate: JSON.parse(JSON.stringify(intermediateProfile)),
  advanced: JSON.parse(JSON.stringify(advancedProfile)),
  custom: [],
};
