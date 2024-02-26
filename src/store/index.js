import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "../slices/SearchSlice";

import moviesApi from "./../api/MoviesApi";

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export { store };
