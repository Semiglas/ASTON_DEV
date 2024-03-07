import React from "react";
import { useFetchMovieByIdQuery } from "../api/MoviesApi";
import { useParams } from "react-router-dom";
import { Preloader } from "../components/Preloader";
import FavoriteButton from "../components/FavoriteButton";
import { useAuthContext } from "../contexts/AuthContext";

function Movie() {
  const params = useParams();
  const { user } = useAuthContext();
  const { data, isLoading } = useFetchMovieByIdQuery(params.id);
  if (isLoading) {
    return <Preloader></Preloader>;
  }

  return (
    <div className="movie-item overflow-hidden text-white  flex flex-col">
      <img src={data.backdrop.url} alt={data.name} />
      <div className="movie-item__content flex flex-col gap-2 p-2">
        <h1 className="text-xl font-bold  text-white">{data.name}</h1>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Жанр:</span>{" "}
          {data.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Год:</span> {data.year}
        </p>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Рейтинг:</span> {data.rating.kp}
        </p>
        <p className="">
          <span className="font-bold italic">Описание:</span> {data.description}
        </p>
        <div className="grow movie-item__buttons flex justify-between">
          {user && (
            <FavoriteButton
              id={data.id}
              name={data.name}
              description={data.description}
              img={data.backdrop.url}
              rating={data.rating.kp}
              year={data.year}
              genre={data.genres}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie;
