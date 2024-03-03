import React from "react";
import { useSelector } from "react-redux";
import { useFavorites } from "../hooks/useFavorites";

function FavoriteButton({ handleFavorite, children }) {
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
