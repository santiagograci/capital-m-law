import { list, type ListBlobResultBlob } from "@vercel/blob";
import { unstable_cache } from "next/cache";

export const revalidate = 86400; // 24 horas (ISR)

export interface GalleryPhoto {
  url: string;
  pathname: string;
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
    pathname: "gallery/visa-celebration-provenza.jpg",
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
    pathname: "gallery/real-estate-closing-notary-15.jpg",
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
    pathname: "gallery/strategy-session-belen-malibu-hq.jpg",
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
    pathname: "gallery/cedula-extranjeria-delivery-day.jpg",
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

export function mapBlobsToGalleryPhotos(
  blobs: ListBlobResultBlob[]
): GalleryPhoto[] {
  const validBlobs = blobs.filter(
    (b) =>
      b.size > 0 &&
      /\.(jpe?g|png|webp|avif)$/i.test(b.pathname) &&
      !b.pathname.toLowerCase().includes("profile_team_")
  );

  if (validBlobs.length === 0) {
    return photos;
  }

  const usedUrls = new Set<string>();

  // First pass: match blobs by filename/pathname against our 4 cards
  const mappedCards = photos.map((photo) => {
    const fileName = photo.pathname.split("/").pop()?.toLowerCase() ?? "";
    const baseName = fileName.replace(/\.[^.]+$/, "");
    const matchedBlob = validBlobs.find((blob) => {
      const blobName = blob.pathname.split("/").pop()?.toLowerCase() ?? "";
      return blobName === fileName || blobName.startsWith(baseName);
    });

    if (matchedBlob) {
      usedUrls.add(matchedBlob.url);
      return {
        ...photo,
        url: matchedBlob.url,
        pathname: matchedBlob.pathname,
      };
    }

    return photo;
  });

  // Second pass: if any card didn't match by exact filename, assign remaining blobs in order
  const remainingBlobs = validBlobs.filter((b) => !usedUrls.has(b.url));
  let remainingIdx = 0;

  return mappedCards.map((card) => {
    if (card.url.startsWith("/gallery/") && remainingIdx < remainingBlobs.length) {
      const blob = remainingBlobs[remainingIdx++];
      return {
        ...card,
        url: blob.url,
        pathname: blob.pathname,
      };
    }
    return card;
  });
}

const fetchCachedGalleryBlobs = unstable_cache(
  async (): Promise<GalleryPhoto[]> => {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return photos;
    }

    try {
      const response = await list({
        prefix: "gallery/",
        token,
      });
      return mapBlobsToGalleryPhotos(response.blobs);
    } catch (error) {
      console.warn("[gallery] Fallback to local gallery photos:", error);
      return photos;
    }
  },
  ["vercel-blob-gallery-list"],
  { revalidate: 86400, tags: ["gallery-blobs", "life-moments"] }
);

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  return fetchCachedGalleryBlobs();
}
