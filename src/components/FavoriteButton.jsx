import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import PropTypes from "prop-types";

function FavoriteButton({ id, name, description, img, rating, year, genre }) {
  const { addFavorite, removeFavorite, favorites, fetchFavorites } =
    useFavorites();
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const checkIfFavorite = () => {
      return favorites?.some((item) => item.id === id);
    };

    setIsFavorite(checkIfFavorite());
  }, [favorites, id]);

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

  FavoriteButton.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number,
    genre: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    img: PropTypes.string,
    id: PropTypes.number.isRequired,
  };

  return (
    <button
      className={`${isFavorite ? "bg-red-700" : ""} add-to-favorites bg-gray-900 border rounded-md p-2 text-white`}
      onClick={handleFavorite}
    >
      Избранное
    </button>
  );
}

export default FavoriteButton;
