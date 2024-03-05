import React from "react";
import { useFetchAllMoviesQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";
import MovieComponent from "./MovieComponent";
import { useFavorites } from "../hooks/useFavorites";
import { useAuthContext } from "../contexts/AuthContext";

function MovieList({ localData }) {
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
        movie.img ||
        "https://lh3.googleusercontent.com/proxy/6gtbHHp1aU8Orqph_ie1KL2JOXxzLWg4wq2zzTi3I6z3pYfDFVw_ChBQWp3UhHTiZbA4hMwWeA"
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
