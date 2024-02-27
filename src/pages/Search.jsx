import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MovieList from '../components/MovieList'
import { populateSearch } from '../slices/SearchSlice'
import { useDispatch } from 'react-redux'
import SearchComponent from '../components/SearchComponent'
function Search() {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     return () => dispatch(populateSearch([]))
    // }, [])


    //здесь прописать логику того, что search должен либо брать из урлы, либо брать из ридукс
    const data = useSelector(state => {
        console.log(state.search.search)
        return state.search.search
    })
    console.log(data)
    return (
        <>
            <SearchComponent />
            <MovieList localData={data} />
        </>
    )
}

export default Search

/* TODO подумать в какой момент опустошать search, чтобы нельзя было просто вручную вписать search в url и наткнуться на
прошлые результаты*/
