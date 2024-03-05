import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import { populateKeyword, populateSearch } from "../slices/SearchSlice";
import { useDispatch } from "react-redux";
import SearchComponent from "../components/SearchComponent";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLazyFetchMovieByKeywordQuery } from "../api/MoviesApi";
import { Preloader } from "../components/Preloader";

function Search() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const keyword = useSelector((state) => {
    return state.search.keyword;
  });

  const [fetchNow, result] = useLazyFetchMovieByKeywordQuery();

  /* GRABBING CURRENT POPULATED SEARCH FROM REDUX STORE */

  let localData = useSelector((state) => {
    console.log(state.search.search);
    return state.search.search;
  });

  // GRABBED

  useEffect(() => {
    if (keyword !== query) {
      fetchNow(query);
      dispatch(populateKeyword(query));
    }
  }, [keyword]);

  console.log(result.data)

  useEffect(() => {
    if (result.data && result.isFetching === false) {
      dispatch(populateSearch(result.data));
    }
  }, [result.isFetching, result.data, keyword, result.isSuccess]);

  // для случая если человек сразу заходит на страницу поиска через урлу и ищет
  if (!result) {
    return <MovieList localData={localData} />;
  }

  return (
    <>
      <SearchComponent />
      <h1 className="pt-8 px-4 pb-0 font-bold uppercase text-white text-xl">
        Результаты поиска по запросу: {query}
      </h1>
      {result.isFetching && <Preloader />}
      {result.isSuccess && <MovieList localData={localData} />}
      {/* если уже есть локалДата из стора*/}
      {result.isUninitialized && localData && (
        <MovieList localData={localData} />
      )}
    </>
  );
}

export default Search;

/* TODO подумать в какой момент опустошать search, чтобы нельзя было просто вручную вписать search в url и наткнуться на
прошлые результаты*/
