import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { populateFavorites } from "../slices/FavoritesSlice";
import { populateHistory } from "../slices/HistorySlice";
const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setIsLoading(false);
        setUser(null);
        return;
      }
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      createUser,
      user,
      isLoading,
    }),
    [createUser, user, isLoading]
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const handleSignOut = (dispatch) => {
  signOut(auth).then(() => {
    dispatch(populateFavorites([]));
    dispatch(populateHistory([]));
    return;
  });
};

export const handleSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
