import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo, FavoritesState } from "../types/types";

const initialState: FavoritesState = {
  entities: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Photo>) => {
      if (!state.entities.find((photo) => photo.id === action.payload.id)) {
        state.entities.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.entities = state.entities.filter(
        (photo) => photo.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
