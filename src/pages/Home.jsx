import React, { useState } from "react";
import MovieList from "../components/MovieList";
import SearchComponent from "../components/SearchComponent";
import { useFetchAllMoviesQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";
function Home() {
  const { data, isLoading } = useFetchAllMoviesQuery();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="home">
      <SearchComponent />
      <MovieList localData={data} />
    </div>
  );
}

export default Home;

/* убрать fetchWhat и логику фетчинга оставить тут, пусть movieList всегда работает только с фетченной датой */
