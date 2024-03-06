import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "../slices/SearchSlice";

import moviesApi from "./../api/MoviesApi";
import FavoritesSlice from "../slices/FavoritesSlice";
import HistorySlice from "../slices/HistorySlice";

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
    [FavoritesSlice.name]: FavoritesSlice.reducer,
    [HistorySlice.name]: HistorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
  devTools: {
    enabled: true,
    trace: true,
    traceLimit: 50,
  }
});

export { store };
