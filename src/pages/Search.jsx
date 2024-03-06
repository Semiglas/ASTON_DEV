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
      {!isFetching && data.length === 0 && <div className="text-white text-center mt-20">Ничего не найдено</div>}
      {isSuccess && <MovieList localData={data} />}
    </>
  );
}

export default Search;

/* TODO подумать в какой момент опустошать search, чтобы нельзя было просто вручную вписать search в url и наткнуться на
прошлые результаты*/


  // const [fetchNow, result] = useLazyFetchMovieByKeywordQuery();

  // if (query !== keyword) {
  //   fetchNow(query);
  //   dispatch(populateKeyword(query));
  // }

  /* GRABBING CURRENT POPULATED SEARCH FROM REDUX STORE */

  // let localData = useSelector((state) => {
  //   return state.search.search;
  // });

  // GRABBED

  // useEffect(() => {
  //   if (localData?.length === 0) {
  //     console.log(keyword, query);
  //     fetchNow(query);
  //     dispatch(populateKeyword(query));
  //   }
  // }, [keyword, query]);

  // useEffect(() => {
  //   if (result.data && result.isFetching === false) {
  //     dispatch(populateSearch(result.data));
  //   }
  // }, [result.isFetching, result.data, keyword, result.isSuccess]);

  // для случая если человек сразу заходит на страницу поиска через урлу и ищет
  // if (!result) {
  //   return <MovieList localData={localData} />;
  // }
