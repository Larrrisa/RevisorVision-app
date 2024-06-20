import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Photo, Album, User, UsersState } from "../types/types";

const initialState: UsersState = {
  entities: [],
  loading: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/users");
  return response.data;
});

export const fetchAlbumsByUser = createAsyncThunk(
  "users/fetchAlbumsByUser",
  async (userId: number) => {
    const response = await axios.get(`/albums/${userId}`);
    return { userId, albums: response.data };
  }
);

export const fetchPhotosByAlbum = createAsyncThunk(
  "users/fetchPhotosByAlbum",
  async (albumId: number) => {
    const response = await axios.get(`/photos/${albumId}`);
    return { albumId, photos: response.data };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchAlbumsByUser.fulfilled, (state, action) => {
        const { userId, albums } = action.payload;
        const user = state.entities.find((user) => user.id === userId);
        if (user) {
          user.albums = albums;
        }
      })
      .addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
        const { albumId, photos } = action.payload;
        state.entities.forEach((user) => {
          user.albums?.forEach((album) => {
            if (album.albumId === albumId) {
              album.photos = photos;
            }
          });
        });
      });
    // .addCase(fetchPhotosByAlbum.fulfilled, (state, action) => {
    //   const { albumId, photos } = action.payload;
    //   const userIndex = state.entities.findIndex((user) =>
    //     user.albums?.some((album) => album.id === albumId)
    //   );
    //   if (userIndex !== -1) {
    //     const albumIndex = state.entities[userIndex].albums?.findIndex(
    //       (album) => album.id === albumId
    //     );
    //     if (albumIndex !== -1) {
    //       state.entities[userIndex].albums![albumIndex].photos = photos;
    //     }
    //   }
    // });
  },
});

export default usersSlice.reducer;
