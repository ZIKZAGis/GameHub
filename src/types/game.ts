export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  rating: number;
  dominant_color: string;
  platforms: Platform[];
  released: string;
  short_screenshots: ShortScreenshots[]
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  }
}

export interface ShortScreenshots {
  id: number;
  image: string;
}