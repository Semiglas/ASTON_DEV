import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { useAuthContext } from "../contexts/AuthContext";
import { populateFavorites, selectFavorites } from "../slices/FavoritesSlice";
import { useDispatch, useSelector } from "react-redux";

export const useFavorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const [triggerPopulate, setTriggerPopulate] = useState(0);
  const db = getDatabase();
  const { user } = useAuthContext();

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
          setIsLoading(false);
        } else {
          dispatch(populateFavorites([]));
        }
        setIsLoading(false);
      });
    };

    fetchFavorites();
  }, [user, triggerPopulate]);

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

  return { addFavorite, removeFavorite, favorites, isLoading };
};
