import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "../hooks/useFavorites";
import { useAuthContext } from "../contexts/AuthContext";
import { FeatureFlagsContext } from "../contexts/FeatureFlagsContext";

function truncateWords(text, maxWords, splitString, joinString) {
  const words = text.split(splitString);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(joinString) + "...";
  }
  return text;
}

function MovieComponent({ id, name, description, img, rating, year, genre }) {
  //check is user logged in or not
  const { user } = useAuthContext();
  const { featureFlags, shareToTelegram } = useContext( FeatureFlagsContext );

  const truncatedDescription = truncateWords(description, 10, " ", " ");

  const getGenresString = truncateWords(
    genre.map((g) => g.name).join(", "),
    3,
    ", ",
    ", "
  );

  MovieComponent.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number,
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
          {user && (
             <FavoriteButton
             id={id}
             name={name}
             description={description}
             img={img}
             rating={rating}
             year={year}
             genre={genre}
           ></FavoriteButton>
          )}

          {featureFlags.isTelegramShareEnabled && (
            <button
              className="share w-11"
              onClick={() => shareToTelegram(id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
<circle cx="24" cy="24" r="21" fill="#74cccf"></circle><path fill="none" stroke="#010101" stroke-miterlimit="10" d="M45.051,24c0,3.826-1.069,7.415-2.857,10.504 c-1.844,3.187-4.305,6.189-7.492,8.033c-3.089,1.787-6.877,2.871-10.702,2.871c-3.826,0-7.567-1.165-10.656-2.952 c-3.187-1.844-5.847-4.677-7.69-7.864C3.867,31.503,3.378,27.826,3.378,24c0-3.826,0.68-7.393,2.467-10.482 c1.844-3.187,4.366-6.038,7.553-7.882C16.487,3.849,20.174,3.188,24,3.188c3.826,0,7.371,0.906,10.46,2.694 c3.187,1.844,5.545,4.627,7.389,7.814C43.636,16.785,45.051,20.174,45.051,24z"></path><path fill="#d6e5e5" d="M17.689,26.814c0.492,1.906,1.089,3.785,1.785,5.626c0.151,0.399,0.366,0.85,0.782,0.946	c0.367,0.084,0.725-0.152,1.02-0.386c0.846-0.672,1.616-1.439,2.292-2.282c1.123,0.936,2.304,1.808,3.427,2.744	c0.437,0.364,0.884,0.734,1.414,0.94c0.53,0.205,1.168,0.22,1.635-0.104c0.321-0.222,0.525-0.574,0.692-0.927	c0.364-0.765,0.633-1.572,0.833-2.395c0.8-3.306,0.851-6.256,2.324-9.936c0.473-1.182,0.572-2.491,0.653-3.76	c0.048-0.748-0.541-1.378-1.289-1.408c-0.89-0.036-1.761,0.193-2.619,0.451c-6.127,1.842-11.582,4.246-17.015,6.668	c-0.505,0.225-1.044,0.413-1.436,0.803c-0.221,0.22-0.397,0.518-0.365,0.828c0.058,0.568,0.716,0.837,1.268,0.98	C14.627,26,16.133,26.517,17.689,26.814z"></path><polygon fill="#bcbcbc" points="20.843,28.309 20.539,33.213 23.569,30.717"></polygon><path fill="none" stroke="#010101" stroke-linejoin="round" stroke-miterlimit="10" d="M20.721,28.01	c1.109,1.117,2.262,2.191,3.455,3.219"></path><polygon fill="#bcbcbc" points="18.264,26.388 29.64,18.955 30.146,19.41 21.197,27.652 20.792,28.916 20.135,33.163 17.758,27.197"></polygon><path fill="none" stroke="#010101" stroke-linejoin="round" stroke-miterlimit="10" d="M17.689,26.814	c0.492,1.906,1.089,3.785,1.785,5.626c0.151,0.399,0.366,0.85,0.782,0.946c0.367,0.084,0.725-0.152,1.02-0.386	c0.846-0.672,1.616-1.439,2.292-2.282c1.123,0.936,2.304,1.808,3.427,2.744c0.437,0.364,0.884,0.734,1.414,0.94	c0.53,0.205,1.168,0.22,1.635-0.104c0.321-0.222,0.525-0.574,0.692-0.927c0.364-0.765,0.633-1.572,0.833-2.395	c0.8-3.306,0.851-6.256,2.324-9.936c0.473-1.182,0.572-2.491,0.653-3.76c0.048-0.748-0.541-1.378-1.289-1.408	c-0.89-0.036-1.761,0.193-2.619,0.451c-6.127,1.842-11.582,4.246-17.015,6.668c-0.505,0.225-1.044,0.413-1.436,0.803	c-0.221,0.22-0.397,0.518-0.365,0.828c0.058,0.568,0.716,0.837,1.268,0.98C14.627,26,16.133,26.517,17.689,26.814z"></path><path fill="none" stroke="#010101" stroke-linejoin="round" stroke-miterlimit="10" d="M17.689,26.814	c3.357-2.222,6.437-4.187,9.794-6.409c0.695-0.46,2.562-1.753,2.87-1.262c0.411,0.654-6.383,5.935-9.624,8.879	c-0.164,1.727-0.287,3.459-0.37,5.192"></path>
</svg>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default MovieComponent;
