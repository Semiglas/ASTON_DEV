import React from 'react'
import { useFetchMovieByIdQuery } from '../api/MoviesApi'
import { useParams } from 'react-router-dom'

function Movie() {
    const params = useParams()
    const { data, isLoading } = useFetchMovieByIdQuery(params.id)
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="movie-item overflow-hidden text-white  flex flex-col">
            <img src={data.backdrop.url} alt={data.title} />
            <div className="movie-item__content flex flex-col gap-2 p-2">
                <h1 className="text-xl font-bold  text-white">{data.title}</h1>
                <p className="text-white opacity-70">
                    <span className="font-bold italic">Жанр:</span>{' '}
                    {data.genres.map(genre => genre.name).join(', ')}
                </p>
                <p className="text-white opacity-70">
                    <span className="font-bold italic">Год:</span> {data.year}
                </p>
                <p className="text-white opacity-70">
                    <span className="font-bold italic">Рейтинг:</span>{' '}
                    {data.rating.kp}
                </p>
                <p className="">
                    <span className="font-bold italic">Описание:</span>{' '}
                    {data.description}
                </p>
                <div className="grow movie-item__buttons flex justify-between">
                    <button className="add-to-favorites bg-gray-900 border rounded-md p-2 text-white">
                        В избранное
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Movie
