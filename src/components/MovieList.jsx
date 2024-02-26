import React from 'react'
import { useFetchAllMoviesQuery } from '../api/MoviesApi'
import { Preloader } from '../components/Preloader'
import MovieComponent from './MovieComponent'
function MovieList({ fetchWhat, keyword, localData, waitForClick }) {
    if (localData) {
        var data = localData || []
    } else {
        var { data, isLoading } = fetchWhat(keyword)
        if (isLoading) {
            return <Preloader />
        }
    }

    if (data === undefined || data.docs?.length === 0) {
        return <div>Ничего не найдено</div>
    }

    const dataToRender = data.docs?.map(movie => (
        <MovieComponent
            key={movie.id}
            title={movie.name}
            description={movie.description}
            rating={movie.rating.kp}
            genre={movie.genres}
            year={movie.year}
            img={movie.backdrop.url}
            id={movie.id}
        />
    ))
    return (
        <>
            <div className="movie-list grid grid-cols-2 lg:grid-cols-3 items-center gap-6 p-8 ">
                {dataToRender}
            </div>
        </>
    )
}

export default MovieList
