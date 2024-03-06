import React from "react";
import { useFetchAllMoviesQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";
import MovieComponent from "./MovieComponent";
import { useFavorites } from "../hooks/useFavorites";
import { useAuthContext } from "../contexts/AuthContext";

function MovieList({ localData }) {
  console.log('im being rendered at least')
  let data = localData;
  const { isLoading, favorites } = useFavorites();
  const { user } = useAuthContext();

  if (isLoading && user) {
    return <Preloader></Preloader>;
  }

  if (!isLoading && data) {
    const filteredData = data.filter((e) => {
      return Boolean(e.description && e.year);
    });
    data = filteredData;
  }

  console.log(data);
  const dataToRender = data?.map((movie) => (
    <MovieComponent
      key={movie.id}
      name={movie.name || movie.title}
      description={movie.description}
      rating={movie.rating.kp}
      genre={movie.genres || movie.genre}
      year={movie.year}
      img={
        movie.backdrop?.url ||
        movie?.img ||
        "https://jammykam.files.wordpress.com/2017/10/sitecore-9-dynamic-placeholders.jpg"
      }
      id={movie.id}
    />
  ));
  return (
    <>
      <div className="movie-list grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 items-center gap-6 p-8 ">
        {dataToRender}
      </div>
    </>
  );
}

export default MovieList;
