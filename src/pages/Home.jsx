import React, { useState } from 'react'
import MovieList from '../components/MovieList'
import SearchComponent from '../components/SearchComponent'
import { useFetchAllMoviesQuery } from '../api/MoviesApi'
function Home() {
    return (
        <div className="home">
            <SearchComponent />
            <MovieList fetchWhat={useFetchAllMoviesQuery} />
        </div>
    )
}

export default Home
