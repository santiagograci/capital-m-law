export interface LifeMoment {
  id: string;
  title: {
    en: string;
    es: string;
  };
  location: string;
  client: string;
  caption: {
    en: string;
    es: string;
  };
  image: string;
  tag: {
    en: string;
    es: string;
  };
  order: number;
  active: boolean;
  date?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActionResult<T = unknown> = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};
