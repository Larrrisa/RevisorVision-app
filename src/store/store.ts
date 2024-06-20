import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./apiSlice";
import favoritesReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
