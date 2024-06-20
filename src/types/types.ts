export interface Photo {
  id: number;
  title: string;
  url: string;
}

export interface Album {
  albumId: number;
  title: string;
  photos: Photo[];
}

export interface User {
  id: number;
  name: string;
  albums: Album[];
}

export interface UsersState {
  entities: User[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface FavoritesState {
  entities: Photo[];
}
