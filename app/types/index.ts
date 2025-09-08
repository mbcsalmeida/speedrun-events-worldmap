export interface Event {
  id: number;
  title: string;
  link: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  region: string;
  description: string;
}

export interface Translations {
  [key: string]: {
    header: {
      title: string;
      languageToggle: string;
    };
    regions: {
      [key: string]: string;
    };
    eventPopup: {
      visitWebsite: string;
      close: string;
    };
  };
}

export interface RegionBounds {
  north: number;
  south: number;
  east: number;
  west: number;
  center: [number, number];
}

export type Language = 'en' | 'ja';
