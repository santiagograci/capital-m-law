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
  specialties?: {
    en: string[];
    es: string[];
  };
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
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ActionResult<T = unknown> = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};
