import React, { useState, useEffect, useRef } from "react";
import {
  useFetchMovieByIdQuery,
  useFetchMovieByKeywordQuery,
} from "../api/MoviesApi";
import { populateSearch, populateKeyword } from "../slices/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { Preloader } from "./Preloader";
import { useNavigate, useParams } from "react-router-dom";
import { useHistory } from "../hooks/useHistory";
// import {  } from "@reduxjs/toolkit";

function SearchComponent() {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const { query } = useParams();
  const keyword = useSelector((state) => {
    return state.search.keyword;
  });
  const debouncedSearch = useDebounce(search, 200);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addToHistory } = useHistory();
  let { data, isFetching, isSuccess, error } =
    useFetchMovieByKeywordQuery(debouncedSearch);
  const navigate = useNavigate();
  let timeoutId;
  let intervalId;

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

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
    }, 400);
  }

  if (!search || search.length <= 1) {
    data = [];
  }

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    // if too fast
    dispatch(populateKeyword(search));
    // console.log(debouncedSearch === search);
    // await new Promise((resolve) => {
    //   intervalId = setInterval(() => {
    //     if (debouncedSearch === search) {
    //       refetch();
    //       clearInterval(intervalId);
    //       resolve();
    //     }
    //   }, 100);
    // });

    // dispatch(populateSearch(data));
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
// потратил слишком много часов на исправление бага. в итоге остановился на одном из двух вариантов:
// либо дизаблить кнопку поиcка, пока фетчатся саджесты. либо заново фетчить результаты уже в компоненте Search
// пока решил задизаблить кнопку поиска
