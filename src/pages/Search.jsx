import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import { populateKeyword, populateSearch } from "../slices/SearchSlice";
import { useDispatch } from "react-redux";
import SearchComponent from "../components/SearchComponent";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetchMovieByKeywordQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";

function Search() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const keyword = useSelector((state) => {
    return state.search.keyword;
  });

  const { data, isFetching, isSuccess, isError } =
    useFetchMovieByKeywordQuery(query);

  useEffect(() => {
    if (query) {
      dispatch(populateKeyword(query));
    }
    if (isSuccess) {
      dispatch(populateSearch(data));
    }
  }, [query, isSuccess]);

  return (
    <>
      <SearchComponent />
      <h1 className="pt-8 px-4 pb-0 font-bold uppercase text-white text-xl">
        Результаты поиска по запросу: {query}
      </h1>
      {isFetching && <Preloader />}
      {!isFetching && data.length === 0 && (
        <div className="text-white text-center mt-20">Ничего не найдено</div>
      )}
      {isSuccess && <MovieList localData={data} />}
    </>
  );
}

export default Search;
