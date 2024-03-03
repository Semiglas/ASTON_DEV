import React from "react";
import MovieList from "../components/MovieList";
import { useAuthContext } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useFavorites } from "../hooks/useFavorites";
import { Preloader } from "../components/Preloader";

function Favorites() {
  const { favorites } = useFavorites();

  if (!favorites) {
    return <Preloader></Preloader>;
  }

  return (
    <div>
      <MovieList localData={favorites} />
    </div>
  );
}

export default Favorites;
