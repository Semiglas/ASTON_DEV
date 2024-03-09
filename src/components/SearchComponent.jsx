import React, { useState, useEffect, useRef } from "react";
import { useFetchMovieByKeywordQuery } from "../api/MoviesApi";
import { populateKeyword } from "../slices/SearchSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";

function SearchComponent() {
  const { query } = useParams();
  const [search, setSearch] = useState(query ? query : "");
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(search, 200);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addToHistory } = useHistory();
  let { data, isFetching, isSuccess, error } =
    useFetchMovieByKeywordQuery(debouncedSearch);
  const navigate = useNavigate();
  let timeoutId;


  // нужен юзэффект чтобы убрать таймаут
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

  const handleFocus = () => setShowSuggestions(true);
  function handleBlur() {
    timeoutId = setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  }

  if (!search || search.length <= 1) {
    data = [];
  }

  const handleSearch = async () => {
    if (!search) {
      return;
    }
    dispatch(populateKeyword(search));
    addToHistory({ id: search });
    navigate(`/search/${search}`);
  };

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
        className="border rounded-tr-md rounded-br-md  p-2 text-white "
        disabled={isFetching ? true : false}
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
          {search?.length >= 2 && data?.length === 0 && (
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
