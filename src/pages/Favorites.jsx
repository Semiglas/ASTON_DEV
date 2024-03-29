import React from "react";
import MovieList from "../components/MovieList";
import { useFavorites } from "../hooks/useFavorites";
import { Preloader } from "../components/Preloader";

function Favorites() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return <Preloader></Preloader>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-white m-12 text-center font-bold text-xl uppercase">
        У вас пока нет избранного
      </div>
    );
  }
  return (
    <div>
      <MovieList localData={favorites} />
    </div>
  );
}

export default Favorites;
