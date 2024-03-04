import React, { useState, useEffect } from "react";
import {
  useFetchMovieByIdQuery,
  useFetchMovieByKeywordQuery,
} from "../api/MoviesApi";
import { populateSearch, populateKeyword } from "../slices/SearchSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { Preloader } from "./Preloader";
import { useNavigate, useParams } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";

function SearchComponent() {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const { query } = useParams();
  const debouncedSearch = useDebounce(search, 500);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addToHistory } = useHistory();
  let { data } = useFetchMovieByKeywordQuery(debouncedSearch);
  const navigate = useNavigate();
  let timeoutId;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setShowSuggestions(false);
    }

    if (event.key === "Enter") {
      handleSearch();
    }
  }

  console.log(query);
  // if (!search && query) {
  //   setSearch(query);
  // }
  const handleFocus = () => setShowSuggestions(true);
  function handleBlur() {
    timeoutId = setTimeout(() => {
      setShowSuggestions(false);
    }, 400);
  }

  if (!search || search.length <= 1) {
    data = [];
  }

  function handleSearch() {
    if (!search) {
      return;
    }

    dispatch(populateKeyword(search));
    console.log(data);
    dispatch(populateSearch(data));
    navigate(`/search/${search}`);
    addToHistory({ id: search });
  }

  return (
    <div
      className="relative mt-4 flex z-10 mx-auto w-1/2"
      onKeyDown={handleKeyDown}
    >
      <input
        className="w-full rounded-tl-md rounded-bl-md px-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></input>

      <button
        onClick={handleSearch}
        className="border rounded-tr-md rounded-br-md  p-2 text-white"
      >
        Search
      </button>

      {showSuggestions && (
        <div className="movies-in-search absolute top-10 w-full">
          {search &&
            data?.map((movie) => {
              if (
                !movie.name ||
                !movie.rating.kp ||
                !movie.year ||
                !movie.description
              ) {
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



// FIXME если слишком быстро вводить и переходить то бывают баги....
