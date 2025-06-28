export interface IGamePreview {
  id: number;
  name: string;
  background_image: string;
  genres: NamedEntity[];
  rating: number;
  dominant_color: string;
  saturated_color: string,
  platforms: IPlatform[];
  released: string;
  short_screenshots: IShortScreenshots[]
  stores: IStore[],
  tags: ITag[]
  metacritic: number | null
}

export interface IGame extends IGamePreview {
  description: string,
  description_raw: string,
  website: string,
  background_image_additional: string,
  developers: NamedEntity[]
}

export interface IGetGame {
  game: IGame | null,
  loading: boolean,
  error: string | null
}

export interface IPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  }
}

export interface IShortScreenshots {
  id: number;
  image: string;
}

export interface IGetGameList {
  games: IGamePreview[],
  loading: boolean,
  error: string | null
}

export interface IStore {
  id: number,
  store: {
    id: number,
    name: string,
    slug: string,
    domain: string,
    games_count: number,
    image_background: string
  }
}

export interface ITag {
  id: number,
  name: string,
  slug: string,
  language: string,
  games_count: number,
  image_background: string
}

export type NamedEntity = Omit<ITag, "language">