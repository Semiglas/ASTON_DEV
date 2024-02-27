import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function truncateWords(text, maxWords, splitString, joinString) {
  const words = text.split(splitString);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(joinString) + "...";
  }
  return text;
}

function MovieComponent({
  id,
  title,
  description,
  img,
  rating,
  year,
  genre,
  director,
}) {
  const truncatedDescription = truncateWords(description, 10, " ", " ");

  const getGenresString = truncateWords(
    genre.map((g) => g.name).join(", "),
    3,
    ", ",
    ", "
  );

  MovieComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    img: PropTypes.string,
    id: PropTypes.string.isRequired,
  };

  return (
    <div className="movie-item rounded-lg overflow-hidden text-white  bg-gray-900   flex flex-col">
      <img src={img} alt={title} />
      <div className="movie-item__content flex flex-col gap-2 p-2">
        <h1 className="text-xl font-bold  text-white">{title}</h1>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Жанр:</span> {getGenresString}
        </p>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Год:</span> {year}
        </p>
        <p className="text-white opacity-70">
          <span className="font-bold italic">Рейтинг:</span> {rating}
        </p>
        <p className="">
          <span className="font-bold italic">Описание:</span>{" "}
          {truncatedDescription}
        </p>
        <div className="grow movie-item__buttons flex justify-between">
          <button className="more-info bg-gray-700 border rounded-md p-2 text-white">
            <Link to={`/movie/${id}`}>Подробнее</Link>
          </button>
          <button className="add-to-favorites bg-gray-900 border rounded-md p-2 text-white">
            В избранное
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieComponent;
