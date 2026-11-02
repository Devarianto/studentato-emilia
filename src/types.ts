export type Language = 'EN' | 'IT';
export type DesktopVersion = 'v1' | 'v2';

export interface Room {
  id: string;
  name: string;
  type: 'single_standard' | 'single_deluxe' | 'shared_twin' | 'studio';
  city: string;
  priceMonth: number;
  sizeSqM: number;
  availableFrom: string;
  badge?: string;
  description: {
    EN: string;
    IT: string;
  };
  images: string[];
  features: string[];
  isPopular?: boolean;
}

export interface Review {
  id: string;
  studentName: string;
  university: string;
  city: string;
  roomType: string;
  rating: number;
  date: string;
  avatar: string;
  comment: {
    EN: string;
    IT: string;
  };
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'booking' | 'facilities' | 'payments' | 'location';
  question: {
    EN: string;
    IT: string;
  };
  answer: {
    EN: string;
    IT: string;
  };
}

export interface LocationInfo {
  city: string;
  address: string;
  distanceToCampus: string;
  metroBusAccess: string;
  mapEmbedUrl: string;
  highlights: string[];
  image: string;
}

export interface AmenityItem {
  number: string;
  title: {
    EN: string;
    IT: string;
  };
  desc: {
    EN: string;
    IT: string;
  };
}

export interface SearchFilterState {
  city: string;
  roomType: string;
  maxBudget: number;
  moveInDate: string;
}

export interface CMSPermissions {
  canManageRooms: boolean;
  canEditContent: boolean;
  canManageReviewsFaq: boolean;
  canCustomizeTheme: boolean;
  canManageRolesUsers: boolean;
}

export interface CMSRole {
  id: string;
  name: string;
  badgeColor: string;
  description: string;
  isSystem?: boolean;
  permissions: CMSPermissions;
}

export interface CMSUser {
  id: string;
  username: string;
  name: string;
  email: string;
  roleId: string;
  password?: string;
  pin: string;
  active: boolean;
}

export interface CMSTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  topbarColor: string;
  footerColor: string;
  fontFamily: string;
  defaultDesktopVersion: DesktopVersion;
  defaultLanguage: Language;
  customCss: string;
}

export interface CMSSiteContent {
  contact: {
    topLocationText: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    regionText: string;
    copyright: { EN: string; IT: string };
    tagline: { EN: string; IT: string };
  };
  heroV1: {
    badge: { EN: string; IT: string };
    titleHighlight: { EN: string; IT: string };
    titleSub: { EN: string; IT: string };
    description: { EN: string; IT: string };
    availabilityTag: { EN: string; IT: string };
    heroImage: string;
    cardEyebrow: string;
    cardTitle: string;
    cardSubtitle: string;
    cardPrice: string;
    features: { EN: string[]; IT: string[] };
  };
  heroV2: {
    eyebrow: { EN: string; IT: string };
    headlineMain: { EN: string; IT: string };
    headlineSub: { EN: string; IT: string };
    paragraph: { EN: string; IT: string };
    trustRating: { EN: string; IT: string };
    heroImage: string;
    featuredTitle: string;
    featuredSubtitle: string;
  };
  about: {
    eyebrow: { EN: string; IT: string };
    heading: { EN: string; IT: string };
    paragraph1: { EN: string; IT: string };
    paragraph2: { EN: string; IT: string };
    image: string;
    socialProofRating: { EN: string; IT: string };
    socialProofDesc: { EN: string; IT: string };
    stats: Array<{
      val: string;
      label: { EN: string; IT: string };
    }>;
  };
  offers: {
    eyebrow: { EN: string; IT: string };
    titleHighlight: { EN: string; IT: string };
    titleSub: { EN: string; IT: string };
    desc: { EN: string; IT: string };
    promoCode: string;
    badgeText: string;
    image: string;
  };
  services: {
    eyebrow: { EN: string; IT: string };
    titleHighlight: { EN: string; IT: string };
    titleSub: { EN: string; IT: string };
    subtitle: { EN: string; IT: string };
    showcaseImage: string;
  };
}

export interface CMSData {
  rooms: Room[];
  reviews: Review[];
  faqs: FAQItem[];
  locations: LocationInfo[];
  amenities: AmenityItem[];
  siteContent: CMSSiteContent;
  theme: CMSTheme;
  roles: CMSRole[];
  users: CMSUser[];
}
