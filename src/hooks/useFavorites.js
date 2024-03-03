import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { useAuthContext } from "../contexts/AuthContext";
import { populateFavorites } from "../slices/FavoritesSlice";
import { useDispatch, useSelector } from "react-redux";

export const useFavorites = () => {
  console.log("hi");
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites?.favorites);
  const [triggerPopulate, setTriggerPopulate] = useState(0);
  const db = getDatabase();
  const { user } = useAuthContext();
  const users = ref(db, "users");

  useEffect(() => {
    const fetchFavorites = () => {
      if (!user) {
        return;
      }
      const favoritesRef = ref(db, "users/" + user.uid + "/favorites");
      onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.values(data);
          dispatch(populateFavorites(list));
        }
      });
    };

    fetchFavorites();
  }, [db, user, triggerPopulate]);

  const addFavorite = async (movie) => {
    const favorites = ref(db, "users/" + user.uid + "/favorites/" + movie.id);
    try {
      await set(favorites, movie);
      setTriggerPopulate((prev) => prev + 1);
    } catch (e) {
      throw new Error(e);
    }
    setTriggerPopulate((prev) => prev + 1);
  };

  const removeFavorite = async (id) => {
    const favorites = ref(db, "users/" + user.uid + "/favorites/" + id);
    try {
      await remove(favorites);
      setTriggerPopulate((prev) => prev + 1);
    } catch (e) {
      throw new Error(e);
    }
  };

  return { addFavorite, removeFavorite, favorites };
};
