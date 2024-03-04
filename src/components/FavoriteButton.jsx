import React from "react";
import { useSelector } from "react-redux";
import { useFavorites } from "../hooks/useFavorites";
import PropTypes from "prop-types";

function FavoriteButton({ handleFavorite, children }) {
  FavoriteButton.propTypes = {
    handleFavorite: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <button
      className="add-to-favorites bg-gray-900 border rounded-md p-2 text-white"
      onClick={handleFavorite}
    >
      {children}
    </button>
  );
}

export default FavoriteButton;
// TODO подкорректировать FavoriteButton компонент... сделать его умнее может..
