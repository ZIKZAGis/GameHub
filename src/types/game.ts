export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  rating: number;
  dominant_color: string;
  parent_platforms: Platform[];
  released: string;
  short_screenshots: ShortScreenshots[]
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface ShortScreenshots {
  id: number;
  image: string;
}