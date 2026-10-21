export interface AttorneyBio {
  id: string;
  name: string;
  slug: string;
  role: { en: string; es: string };
  titleTag: { en: string; es: string };
  image: string;
  credentials: { en: string; es: string };
  barRegistration: string;
  languages: { en: string; es: string };
  experienceYears: number;
  consultationFee: string;
  summary: { en: string; es: string };
  fullBio: {
    en: string[];
    es: string[];
  };
  pillars: {
    en: { title: string; desc: string }[];
    es: { title: string; desc: string }[];
  };
  practiceAreas: {
    en: { title: string; items: string[] }[];
    es: { title: string; items: string[] }[];
  };
  education: {
    en: string[];
    es: string[];
  };
  quote: {
    en: string;
    es: string;
  };
}

export const ATTORNEYS: AttorneyBio[] = [
  {
    id: "maria-fernanda-duarte",
    name: "María Fernanda Duarte",
    slug: "maria-fernanda-duarte",
    role: {
      en: "Founder & Principal Attorney",
      es: "Socia Fundadora y Directora Principal",
    },
    titleTag: {
      en: "Strategic Immigration & Foreign Investment Director",
      es: "Directora de Estrategia Migratoria e Inversión Extranjera",
    },
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85",
    credentials: {
      en: "Attorney at Law — Board Certified (CSJ Colombia)",
      es: "Abogada Titulada — Tarjeta Profesional Vigente Consejo Superior de la Judicatura",
    },
    barRegistration: "CSJ-Col #289.412",
    languages: {
      en: "English & Spanish (100% Bilingual Practice)",
      es: "Inglés y Español (Práctica Legal 100% Bilingüe)",
    },
    experienceYears: 9,
    consultationFee: "$67 USD",
    summary: {
      en: "Licensed Colombian attorney specialized in high-stakes immigration strategy, foreign direct investment, and safe real estate acquisitions in Medellín and across Colombia.",
      es: "Abogada colombiana especializada en estructuración estratégica de visas complejas, inversión extranjera directa y adquisición segura de bienes raíces en Medellín y Colombia.",
    },
    fullBio: {
      en: [
        "María Fernanda founded Capital M Law with a resolute mission: transforming bureaucratic Colombian legal processes into transparent, predictable, and stress-free experiences for foreign entrepreneurs, digital nomads, and retirees.",
        "Over nearly a decade of dedicated private practice, she has spearheaded hundreds of successful residency petitions, structured high-value real estate closings in El Poblado and Llanogrande, and advised foreign tech founders establishing corporate presence under Colombian SAS regulations.",
        "Her trademark approach blends meticulous technical rigor under Colombian administrative law with empathetic, direct bilingual advocacy, ensuring international clients fully understand every phase, timeline, and risk without legal jargon.",
      ],
      es: [
        "María Fernanda fundó Capital M Law con un propósito claro: transformar los complejos y a menudo desgastantes trámites legales colombianos en una experiencia transparente, predecible y de total tranquilidad para extranjeros, empresarios e inversionistas.",
        "A lo largo de casi una década de ejercicio profesional, ha liderado con éxito cientos de solicitudes de residencia y visas de alta complejidad, estructurado compras inmobiliarias seguras en El Poblado y el Oriente Antioqueño, y asesorado a fundadores internacionales en la constitución de sociedades SAS.",
        "Su sello profesional combina un estricto rigor técnico ante las entidades del Estado con una comunicación empática, 100% bilingüe y sin tecnicismos innecesarios, garantizando que cada cliente conozca con absoluta certeza su ruta jurídica.",
      ],
    },
    pillars: {
      en: [
        {
          title: "Complex Visa Strategy",
          desc: "Expert navigation of Resolution 5477, salvoconductos, appeals, and multi-year investor/nomad visas.",
        },
        {
          title: "Real Estate Due Diligence",
          desc: "Exhaustive 20-year title searches, promise of sale contract shielding, and notary escrow coordination.",
        },
        {
          title: "FDI & Central Bank Compliance",
          desc: "Registration of foreign capital inflows before Banco de la República for clean future repatriation.",
        },
      ],
      es: [
        {
          title: "Estrategia Migratoria Compleja",
          desc: "Dominio de la Resolución 5477, salvoconductos, reposiciones ante rechazos y visas de nómada e inversionista.",
        },
        {
          title: "Blindaje en Finca Raíz",
          desc: "Estudio de títulos a 20 años, redacción blindada de promesas de compraventa y coordinación notarial.",
        },
        {
          title: "Inversión y Banco de la República",
          desc: "Registro cambiario de capitales extranjeros ante el Banco Central para garantizar repatriación sin trabas.",
        },
      ],
    },
    practiceAreas: {
      en: [
        {
          title: "Immigration & Residency Pathways",
          items: [
            "Digital Nomad Visa (Visa V Nómadas Digitales)",
            "Real Estate Investor Visa (Visa M Inmobiliario)",
            "Shareholder / Business Owner Visa (Visa M Societario)",
            "Marriage & Civil Union Residency (Visa M Cónyuge / Compañero)",
            "Permanent Residency Transitions (Visa R) & Citizenship Petitions",
            "Urgent Tourist Stay Extensions & Salvoconducto (SC-1 / SC-2)",
          ],
        },
        {
          title: "Real Estate & Asset Protection",
          items: [
            "Comprehensive 10 to 20-year Title Audit (Estudio de Títulos)",
            "Bilingual Promise of Purchase Agreement (Promesa de Compraventa)",
            "Public Deed (Escritura Pública) Execution & Registry Representation",
            "Tax & Municipal Assessment Clearance (Paz y Salvo Predial/Valorización)",
            "Lease Agreement Structuring & Tenant Dispute Prevention under Ley 820",
          ],
        },
        {
          title: "Corporate Inward Structuring",
          items: [
            "Simplified Stock Corporation (SAS) Incorporation for Foreign Nationals",
            "Corporate Governance & Bilingual Bylaw Customization",
            "Foreign Investment Registration Form 4 (Banco de la República)",
            "Legal Representation for Foreign Entities in Colombia",
          ],
        },
      ],
      es: [
        {
          title: "Vías de Visas y Residencia Legal",
          items: [
            "Visa de Nómada Digital (Visa V Nómadas Digitales)",
            "Visa de Inversionista Inmobiliario (Visa M Inmobiliario)",
            "Visa de Socio o Propietario de Empresa (Visa M Societario)",
            "Visa de Matrimonio y Unión Marital de Hecho (Visa M Cónyuge)",
            "Transición a Residencia Permanente (Visa R) y Nacionalidad",
            "Prórrogas urgentes y Salvoconductos de Permanencia (SC-1 / SC-2)",
          ],
        },
        {
          title: "Bienes Raíces y Protección Patrimonial",
          items: [
            "Estudio Exhaustivo de Títulos a 20 años (Libertad, Gravámenes y Embargos)",
            "Promesas de Compraventa Blindadas y Bilingües",
            "Acompañamiento Notarial en Firma de Escrituras Públicas y Registro",
            "Certificaciones de Paz y Salvo Predial, Valorización y Expensas",
            "Contratos de Arrendamiento y Protección del Propietario (Ley 820)",
          ],
        },
        {
          title: "Estructuración Corporativa",
          items: [
            "Constitución de Sociedades por Acciones Simplificadas (SAS)",
            "Redacción de Estatutos Societarios a Medida y Órganos de Gobierno",
            "Registro de Capital Extranjero Formulario 4 ante Banco de la República",
            "Representación Legal Judicial y Extrajudicial para Entidades Extranjeras",
          ],
        },
      ],
    },
    education: {
      en: [
        "LL.B. Law Degree — Universidad de Medellín (Medellín, Colombia)",
        "Postgraduate Specialization in Administrative & Corporate Law",
        "Certified in International Commercial Arbitration & Notarial Practice",
      ],
      es: [
        "Abogada Titulada — Universidad de Medellín",
        "Especialización en Derecho Administrativo y Derecho Comercial",
        "Certificación en Práctica Notarial, Fiduciaria y Contratación Internacional",
      ],
    },
    quote: {
      en: "Relocating or investing across borders should be an empowering milestone, not an administrative ordeal. We give our clients absolute legal certainty from day one.",
      es: "Invertir o mudarse a otro país debe ser un hito emocionante, no una pesadilla burocrática. Brindamos certeza y acompañamiento transparente desde el primer minuto.",
    },
  },
  {
    id: "ana-maria-munoz",
    name: "Ana María Muñoz",
    slug: "ana-maria-munoz",
    role: {
      en: "Associate Attorney",
      es: "Abogada Asociada",
    },
    titleTag: {
      en: "Immigration Operations & Regulatory Compliance Specialist",
      es: "Especialista en Operaciones Migratorias y Cumplimiento Regulatorio",
    },
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85",
    credentials: {
      en: "Attorney at Law — Board Certified (CSJ Colombia)",
      es: "Abogada Titulada — Tarjeta Profesional Vigente Consejo Superior de la Judicatura",
    },
    barRegistration: "CSJ-Col #312.870",
    languages: {
      en: "English & Spanish (100% Bilingual Practice)",
      es: "Inglés y Español (Práctica Legal 100% Bilingüe)",
    },
    experienceYears: 6,
    consultationFee: "$67 USD",
    summary: {
      en: "Bilingual attorney leading day-to-day administrative filings, swift visa document verification, Migración Colombia compliance, and notarial liaison for expats and overseas entrepreneurs.",
      es: "Abogada bilingüe líder en la preparación documental rigurosa ante Cancillería y Migración Colombia, trámites notariales ágiles y cumplimiento corporativo continuo.",
    },
    fullBio: {
      en: [
        "Ana María specializes in the operational engine of immigration law, corporate compliance, and civil agreements. Her sharp technical attention to detail ensures applications are vetted against the latest Consular criteria before submission.",
        "Having processed dozens of urgent cases—from salvage visas and foreign marriage registrations to expedited Cédula de Extranjería scheduling—she is renowned among expat clients for rapid response times, dependable follow-through, and calm efficiency.",
        "Her focus guarantees that clients avoid common pitfall notices (Requerimientos), maintaining a pristine approval record before the Colombian Ministry of Foreign Affairs (Cancillería).",
      ],
      es: [
        "Ana María es el motor operativo y de precisión técnica en los trámites migratorios, notariales y societarios de la firma. Su meticulosa revisión garantiza que cada expediente cumpla estrictamente con los criterios más recientes de los consulados y la Cancillería.",
        "Ha gestionado con éxito decenas de casos urgentes —incluyendo salvoconductos por vencimiento de permanencia, registro civil de matrimonios celebrados en el extranjero y citas prioritarias de Cédula de Extranjería— destacándose por su rapidez de respuesta y calidez.",
        "Su enfoque preventivo evita observaciones consulares (Requerimientos) innecesarios, asegurando trámites limpios, dentro de los plazos y con comunicación continua.",
      ],
    },
    pillars: {
      en: [
        {
          title: "Flawless Visa Filings",
          desc: "Audit of bank statements, Apostilles, and certified translations before submission to Cancillería.",
        },
        {
          title: "Migración Colombia Liaison",
          desc: "Cédula de Extranjería appointments, Salvoconductos, and movement certificate tracking.",
        },
        {
          title: "Notary & Civil Registry",
          desc: "Power of attorney (Poderes), marital registrations, apostille chains, and authentications.",
        },
      ],
      es: [
        {
          title: "Expedientes Consulares Impecables",
          desc: "Auditoría de extractos bancarios, apostillas y traducciones oficiales antes de radicar en Cancillería.",
        },
        {
          title: "Gestión ante Migración Colombia",
          desc: "Agendamiento de Cédula de Extranjería, salvoconductos y certificados de movimientos migratorios.",
        },
        {
          title: "Trámites Notariales y Civiles",
          desc: "Poderes especiales, protocolización de matrimonios, cadenas de legalización y autenticaciones.",
        },
      ],
    },
    practiceAreas: {
      en: [
        {
          title: "Direct Immigration Operations",
          items: [
            "Retirement & Pensioner Visa (Visa M Pensionado)",
            "Rentista / Independent Means Visa (Visa M Rentista)",
            "Student & Academic Exchange Visas (Visa V Estudiante)",
            "Official Spanish Translations & Document Legalization Chains",
            "Expedited Cédula de Extranjería Processing in Medellín",
            "Colombian Drivers License Transfer Guidance",
          ],
        },
        {
          title: "Family Law & Civil Formalities",
          items: [
            "Mutual Consent Divorces before Colombian Public Notary",
            "Prenuptial Agreements (Capitulaciones Matrimoniales)",
            "Recognition of Foreign Marriage Certificates in Colombia",
            "Child Custody & Parental Authorization for Travel",
          ],
        },
        {
          title: "Corporate Secretarial & Compliance",
          items: [
            "Chamber of Commerce (Cámara de Comercio) Annual Renewals",
            "DIAN Tax Registry (RUT) Creation & Updates",
            "Bilingual Power of Attorney (Poder Especial & General)",
            "Employee Onboarding Contracts under Colombian Labor Code",
          ],
        },
      ],
      es: [
        {
          title: "Operaciones y Gestión Migratoria",
          items: [
            "Visa de Pensionado o Jubilado (Visa M Pensionado)",
            "Visa de Rentista de Capital (Visa M Rentista)",
            "Visas de Estudiante y Prácticas Académicas (Visa V Estudiante)",
            "Traducciones Oficiales Certificadas y Legalización de Documentos",
            "Acompañamiento en Trámite de Cédula de Extranjería en Medellín",
            "Homologación de Licencias de Conducción Extranjeras",
          ],
        },
        {
          title: "Derecho de Familia y Trámites Civiles",
          items: [
            "Divorcios de Mutuo Acuerdo ante Notaría Pública",
            "Capitulaciones Matrimoniales y Patrimoniales",
            "Inscripción de Matrimonios Extranjeros en Registro Civil Colombiano",
            "Permisos de Salida del País para Menores y Acuerdos de Custodia",
          ],
        },
        {
          title: "Cumplimiento Societario y Laboral",
          items: [
            "Renovación Anual de Matrícula Mercantil ante Cámara de Comercio",
            "Inscripción y Actualización de RUT ante la DIAN",
            "Redacción de Poderes Generales y Especiales Bilingües",
            "Contratación de Personal y Cumplimiento del Código Sustantivo del Trabajo",
          ],
        },
      ],
    },
    education: {
      en: [
        "LL.B. Law Degree — Universidad Pontificia Bolivariana (Medellín, Colombia)",
        "Diploma in Immigration Law & Consular Administrative Procedures",
        "Continuing Legal Education in Colombian Civil Procedure & Labor Shielding",
      ],
      es: [
        "Abogada Titulada — Universidad Pontificia Bolivariana",
        "Diplomado en Derecho Migratorio y Gestión Consular Colombiana",
        "Formación Continua en Derecho Notarial, Laboral y Procesal Civil",
      ],
    },
    quote: {
      en: "Speed and attention to detail make the whole difference when dealing with immigration authorities. We make sure every single paper is bulletproof.",
      es: "La agilidad y el cuidado al mínimo detalle son definitivos ante las autoridades migratorias. Nos aseguramos de que cada documento esté blindado.",
    },
  },
];
