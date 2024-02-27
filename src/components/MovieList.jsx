import React from "react";
import { useFetchAllMoviesQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";
import MovieComponent from "./MovieComponent";

function MovieList({ localData }) {
  let data = localData;
  //   if (localData) {
  //     const local = localData || [];
  //     data = local;
  //   } else {
  //     const { data: fetchedData, isLoading } = fetchWhat(keyword);
  //     if (isLoading) {
  //       return <Preloader />;
  //     }
  //     data = fetchedData;
  //   }

  //   if (data === undefined || data.length === 0) {
  //     return (
  //       <div className="w-max mx-auto uppercase text-xl font-bold text-white">
  //         Ничего не найдено
  //       </div>
  //     );
  //   }
  const dataToRender = data?.map((movie) => (
    <MovieComponent
      key={movie.id}
      title={movie.name}
      description={movie.description}
      rating={movie.rating.kp}
      genre={movie.genres}
      year={movie.year}
      img={movie.backdrop.url ?? "https://lh3.googleusercontent.com/proxy/6gtbHHp1aU8Orqph_ie1KL2JOXxzLWg4wq2zzTi3I6z3pYfDFVw_ChBQWp3UhHTiZbA4hMwWeA"}
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
