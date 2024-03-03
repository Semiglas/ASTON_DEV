import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../hooks/useFavorites";

function truncateWords(text, maxWords, splitString, joinString) {
  const words = text.split(splitString);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(joinString) + "...";
  }
  return text;
}

function MovieComponent({ id, name, description, img, rating, year, genre }) {
  const { removeFavorite, addFavorite, favorites } = useFavorites();

  console.log("name here" + name);
  const truncatedDescription = truncateWords(description, 10, " ", " ");

  const getGenresString = truncateWords(
    genre.map((g) => g.name).join(", "),
    3,
    ", ",
    ", "
  );

  React.useEffect(() => {
    const checkIfFavorite = () => {
      return favorites?.some((item) => item.id === id);
    };

    setIsFavorite(checkIfFavorite());
  }, [favorites, id]);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavorite = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      try {
        await removeFavorite(id);
      } catch (e) {
        console.log(e);
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(true);
      try {
        await addFavorite({
          id,
          name,
          description,
          img,
          rating,
          year,
          genre,
        });
      } catch (e) {
        setIsFavorite(false);
        console.log(e);
      }
    }
  };

  MovieComponent.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    genre: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    img: PropTypes.string,
    id: PropTypes.number.isRequired,
  };

  return (
    <div className="movie-item rounded-lg overflow-hidden shadow-xl text-white  bg-gray-900   flex flex-col">
      <img src={img} alt={name} />
      <div className="movie-item__content flex flex-col gap-2 p-2">
        <h1 className="text-xl font-bold  text-white">{name}</h1>
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
          <FavoriteButton handleFavorite={handleFavorite}>
            {isFavorite ? "Убрать из избранного" : "в избранное"}
          </FavoriteButton>
        </div>
      </div>
    </div>
  );
}

export default MovieComponent;
