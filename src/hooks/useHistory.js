import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { useAuthContext } from "../contexts/AuthContext";
import { populateFavorites } from "../slices/FavoritesSlice";
import { populateHistory } from "../slices/HistorySlice";
import { useDispatch, useSelector } from "react-redux";

export const useHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history?.history);
  const [triggerPopulate, setTriggerPopulate] = useState(0);
  const db = getDatabase();
  const { user } = useAuthContext();

  const fetchHistory = () => {
    if (!user) {
      return;
    }
    const historyRef = ref(db, "users/" + user.uid + "/history");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        dispatch(populateHistory(list));
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchHistory();
  }, [db, user, triggerPopulate]);

  const addToHistory = async (historyEvent) => {
    const history = ref(
      db,
      "users/" + user.uid + "/history/" + historyEvent.id
    );
    try {
      await set(history, historyEvent.id);
      setTriggerPopulate((prev) => prev + 1);
    } catch (e) {
      throw new Error(e);
    }
  };

  const removeHistory = async (historyEvent) => {
    const history = ref(
      db,
      "users/" + user.uid + "/history/" + historyEvent.id
    );
    try {
      await remove(history);
      setTriggerPopulate((prev) => prev + 1);
    } catch (e) {
      throw new Error(e);
    }
  };

  return { addToHistory, removeHistory, fetchHistory, history, isLoading };
};

// TODO у вас пока нет история, пока загружается. надо отделить загрузку от отсутствия истории в принципе
