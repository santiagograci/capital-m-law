export interface NavServiceItem {
  id: string;
  anchorId: string;
  title: string;
  subtitle: string;
  href: string;
  iconKey:
    | "visas"
    | "real-estate"
    | "marriage"
    | "sas"
    | "wills-trusts"
    | "labour-law";
}

export const NAV_SERVICES: NavServiceItem[] = [
  {
    id: "visas",
    anchorId: "visas-immigration",
    title: "Visas & Immigration",
    subtitle: "Colombian visa services & immigration strategies.",
    href: "/services#visas-immigration",
    iconKey: "visas",
  },
  {
    id: "real-estate",
    anchorId: "real-estate-purchase",
    title: "Real Estate Purchase",
    subtitle: "Purchase legal assistance, due diligence & title search.",
    href: "/services#real-estate-purchase",
    iconKey: "real-estate",
  },
  {
    id: "marriage",
    anchorId: "family-prenuptial",
    title: "Marriage & Prenuptial",
    subtitle: "Prenuptial agreements & civil marriage registration.",
    href: "/services#family-prenuptial",
    iconKey: "marriage",
  },
  {
    id: "sas",
    anchorId: "corporate-sas",
    title: "Corporate & SAS Formation",
    subtitle: "Fast-track company setup & foreign investment.",
    href: "/services#corporate-sas",
    iconKey: "sas",
  },
  {
    id: "wills-trusts",
    anchorId: "estate-planning",
    title: "Wills & Estate Planning",
    subtitle: "Asset protection, trusts & international wills.",
    href: "/services#estate-planning",
    iconKey: "wills-trusts",
  },
  {
    id: "labour-law",
    anchorId: "labour-law",
    title: "Labour Law & Employment",
    subtitle: "Employment agreements & workforce compliance.",
    href: "/services#labour-law",
    iconKey: "labour-law",
  },
];
