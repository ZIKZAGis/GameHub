export interface IGamePreview {
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

// export interface IGame extends IGamePreview {
//   description: string
// }

export interface IGetGame {
  game: IGamePreview | null,
  loading: boolean,
  error: string | null
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

export interface IGetGameList {
  games: IGamePreview[],
  loading: boolean,
  error: string | null
}