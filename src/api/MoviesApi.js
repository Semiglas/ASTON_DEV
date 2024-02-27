import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchAllMovies: builder.query({
      query: () => ({
        url: "movie?page=1&limit=50",
      }),
      transformResponse: (response) => response.docs,
    }),
    fetchMovieById: builder.query({
      query: (id) => ({
        url: `movie/${id}`,
      }),
    }),
    fetchMovieByKeyword: builder.query({
      query: (keyword) => {
        if (keyword === undefined || keyword === "") {
          return [];
        }
        return { url: `movie/search?page=1&limit=10&query=${keyword}` };
      },
      transformResponse: (response) => response.docs,
    }),
  }),
});

export const {
  useFetchAllMoviesQuery,
  useFetchMovieByIdQuery,
  useFetchMovieByKeywordQuery,
  useLazyFetchMovieByKeywordQuery,
} = moviesApi;
export default moviesApi;

//TODO везде сделать transformResponse
