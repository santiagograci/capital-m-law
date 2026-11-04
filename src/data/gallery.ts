export interface GalleryPhoto {
  url: string;
  alt: string;
  title: { en: string; es: string };
  location: string;
  client: string;
  caption: { en: string; es: string };
  tag: { en: string; es: string };
}

export const photos: GalleryPhoto[] = [
  {
    url: "/gallery/visa-celebration-provenza.jpg",
    alt: "Visa Celebration at Provenza - Capital M Law",
    title: {
      en: "Visa Celebration at Provenza",
      es: "Celebración de Visa en Provenza",
    },
    location: "El Poblado, Medellín (Provenza)",
    client: "Alex & María Fernanda",
    caption: {
      en: "Celebrating a 2-year digital nomad visa approval over fresh Colombian single-origin coffee.",
      es: "Celebrando la aprobación de 2 años de visa con café especial de origen.",
    },
    tag: { en: "Community", es: "Comunidad" },
  },
  {
    url: "/gallery/real-estate-closing-notary-15.jpg",
    alt: "Real Estate Closing at Notary 15 - Capital M Law",
    title: {
      en: "Real Estate Closing at Notary 15",
      es: "Cierre Inmobiliario en Notaría 15",
    },
    location: "Laureles, Medellín (Notaría 15)",
    client: "Carl & Ana María",
    caption: {
      en: "Handing over the keys and finalized public deed after a complete 20-year title audit.",
      es: "Entrega de llaves y firma de escritura pública tras un estudio de títulos sin riesgos.",
    },
    tag: { en: "Milestone", es: "Hito Legal" },
  },
  {
    url: "/gallery/strategy-session-belen-malibu-hq.jpg",
    alt: "Strategy Session at Belén Malibú HQ - Capital M Law",
    title: {
      en: "Strategy Session at Belén Malibú HQ",
      es: "Sesión Estratégica en Sede Belén Malibú",
    },
    location: "Medellín HQ (Belén Malibú)",
    client: "Founders & Legal Team",
    caption: {
      en: "Mapping out a new tech company incorporation and bilingual employment contracts.",
      es: "Estructurando la constitución de una nueva SAS y contratos laborales bilingües.",
    },
    tag: { en: "Everyday Life", es: "Día a Día" },
  },
  {
    url: "/gallery/cedula-extranjeria-delivery-day.jpg",
    alt: "Cédula Extranjería Delivery Day - Capital M Law",
    title: {
      en: "Cédula Extranjería Delivery Day",
      es: "Entrega de Cédula de Extranjería",
    },
    location: "Migración Colombia, Medellín",
    client: "Jay & The Team",
    caption: {
      en: "From initial consultation to holding the physical Colombian ID card in record time.",
      es: "Acompañamiento presencial para reclamar el documento físico en tiempo récord.",
    },
    tag: { en: "Success Story", es: "Caso de Éxito" },
  },
];
