import { createListenerMiddleware } from "@reduxjs/toolkit";
import FavoritesSlice from "../slices/FavoritesSlice";

export const loggerMiddleware = createListenerMiddleware();
loggerMiddleware.startListening({
  actionCreator: FavoritesSlice.actions.removeFavorite,
  effect: () => console.log("removed from favorites"),
});
