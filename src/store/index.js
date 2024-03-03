import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "../slices/SearchSlice";

import moviesApi from "./../api/MoviesApi";
import FavoritesSlice from "../slices/FavoritesSlice";

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
    [FavoritesSlice.name]: FavoritesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export { store };
