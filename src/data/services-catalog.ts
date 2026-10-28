export interface ServiceDetail {
  id: string;
  slug: string;
  category: "visas" | "real-estate" | "marriage" | "sas" | "wills-trusts" | "labour-law";
  name: { en: string; es: string };
  shortBadge: { en: string; es: string };
  heroHeadline: { en: string; es: string };
  heroSubtitle: { en: string; es: string };
  consultationFee: string;
  leadAttorney: string;
  estimatedTimeline: { en: string; es: string };
  keyHighlights: { en: string[]; es: string[] };
  requirements: {
    en: { title: string; desc: string; icon?: string }[];
    es: { title: string; desc: string; icon?: string }[];
  };
  stepByStepProcess: {
    en: { stepNumber: string; title: string; description: string; firmDeliverable: string }[];
    es: { stepNumber: string; title: string; description: string; firmDeliverable: string }[];
  };
  faq: {
    en: { question: string; answer: string }[];
    es: { question: string; answer: string }[];
  };
}

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: "visas",
    slug: "visas-and-immigration",
    category: "visas",
    name: {
      en: "Visas & Immigration",
      es: "Visas e Inmigración",
    },
    shortBadge: {
      en: "Cancillería & Migración Colombia",
      es: "Cancillería y Migración Colombia",
    },
    heroHeadline: {
      en: "Strategic Immigration Counsel for Your Move or Investment in Colombia",
      es: "Estrategia legal para tu nueva vida o inversión en Colombia",
    },
    heroSubtitle: {
      en: "At Capital M, we do more than fill out forms on a portal. We design comprehensive immigration strategies for individuals, families, and businesses looking to settle or invest in Colombia.",
      es: "En Capital M no nos limitamos a llenar formularios en una plataforma. Diseñamos estrategias migratorias integrales para personas, familias y empresas que buscan establecerse o hacer negocios en Colombia.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "María Fernanda Duarte & Ana María Muñoz",
    estimatedTimeline: {
      en: "15 to 30 Business Days (Cancillería standard)",
      es: "15 a 30 Días Hábiles (Tiempos estándar Cancillería)",
    },
    keyHighlights: {
      en: [
        "Pre-submission audit to eliminate grounds for Consular Requerimientos (Observation notices).",
        "Assistance with official certified translation chains and Hague Apostille verification.",
        "Full support for Cédula de Extranjería scheduling and in-person orientation in Medellín.",
        "Emergency extensions and Salvoconducto (SC-1 & SC-2) filing for urgent deadlines.",
      ],
      es: [
        "Auditoría preventiva previa a radicación para evitar Requerimientos consulares.",
        "Traducciones oficiales certificadas y verificación de cadenas de Apostilla de La Haya.",
        "Acompañamiento en agendamiento y expedición de Cédula de Extranjería en Medellín.",
        "Trámite urgente de prórrogas y Salvoconductos (SC-1 y SC-2) ante vencimiento de términos.",
      ],
    },
    requirements: {
      en: [
        {
          title: "Valid Passport",
          desc: "Original passport with at least 6 months before expiration and at least two blank pages.",
        },
        {
          title: "Certified Bank Statements",
          desc: "Last 3 to 6 months of bank statements demonstrating the minimum legal wage threshold (SMLMV) required for the target visa category.",
        },
        {
          title: "Hague Apostille / Legalization",
          desc: "Criminal background records, marriage certificates, or foreign corporate registries properly apostilled by the issuing authority.",
        },
        {
          title: "Official Translations",
          desc: "All non-Spanish documents translated by a certified official translator registered with the Colombian Ministry of Foreign Affairs.",
        },
        {
          title: "Comprehensive Health Insurance",
          desc: "International coverage policy with medical evacuation, repatriation, and validity matching the requested visa duration.",
        },
      ],
      es: [
        {
          title: "Pasaporte Vigente",
          desc: "Pasaporte original con vigencia mínima de 6 meses y al menos dos páginas en blanco.",
        },
        {
          title: "Extractos Bancarios Certificados",
          desc: "Últimos 3 a 6 meses de extractos bancarios que demuestren solvencia económica según los salarios mínimos (SMLMV) exigidos.",
        },
        {
          title: "Apostilla de La Haya",
          desc: "Antecedentes penales, registros de matrimonio o certificados societarios extranjeros debidamente apostillados en origen.",
        },
        {
          title: "Traducciones Oficiales",
          desc: "Documentos en idioma distinto al español traducidos por traductor oficial certificado ante el Ministerio de Relaciones Exteriores.",
        },
        {
          title: "Póliza de Salud Internacional",
          desc: "Seguro médico con cobertura amplia en Colombia, repatriación y vigencia igual al tiempo de la visa solicitada.",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "Case Assessment & Category Match",
          description:
            "During our 45-minute intake session, we examine your passport stamps, remote employment contracts or investment assets, determining the exact visa category with the highest approval probability under Resolution 5477.",
          firmDeliverable: "Tailored document roadmap & checklist.",
        },
        {
          stepNumber: "02",
          title: "Document Legalization & Pre-Submission Audit",
          description:
            "Our bilingual team reviews your apostilles, certifies official translations, audits bank balance requirements, and drafts your Spanish legal motivational statement.",
          firmDeliverable: "Audit approval & consolidated digital dossier.",
        },
        {
          stepNumber: "03",
          title: "Ministerial Filing & Consular Follow-Through",
          description:
            "We submit the electronic application directly into the Cancillería SITAC platform and handle any ministerial queries or technical clarifications within legal deadlines.",
          firmDeliverable: "Official filing confirmation & submission code.",
        },
        {
          stepNumber: "04",
          title: "Visa Grant & Cédula de Extranjería",
          description:
            "Upon visa issuance, we schedule and accompany you for your biometric appointment at Migración Colombia in Belén to obtain your official foreign resident ID card (Cédula).",
          firmDeliverable: "Physical Cédula de Extranjería in hand.",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Diagnóstico de Perfil y Elección de Categoría",
          description:
            "En la sesión inicial de 45 minutos analizamos sellos migratorios, contratos de trabajo o inversiones para seleccionar la subcategoría de visa con mayor certeza jurídica según la Resolución 5477.",
          firmDeliverable: "Hoja de ruta jurídica y checklist documental personalizado.",
        },
        {
          stepNumber: "02",
          title: "Auditoría Documental y Traducciones Oficiales",
          description:
            "Revisamos cadenas de apostillas, gestionamos traducciones certificadas y redactamos la carta de solicitud motivada conforme a los requerimientos consulares.",
          firmDeliverable: "Dossier digital auditado y validado para radicación.",
        },
        {
          stepNumber: "03",
          title: "Radicación ante Cancillería y Seguimiento",
          description:
            "Ingresamos la solicitud formal en la plataforma SITAC de Cancillería y respondemos oportunamente cualquier observación dentro de los términos de ley.",
          firmDeliverable: "Comprobante oficial de radicación y número de expediente.",
        },
        {
          stepNumber: "04",
          title: "Aprobación y Cédula de Extranjería",
          description:
            "Con la e-visa aprobada, agendamos tu cita presencial ante Migración Colombia en Belén y te orientamos en la toma biométrica para recibir tu Cédula física.",
          firmDeliverable: "Cédula de Extranjería expedida y vigente.",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Can I apply for a Colombian visa while inside Colombia as a tourist?",
          answer:
            "Yes. Most visas (such as Nomad, Investor, or Marriage) can be applied for online from within Colombia, provided you hold legal tourist stay or a valid Salvoconducto at the time of submission.",
        },
        {
          question: "How long does the Cancillería take to issue a decision?",
          answer:
            "Official ministerial regulations specify up to 30 calendar days once all fees are paid, though straightforward cases often resolve in 10 to 15 business days.",
        },
      ],
      es: [
        {
          question: "¿Puedo solicitar la visa mientras estoy en Colombia como turista?",
          answer:
            "Sí. La mayoría de visas (como Nómada Digital, Inversionista o Cónyuge) pueden tramitarse virtualmente dentro del país, siempre que mantengas permanencia regular o un Salvoconducto vigente.",
        },
        {
          question: "¿Cuánto tarda la Cancillería en resolver una solicitud?",
          answer:
            "El término regulatorio es de hasta 30 días calendario una vez cancelado el estudio, aunque trámites con documentación impecable suelen resolverse en 10 a 15 días hábiles.",
        },
      ],
    },
  },
  {
    id: "real-estate",
    slug: "real-estate-transactions",
    category: "real-estate",
    name: {
      en: "Purchase Legal Assistance Service",
      es: "Asistencia Legal en Compra de Propiedad e Inversión",
    },
    shortBadge: {
      en: "Real Estate & Landlord Law",
      es: "Derecho Inmobiliario y Arrendamiento",
    },
    heroHeadline: {
      en: "Secure Your Real Estate Investment in Colombia with Full Legal Protection",
      es: "Protege tu inversión inmobiliaria en Colombia con total tranquilidad legal",
    },
    heroSubtitle: {
      en: "We offer an end-to-end legal service designed to safeguard your capital in Colombia. Due diligence, contract negotiation, foreign exchange compliance, and notary closing.",
      es: "Manejamos un servicio integral diseñado para blindar tu patrimonio en Colombia. Estudio de títulos, promesa de compraventa, registro cambiario y acompañamiento a notaría.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "María Fernanda Duarte",
    estimatedTimeline: {
      en: "5 to 10 Business Days for Title Audit",
      es: "5 a 10 Días Hábiles para Estudio Completo de Títulos",
    },
    keyHighlights: {
      en: [
        "Exhaustive 20-year title audit verifying chain of ownership, encumbrances, and liens.",
        "Municipal tax clearance (Paz y Salvo Predial, Valorización) and building council dues.",
        "Bilingual Promesa de Compraventa drafted with strict default penalty clauses.",
        "Central Bank registration (Formulario 4) to qualify for Real Estate Investor Visas.",
      ],
      es: [
        "Estudio exhaustivo a 20 años verificando tradición, gravámenes, hipotecas y embargos.",
        "Certificaciones de Paz y Salvo municipal (Predial y Valorización) y expensas de copropiedad.",
        "Promesa de compraventa bilingüe con cláusulas penales y de blindaje cambiario.",
        "Registro cambiario ante Banco de la República para respaldo de Visa de Inversionista.",
      ],
    },
    requirements: {
      en: [
        {
          title: "Certificado de Tradición y Libertad",
          desc: "Updated certificate issued within the last 30 days by the Public Instruments Registry Office (Oficina de Registro de Instrumentos Públicos).",
        },
        {
          title: "Preceding Public Deeds (Escrituras)",
          desc: "Copies of historical title deeds from previous conveyances over the 10–20 year search period.",
        },
        {
          title: "Municipal Property Tax Receipts",
          desc: "Recent Predial and Valorización municipal tax bills proving zero municipal debts.",
        },
        {
          title: "HOA / Building Clearance",
          desc: "Paz y Salvo de Administración confirming no arrears with the building council or horizontal property.",
        },
        {
          title: "Seller Identification",
          desc: "Cédula de Ciudadanía of current owners, marital status certificates, or Chamber of Commerce cert if the seller is a corporate entity.",
        },
      ],
      es: [
        {
          title: "Certificado de Tradición y Libertad",
          desc: "Certificado expedido con vigencia menor a 30 días por la Oficina de Registro de Instrumentos Públicos.",
        },
        {
          title: "Escrituras Públicas Anteriores",
          desc: "Copias de las escrituras matrices y de transferencias anteriores correspondientes a la cadena de tradición a 20 años.",
        },
        {
          title: "Paz y Salvo Predial y Valorización",
          desc: "Comprobantes de pago de impuestos municipales que certifiquen paz y salvo fiscal sobre el inmueble.",
        },
        {
          title: "Paz y Salvo de Administración",
          desc: "Certificado emitido por la administración de la copropiedad confirmando que no existen cuotas ordinarias ni extraordinarias pendientes.",
        },
        {
          title: "Identificación de los Vendedores",
          desc: "Copia de cédulas, estado civil de los propietarios o Certificado de Existencia y Representación si el vendedor es persona jurídica.",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "20-Year Title Search & Forensic Audit",
          description:
            "We inspect the full chain of titles, verifying that previous owners properly transferred rights, ensuring no pending mortgages, judicial attachments, heritage reserves, or uncancelled easements exist.",
          firmDeliverable: "Comprehensive Written Title Audit Report (Concepto Jurídico de Títulos).",
        },
        {
          stepNumber: "02",
          title: "Protective Promise of Sale (Promesa de Compraventa)",
          description:
            "We draft or negotiate a bilingual purchase contract that specifies exact delivery dates, payment escrow mechanisms, clear defect warranties, and penalty clauses for non-performance.",
          firmDeliverable: "Fully drafted and vetted bilateral purchase contract.",
        },
        {
          stepNumber: "03",
          title: "Closing Coordination at Public Notary",
          description:
            "We coordinate with the Notaría in Medellín, verify draft deed language (*minuta notarial*), and assist in currency exchange documentation (*Formulario 4* Banco de la República).",
          firmDeliverable: "Representation and notarization of the Escritura Pública.",
        },
        {
          stepNumber: "04",
          title: "Public Registry Filing & Final Title Transfer",
          description:
            "We oversee the payment of transfer taxes (derechos de registro and beneficencia) and confirm the final recording before the Oficina de Registro de Instrumentos Públicos.",
          firmDeliverable: "New Certificado de Tradición listing you as the 100% legal titleholder.",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Estudio Forense de Títulos a 20 Años",
          description:
            "Analizamos la cadena de tradición completa para verificar transferencias previas, descartar hipotecas ocultas, embargos, pleitos pendientes o patrimonio de familia inembargable.",
          firmDeliverable: "Concepto Jurídico Escrito de Viabilidad de Títulos.",
        },
        {
          stepNumber: "02",
          title: "Redacción Blindada de la Promesa de Compraventa",
          description:
            "Elaboramos o ajustamos el contrato bilingüe de promesa con cláusulas estrictas de cumplimiento, fechas de entrega, mecanismos de pago y sanciones por incumplimiento.",
          firmDeliverable: "Promesa de compraventa perfeccionada y acordada entre las partes.",
        },
        {
          stepNumber: "03",
          title: "Acompañamiento en Notaría y Escrituración",
          description:
            "Revisamos la minuta notarial, coordinamos la firma ante Notaría Pública en Medellín y gestionamos el registro cambiario Formulario 4 ante el Banco de la República.",
          firmDeliverable: "Firma formal de la Escritura Pública de Compraventa.",
        },
        {
          stepNumber: "04",
          title: "Registro de Instrumentos Públicos y Entrega",
          description:
            "Radicamos y hacemos seguimiento al pago de registro y beneficencia hasta la inscripción definitiva en la Oficina de Registro.",
          firmDeliverable: "Certificado de Tradición definitivo con titularidad a tu nombre.",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Can foreigners buy property in Colombia under their own name?",
          answer:
            "Yes. Colombian law grants foreigners the exact same property ownership rights as Colombian nationals, with zero restrictions on percentage of ownership.",
        },
        {
          question: "Does buying real estate qualify me for an Investor Visa?",
          answer:
            "Yes, if the registered purchase value meets or exceeds the minimum SMLMV threshold (around 350 SMLMV for an M Visa) and the foreign funds are declared via Central Bank exchange channels.",
        },
      ],
      es: [
        {
          question: "¿Los extranjeros pueden comprar propiedades en Colombia a su propio nombre?",
          answer:
            "Sí. La ley colombiana otorga a los ciudadanos extranjeros exactamente los mismos derechos de propiedad privada que a los nacionales, sin límites de porcentaje.",
        },
        {
          question: "¿Comprar una propiedad me otorga derecho a una Visa de Inversionista?",
          answer:
            "Sí, siempre que el valor escriturado alcance el mínimo legal en salarios mínimos (aproximadamente 350 SMLMV para Visa M) y las divisas se hayan canalizado vía Banco de la República.",
        },
      ],
    },
  },
  {
    id: "marriage",
    slug: "marriage-and-prenups",
    category: "marriage",
    name: {
      en: "Marriage & Prenuptial Agreements",
      es: "Matrimonio, Capitulaciones y Familia",
    },
    shortBadge: {
      en: "Family Law & Prenuptial Strategies",
      es: "Derecho de Familia y Capitulaciones",
    },
    heroHeadline: {
      en: "Protecting Your Family and Assets at Every Stage of Life",
      es: "Protege a tu familia y tu patrimonio en cada etapa de la vida",
    },
    heroSubtitle: {
      en: "Empathetic, rigorous, and clear legal counsel for local and international families in Colombia.",
      es: "Acompañamiento legal empático, riguroso y transparente para parejas y familias locales e internacionales en Colombia.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "Ana María Muñoz",
    estimatedTimeline: {
      en: "3 to 10 Business Days",
      es: "3 a 10 Días Hábiles",
    },
    keyHighlights: {
      en: [
        "Enforceable prenuptial contracts (*Capitulaciones*) drafted before civil marriage.",
        "Civil marriage protocolization before verified Medellín Public Notaries.",
        "Foreign marriage certificate registration into the Colombian National Registry.",
        "Seamless transition into the Colombian Spouse Migrant Visa (Visa M Cónyuge).",
      ],
      es: [
        "Capitulaciones matrimoniales y patrimoniales con plena validez notarial.",
        "Protocolización expedita de matrimonio civil ante Notarías Públicas de Medellín.",
        "Inscripción de matrimonios extranjeros en el Registro Civil de Colombia.",
        "Enlace directo con la solicitud de Visa de Cónyuge o Compañero Permanente (Visa M).",
      ],
    },
    requirements: {
      en: [
        {
          title: "Birth Certificates with Apostille",
          desc: "Foreign partner must provide a long-form birth certificate apostilled in their country of origin and officially translated.",
        },
        {
          title: "Single Status Certificate",
          desc: "Certificate of no impediment or sworn affidavit of single status (Certificado de Soltería) apostilled and translated.",
        },
        {
          title: "Divorce Decrees (if previously married)",
          desc: "Certified, apostilled, and translated copy of final divorce judgments or annulment decrees.",
        },
        {
          title: "Colombian Partner's Documents",
          desc: "Original copy of civil birth certificate valid for marriage (expedido para matrimonio) and Cédula de Ciudadanía.",
        },
        {
          title: "Inventory of Pre-marital Assets",
          desc: "Comprehensive list of real estate, company shares, bank accounts, and debts to be excluded from the conjugal society.",
        },
      ],
      es: [
        {
          title: "Registro Civil de Nacimiento Apostillado",
          desc: "Para el contrayente extranjero: copia íntegra de nacimiento con Apostilla del país de origen y traducción oficial.",
        },
        {
          title: "Certificado de Soltería",
          desc: "Declaración juramentada o certificado oficial de estado civil soltero, debidamente apostillado y traducido.",
        },
        {
          title: "Sentencias de Divorcio (si aplica)",
          desc: "Copia auténtica, apostillada y traducida de la sentencia o escritura de divorcio anterior.",
        },
        {
          title: "Documentos del Contrayente Colombiano",
          desc: "Registro civil de nacimiento expedido para matrimonio (vigencia menor a 3 meses) y cédula de ciudadanía.",
        },
        {
          title: "Relación de Bienes para Capitulaciones",
          desc: "Inventario detallado de activos, cuentas, inmuebles o participaciones que se excluirán de la sociedad conyugal.",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "Asset Structuring & Prenuptial Drafting",
          description:
            "Under Colombian Civil Code, failure to sign capitulaciones before marriage results in the automatic creation of a conjugal society (sociedad conyugal). We draft an ironclad prenuptial agreement protecting your pre-existing wealth.",
          firmDeliverable: "Bilingual Capitulaciones Matrimoniales draft.",
        },
        {
          stepNumber: "02",
          title: "Notary Edicto & Document Review",
          description:
            "We submit all foreign apostilles and Colombian birth certificates to the Public Notary for mandatory public notice publication (Edicto matrimonial).",
          firmDeliverable: "Formal approval of marriage dossier by the Notary.",
        },
        {
          stepNumber: "03",
          title: "Deed Execution & Marriage Ceremony",
          description:
            "We coordinate the in-person signing of both the Capitulaciones deed and the marriage ceremony with certified bilingual legal interpretation if required.",
          firmDeliverable: "Escritura Pública de Capitulaciones and Matrimonio.",
        },
        {
          stepNumber: "04",
          title: "Civil Registry Issuance & Spouse Visa Prep",
          description:
            "We expedite the Colombian Marriage Civil Registry and prepare your immigration application for the 3-year Colombian Spouse Visa.",
          firmDeliverable: "Official Colombian Marriage Certificate & Visa filing pack.",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Estructuración Patrimonial y Capitulaciones",
          description:
            "Si no se firman capitulaciones antes del matrimonio, se crea automáticamente la sociedad conyugal sobre los frutos de los bienes. Redactamos un acuerdo blindado que excluye tus activos preexistentes.",
          firmDeliverable: "Borrador bilingüe de Escritura de Capitulaciones Matrimoniales.",
        },
        {
          stepNumber: "02",
          title: "Revisión Notarial y Fijación de Edicto",
          description:
            "Radicamos la documentación apostillada y traducida ante la Notaría Pública en Medellín para la publicación del edicto de ley.",
          firmDeliverable: "Aprobación formal del expediente matrimonial notarial.",
        },
        {
          stepNumber: "03",
          title: "Firma de Escritura y Ceremonia Matrimonial",
          description:
            "Acompañamos la firma de las Capitulaciones (previa a la boda) y la celebración formal del matrimonio con traducción simultánea si es necesario.",
          firmDeliverable: "Escrituras Públicas de Capitulaciones y de Matrimonio Civil.",
        },
        {
          stepNumber: "04",
          title: "Registro Civil de Matrimonio y Vía de Visa",
          description:
            "Tramitamos el Registro Civil de Matrimonio colombiano y estructuramos la solicitud de Visa de Cónyuge (Visa M) por 3 años.",
          firmDeliverable: "Certificado de Registro Civil y expediente de visa estructurado.",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Can prenuptial agreements be signed after we get married?",
          answer:
            "No. Under Colombian law, Capitulaciones must strictly be executed by public deed BEFORE the wedding ceremony takes place. Once married, asset separation requires a formal judicial or notarial dissolution.",
        },
        {
          question: "Can an expat marry on a tourist permit in Colombia?",
          answer:
            "Yes, you do not need a resident visa to marry in Colombia; a valid passport with a current tourist entry stamp (PT) is fully acceptable.",
        },
      ],
      es: [
        {
          question: "¿Se pueden firmar capitulaciones después de casados?",
          answer:
            "No. En el derecho colombiano las capitulaciones deben otorgarse obligatoriamente por escritura pública ANTES del matrimonio. Con posterioridad a la boda, solo es posible la disolución de sociedad conyugal.",
        },
        {
          question: "¿Un extranjero puede casarse en Colombia con permiso de turista?",
          answer:
            "Sí, no se requiere visa de residente para contraer matrimonio civil; un pasaporte vigente con sello de permiso de turismo regular es totalmente válido.",
        },
      ],
    },
  },
  {
    id: "sas",
    slug: "sas-company-incorporation",
    category: "sas",
    name: {
      en: "SAS Company Formation & Corporate Law",
      es: "Constitución de Sociedades SAS y Derecho Corporativo",
    },
    shortBadge: {
      en: "Chamber of Commerce & Tax ID Setup",
      es: "Cámara de Comercio y RUT ante la DIAN",
    },
    heroHeadline: {
      en: "Establish Your Business in Colombia with Zero Bureaucracy",
      es: "Crea tu Empresa en Colombia con Máxima Agilidad Legal",
    },
    heroSubtitle: {
      en: "The Simplified Stock Corporation (SAS) is Colombia's most versatile legal vehicle for foreign entrepreneurs, digital agencies, real estate holding entities, and venture-backed startups.",
      es: "La Sociedad por Acciones Simplificada (SAS) es el vehículo corporativo ideal para inversionistas extranjeros, empresas de tecnología, agencias y holdings inmobiliarios en Colombia.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "María Fernanda Duarte & Ana María Muñoz",
    estimatedTimeline: {
      en: "5 to 8 Business Days",
      es: "5 a 8 Días Hábiles",
    },
    keyHighlights: {
      en: [
        "100% foreign ownership allowed with a single natural or corporate shareholder.",
        "Custom bilingual bylaws tailored to international investment and IP protection.",
        "Full Chamber of Commerce (Cámara de Comercio) registration and certificate.",
        "DIAN Tax ID (RUT) creation and foreign exchange bank account onboarding support.",
      ],
      es: [
        "Permite 100% de accionistas extranjeros, incluso con un único accionista.",
        "Estatutos bilingües diseñados para protección patrimonial y propiedad intelectual.",
        "Matrícula mercantil completa en Cámara de Comercio con certificado de existencia.",
        "Inscripción de RUT ante la DIAN y acompañamiento en apertura de cuenta bancaria.",
      ],
    },
    requirements: {
      en: [
        {
          title: "Shareholder Information",
          desc: "Valid passport copies of natural person shareholders, or Chamber certificate and power of attorney if owned by an overseas company.",
        },
        {
          title: "Corporate Name Options",
          desc: "3 preferred company names to conduct pre-clearance against the national trade name registry (RUES).",
        },
        {
          title: "Registered Business Address",
          desc: "Commercial address in Medellín or another Colombian city for official administrative and tax notifications.",
        },
        {
          title: "Designation of Legal Representative",
          desc: "Appointment of a principal and alternate legal representative (natural person holding legal capacity in Colombia).",
        },
        {
          title: "Subscribed Share Capital",
          desc: "Definition of authorized, subscribed, and paid-in capital and breakdown of share classes (ordinary, preferential, or non-voting).",
        },
      ],
      es: [
        {
          title: "Identificación de los Accionistas",
          desc: "Copia de pasaportes vigentes para personas naturales, o certificado de constitución y poder si el accionista es persona jurídica extranjera.",
        },
        {
          title: "Opciones de Razón Social",
          desc: "Tres opciones de nombre comercial para verificar homonimia previa en el registro nacional (RUES).",
        },
        {
          title: "Domicilio Social",
          desc: "Dirección física en Medellín o Colombia para efectos de notificaciones judiciales y tributarias.",
        },
        {
          title: "Representante Legal",
          desc: "Designación del representante legal principal y suplente con facultades contractuales definidas.",
        },
        {
          title: "Capital Social y Acciones",
          desc: "Monto de capital autorizado, suscrito y pagado, junto con la distribución y clases de acciones.",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "Bylaw Customization & RUES Name Clearance",
          description:
            "We verify trade name availability, draft custom bylaws (estatutos) including dispute arbitration clauses, single-shareholder governance rules, and clear corporate purpose scopes.",
          firmDeliverable: "Approved bilingual estatutos constitutivos.",
        },
        {
          stepNumber: "02",
          title: "Chamber of Commerce Incorporation",
          description:
            "We file the private incorporation document before the Cámara de Comercio de Medellín, paying the local registration tax and generating your legal existence certificate.",
          firmDeliverable: "Certificado de Existencia y Representación Legal.",
        },
        {
          stepNumber: "03",
          title: "DIAN Tax Identification (RUT)",
          description:
            "We register the company before the national tax authority (DIAN) to generate the permanent Tax ID (NIT) and assign your corporate economic activity codes (CIIU).",
          firmDeliverable: "Official RUT certificate with active corporate NIT.",
        },
        {
          stepNumber: "04",
          title: "Bank Account & Inward Investment Filing",
          description:
            "We prepare the compliance file (SAGRILAFT/AML) for opening a corporate bank account in Colombia and file Formulario 4 for foreign capital registration.",
          firmDeliverable: "Corporate bank onboarding package & Central Bank registration.",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Verificación de Homonimia y Estatutos a Medida",
          description:
            "Validamos la disponibilidad del nombre en RUES y redactamos estatutos constitutivos protegiendo las facultades de los socios y definiendo el objeto social.",
          firmDeliverable: "Documento privado de constitución y estatutos aprobados.",
        },
        {
          stepNumber: "02",
          title: "Inscripción en Cámara de Comercio",
          description:
            "Radicamos la constitución formal ante la Cámara de Comercio de Medellín, liquidando los derechos de registro y obteniendo la matrícula mercantil.",
          firmDeliverable: "Certificado de Existencia y Representación Legal con matrícula activa.",
        },
        {
          stepNumber: "03",
          title: "Obtención del RUT y NIT ante la DIAN",
          description:
            "Gestionamos la inscripción tributaria ante la DIAN, asignando el Número de Identificación Tributaria (NIT) y códigos de actividad económica (CIIU).",
          firmDeliverable: "Formulario Oficial del RUT definitivo emitido por la DIAN.",
        },
        {
          stepNumber: "04",
          title: "Apertura Bancaria y Registro de Inversión",
          description:
            "Organizamos el expediente de beneficiarios finales (SAGRILAFT) para apertura de cuenta bancaria corporativa y canalización cambiaria de capitales.",
          firmDeliverable: "Dossier bancario y registro de inversión extranjera ante Banco Central.",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Does the legal representative of a SAS need to be a Colombian citizen?",
          answer:
            "No, but they must hold legal residency and a valid Cédula de Extranjería in Colombia, or have legal capacity to sign official administrative and tax declarations.",
        },
        {
          question: "Can incorporating a SAS qualify me for a Business Visa?",
          answer:
            "Yes, incorporating a SAS and capitalizing it with at least 100 SMLMV of registered foreign capital makes you eligible to petition for the Visa M Socio o Propietario.",
        },
      ],
      es: [
        {
          question: "¿El representante legal de una SAS debe ser colombiano?",
          answer:
            "No necesariamente, pero debe contar con capacidad legal para obligarse en el país y contar con Cédula de Extranjería vigente o documento legal autorizado para firmar ante DIAN.",
        },
        {
          question: "¿Crear una SAS me permite solicitar una Visa de Negocios?",
          answer:
            "Sí, constituir una SAS y registrar inversión extranjera superior a 100 salarios mínimos (SMLMV) te habilita para solicitar la Visa M Socio o Propietario de Empresa.",
        },
      ],
    },
  },
  {
    id: "wills-trusts",
    slug: "wills-and-trusts",
    category: "wills-trusts",
    name: {
      en: "Wills, Trusts & Estate Planning",
      es: "Testamentos, Fideicomisos y Planeación Patrimonial",
    },
    shortBadge: {
      en: "Estate Planning & Asset Protection",
      es: "Planeación Patrimonial y Blindaje",
    },
    heroHeadline: {
      en: "Prepare Your Legacy for the Future and Protect What Matters Most",
      es: "Prepara tu patrimonio para el futuro y protege a quienes más amas",
    },
    heroSubtitle: {
      en: "Transparent, forward-thinking estate planning in Colombia to safeguard your assets and ensure your exact wishes are honored.",
      es: "Estructuración legal anticipada, transparente y sin burocracia para proteger tus activos en Colombia y garantizar que tu voluntad se cumpla punto por punto.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "María Fernanda Duarte & Ana María Muñoz",
    estimatedTimeline: {
      en: "2 to 4 Weeks for Notarial Protocolization",
      es: "2 a 4 Semanas para Protocolización Notarial",
    },
    keyHighlights: {
      en: [
        "Open & Closed Wills drafted in strict compliance with Colombian Civil Code formal requirements.",
        "Fiducia Civil setup for direct property transfer to designated heirs without judicial succession.",
        "Cross-border estate harmonization between US/EU revocable living trusts and Colombian assets.",
        "Full representation before Medellín Notaries for consensual inheritance partition.",
      ],
      es: [
        "Testamentos solemnes abiertos y cerrados con pleno cumplimiento de las legítimas rigurosas.",
        "Constitución de Fiducia Civil para transferencia directa de bienes sin proceso sucesorio.",
        "Armonización de trusts extranjeros y testamentos foráneos con bienes en Colombia.",
        "Representación completa ante Notarías de Medellín para partición y adjudicación de herencias.",
      ],
    },
    requirements: {
      en: [
        {
          title: "Identification & Civil Status",
          desc: "Valid passport or Cédula de Extranjería, marriage certificate, and official identification of heirs.",
        },
        {
          title: "Property Deeds & Asset Inventories",
          desc: "Certificados de Tradición y Libertad, property tax receipts (paz y salvo predial), and bank balances.",
        },
        {
          title: "Foreign Estate Documents (if applicable)",
          desc: "Existing foreign wills or trust agreements with apostilles and certified official translations.",
        },
        {
          title: "Witness Qualifications",
          desc: "For open wills (testamento público), three qualified adult witnesses not related to beneficiaries.",
        },
      ],
      es: [
        {
          title: "Identificación y Estado Civil",
          desc: "Pasaporte vigente o Cédula de Extranjería, registro civil de matrimonio y documento de los herederos.",
        },
        {
          title: "Títulos de Propiedad e Inventario",
          desc: "Certificados de Tradición y Libertad de inmuebles, paz y salvo predial y saldos bancarios.",
        },
        {
          title: "Documentos Foráneos (si aplica)",
          desc: "Testamentos o trusts extranjeros con apostilla y traducción oficial certificada.",
        },
        {
          title: "Testigos Hábiles",
          desc: "Para testamentos abiertos, presencia de tres testigos hábiles sin parentesco con los herederos.",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "Diagnostic & Asset Audit",
          description:
            "We analyze your family hierarchy, Colombian property assets, and foreign holdings against mandatory Colombian inheritance rules (Legítimas rigurosas).",
          firmDeliverable: "Comprehensive Estate Blueprint & Strategy Memorandum",
        },
        {
          stepNumber: "02",
          title: "Document Drafting & Vetting",
          description:
            "We draft the bilingual will text, trust indenture (Fiducia Civil), or partition deed tailored to protect your intended beneficiaries.",
          firmDeliverable: "Draft Testamentary Deed & Bilingual Executive Summary",
        },
        {
          stepNumber: "03",
          title: "Notarial Execution & Protocolization",
          description:
            "Our attorneys coordinate and accompany you to the Notaría in Medellín for official solemn execution, signature, and public deed issuance.",
          firmDeliverable: "Official Registered Public Deed (Escritura Pública)",
        },
        {
          stepNumber: "04",
          title: "Public Registry Filing",
          description:
            "We record real estate transfers or encumbrances with the Public Registry Office (Oficina de Registro de Instrumentos Públicos).",
          firmDeliverable: "Updated Certificado de Tradición y Libertad with Recorded Encumbrance",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Diagnóstico y Auditoría Patrimonial",
          description:
            "Analizamos tu composición familiar, bienes en Colombia y patrimonio foráneo frente a las asignaciones forzosas del Código Civil.",
          firmDeliverable: "Hoja de Ruta Sucesoral y Dictamen Estratégico",
        },
        {
          stepNumber: "02",
          title: "Elaboración de Minutas y Estatutos",
          description:
            "Redactamos la minuta de testamento solemne, contrato de fiducia civil o partición hereditaria con cláusulas de protección.",
          firmDeliverable: "Minuta Notarial y Resumen Ejecutivo Bilingüe",
        },
        {
          stepNumber: "03",
          title: "Firma y Protocolización Notarial",
          description:
            "Coordinamos y te acompañamos a la Notaría en Medellín para la lectura, firma solemne y protocolización de la escritura pública.",
          firmDeliverable: "Copia Auténtica de Escritura Pública Registrada",
        },
        {
          stepNumber: "04",
          title: "Inscripción en Registro de Instrumentos Públicos",
          description:
            "Radicamos y hacemos seguimiento a la inscripción del acto o gravamen en la Oficina de Registro de Instrumentos Públicos.",
          firmDeliverable: "Certificado de Tradición y Libertad con Anotación de Registro",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Can a foreigner leave their Colombian property to anyone in a will?",
          answer:
            "Colombian law includes forced heirship rules (legítimas rigurosas) prioritizing children and spouses. However, 50% of the estate (libre disposición) can be distributed freely, and civil trusts can offer alternative structuring options.",
        },
        {
          question: "Is a US or Canadian will valid for real estate in Colombia?",
          answer:
            "While foreign wills can be recognized via exequatur before the Colombian Supreme Court, the process is lengthy (1-2 years). Executing a local Colombian will or Fiducia Civil is significantly faster, cheaper, and safer.",
        },
      ],
      es: [
        {
          question: "¿Un extranjero puede dejar sus propiedades en Colombia a cualquier persona?",
          answer:
            "La legislación colombiana protege a los herederos forzosos (hijos y cónyuge). Sin embargo, el 50% del patrimonio es de libre disposición y figuras como la Fiducia Civil permiten estructurar transferencias eficientes.",
        },
        {
          question: "¿Un testamento de EE.UU. o Canadá es válido en Colombia?",
          answer:
            "Aunque puede homologarse mediante trámite de exequátur ante la Corte Suprema, el proceso tarda entre 1 y 2 años. Otorgar un testamento en Notaría colombiana o constituir una Fiducia Civil es mucho más rápido y económico.",
        },
      ],
    },
  },
  {
    id: "labour-law",
    slug: "labour-law",
    category: "labour-law",
    name: {
      en: "Labour Law & Employment Compliance",
      es: "Derecho Laboral y Cumplimiento de Empleo",
    },
    shortBadge: {
      en: "Workforce & UGPP Shield",
      es: "Blindaje Laboral y UGPP",
    },
    heroHeadline: {
      en: "Strategic Employment Law: Hire Talent in Colombia with Total Legal Confidence",
      es: "Gestión laboral estratégica: Contrata talento en Colombia con seguridad jurídica",
    },
    heroSubtitle: {
      en: "Balancing business agility and local labor compliance. Customized employment contracts, RIT, terminations, and statutory severance under Colombian law.",
      es: "Contratación equilibrada y cumplimiento de la legislación local. Redacción de contratos, Reglamentos Internos de Trabajo (RIT), liquidaciones y debido proceso.",
    },
    consultationFee: "$67 USD",
    leadAttorney: "María Fernanda Duarte & Ana María Muñoz",
    estimatedTimeline: {
      en: "3 to 5 Business Days for Contract Drafting",
      es: "3 a 5 Días Hábiles para Elaboración de Contratos",
    },
    keyHighlights: {
      en: [
        "Bilingual employment agreements (Indefinite, Fixed-Term, Remote Work / Teletrabajo).",
        "Independent contractor agreements (Prestación de Servicios) drafted to avoid disguised employment risks (Contrato Realidad).",
        "Severance audits (Cesantías, Intereses, Prima de Servicios, Vacaciones) and settlement release deeds (Actas de Transacción).",
        "Defense against UGPP audits, debt determinations, and penalty reduction appeals.",
      ],
      es: [
        "Contratos de trabajo bilingües a término fijo, indefinido, obra o labor y teletrabajo.",
        "Contratos de prestación de servicios independientes blindados contra el riesgo de Contrato Realidad.",
        "Liquidación de prestaciones sociales (cesantías, primas, vacaciones) y actas de transacción laboral.",
        "Defensa jurídica ante requerimientos para declarar y pliegos de cargos de la UGPP.",
      ],
    },
    requirements: {
      en: [
        {
          title: "Corporate Registration & Tax ID",
          desc: "Chamber of Commerce Certificate (Cámara de Comercio) and DIAN tax certificate (RUT).",
        },
        {
          title: "Proposed Job Description & Compensation",
          desc: "Detail of base salary, non-salary benefits, working hours, and physical/remote work modalities.",
        },
        {
          title: "Employee Documentation",
          desc: "Cédula de Ciudadanía, Cédula de Extranjería with work permit, and Social Security affiliation history (PILA).",
        },
        {
          title: "Internal Work Regulations (for 5+ employees)",
          desc: "Company Internal Work Regulations (Reglamento Interno de Trabajo) and hygiene policies.",
        },
      ],
      es: [
        {
          title: "Certificado de Cámara de Comercio y RUT",
          desc: "Certificado de Existencia y Representación Legal de la empresa y Registro Único Tributario.",
        },
        {
          title: "Perfil del Cargo y Esquema de Remuneración",
          desc: "Descripción de funciones, salario básico, pagos no constitutivos de salario y modalidad presencial/remota.",
        },
        {
          title: "Documentos del Trabajador",
          desc: "Cédula de Ciudadanía o Cédula de Extranjería con visa que autorice trabajar e historial de PILA.",
        },
        {
          title: "Reglamento Interno de Trabajo",
          desc: "Reglamento Interno de Trabajo (obligatorio para empresas con más de 5 trabajadores).",
        },
      ],
    },
    stepByStepProcess: {
      en: [
        {
          stepNumber: "01",
          title: "Employment Diagnostic & Risk Assessment",
          description:
            "We analyze your hiring structure, contractor relationships, and payroll configuration to identify Contrato Realidad exposure or UGPP audit risks.",
          firmDeliverable: "Labor Compliance & Liability Audit Memorandum",
        },
        {
          stepNumber: "02",
          title: "Bilingual Contract Drafting & Structuring",
          description:
            "We draft customized employment or contractor contracts with confidentiality, IP assignment, non-compete, and non-salary bonus clauses.",
          firmDeliverable: "Complete Bilingual Employment / Contractor Pack",
        },
        {
          stepNumber: "03",
          title: "Payroll & Social Security Onboarding (PILA)",
          description:
            "We verify compliant registration with Health (EPS), Pension (AFP), Severance (Cesantías), and Occupational Risk (ARL) administrators.",
          firmDeliverable: "Social Security Affiliation Checklist & Compliance Record",
        },
        {
          stepNumber: "04",
          title: "Termination, Severance & Mutual Exit Releases",
          description:
            "When ending employment, we calculate statutory indemnities and draft enforceable settlement deeds (Acta de Transacción / Conciliación) preventing future claims.",
          firmDeliverable: "Liquidación Definitiva & Enforceable Release Agreement",
        },
      ],
      es: [
        {
          stepNumber: "01",
          title: "Diagnóstico Laboral y Mitigación de Riesgos",
          description:
            "Evaluamos tu estructura de contratación, pagos a contratistas y esquema de nómina para eliminar contingencias de Contrato Realidad y UGPP.",
          firmDeliverable: "Informe de Auditoría Laboral y Mapa de Riesgos",
        },
        {
          stepNumber: "02",
          title: "Elaboración de Contratos y Acuerdos Bilingües",
          description:
            "Redactamos contratos a la medida con cláusulas de propiedad intelectual, confidencialidad, pactos de desalarización y metas claras.",
          firmDeliverable: "Paquete Contractual Laboral Bilingüe Completo",
        },
        {
          stepNumber: "03",
          title: "Afiliación y Cumplimiento en Seguridad Social",
          description:
            "Verificamos la afiliación correcta a EPS, fondo de pensiones, caja de compensación y ARL según el nivel de riesgo de la actividad.",
          firmDeliverable: "Checklist de Afiliación y Planilla Integrada PILA",
        },
        {
          stepNumber: "04",
          title: "Liquidaciones y Acuerdos de Terminación",
          description:
            "Calculamos liquidaciones finales y estructuramos actas de transacción laboral de mutuo acuerdo ante Notaría para evitar demandas.",
          firmDeliverable: "Liquidación Laboral Definitiva y Acta de Transacción Blindada",
        },
      ],
    },
    faq: {
      en: [
        {
          question: "Can I hire a Colombian worker as an independent contractor instead of an employee?",
          answer:
            "Only if they operate with true technical autonomy, provide their own equipment, and are not subject to continuous subordination or fixed work schedules. Otherwise, Colombian courts will reclassify the relationship as an employment contract with retroactive liability.",
        },
        {
          question: "What social security benefits must employers pay in Colombia?",
          answer:
            "Employers must contribute to Health (8.5%), Pension (12%), ARL workplace insurance (0.522% to 6.96%), and Caja de Compensación (4%), plus semi-annual bonuses (Prima), severance (Cesantías + 12% interest), and 15 days of paid vacation per year.",
        },
      ],
      es: [
        {
          question: "¿Puedo contratar a un trabajador como contratista independiente en vez de empleado?",
          answer:
            "Únicamente si cuenta con autonomía técnica, no tiene horario fijo ni subordinación continua. Si existen llamados de atención o control de horario, los jueces declaran el Contrato Realidad con sanciones retroactivas.",
        },
        {
          question: "¿Cuáles son las prestaciones sociales obligatorias a cargo del empleador?",
          answer:
            "El empleador debe aportar a salud (8.5%), pensión (12%), ARL y Caja de Compensación (4%), además de pagar Prima de Servicios, Cesantías con intereses del 12% anual y 15 días hábiles de vacaciones.",
        },
      ],
    },
  },
];
