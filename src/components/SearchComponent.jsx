import React, { useState, useEffect } from "react";
import {
  useFetchMovieByIdQuery,
  useFetchMovieByKeywordQuery,
} from "../api/MoviesApi";
import { populateSearch } from "../slices/SearchSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { Preloader } from "./Preloader";

function SearchComponent() {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(search, 500);
  const [showSuggestions, setShowSuggestions] = useState(false);
  let { data } = useFetchMovieByKeywordQuery(debouncedSearch);

  let timeoutId;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleFocus = () => setShowSuggestions(true);
  function handleBlur() {
    timeoutId = setTimeout(() => {
      setShowSuggestions(false);
    }, 400);
  }

  if (!search || search.length <= 1) {
    data = [];
  }

  return (
    <div className="relative mt-4 flex z-10 mx-auto w-1/2">
      <input
        className="w-full rounded-tl-md rounded-bl-md px-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>
      <Link to="/search">
        <button
          onClick={() => dispatch(populateSearch(data))}
          className="border rounded-tr-md rounded-br-md  p-2 text-white"
        >
          Search
        </button>
      </Link>
      {showSuggestions && (
        <div className="movies-in-search absolute top-10 w-full">
          {search &&
            data?.map((movie) => {
              if (!movie.name) {
                return;
              }
              return (
                <Link
                  to={`/movie/${movie.id}`}
                  className="movie-link"
                  key={movie.id}
                >
                  <div className="search-item w-full hover:bg-gray-400">
                    {movie.name}
                  </div>
                </Link>
              );
            })}
          {search && data?.length === 0 && (
            <div className="search-item w-full hover:bg-gray-400">
              По вашему запросу ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;

/*
TODO еще один кастом хук
TODO шапка не ререндериться при переходе со страницы на страницу.
 TODO плейсхолдеры на случай если нет фото
 TODO propTypes
 TODO запретить переходить на страницу поиска если инпут пустой
 */

// useEffect(() => {
//     if (data && data?.docs && !waitForClick) {
//         dispatch(populateSearch(data))
//     }
// }, [data, dispatch])
