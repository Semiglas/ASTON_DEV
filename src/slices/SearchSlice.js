import { createSlice } from '@reduxjs/toolkit'

const SearchSlice = createSlice({
    name: 'search',
    initialState: {
        search: [],
    },
    reducers: {
        populateSearch: (state, action) => {
            state.search = action.payload
        },
    },
})

export const { populateSearch } = SearchSlice.actions
export default SearchSlice
