export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  rating: number;
}