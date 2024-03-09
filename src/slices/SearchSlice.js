import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    keyword: "",
  },
  reducers: {
    populateSearch: (state, action) => {
      state.search = action.payload;
    },
    populateKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const selectKeyword = (state) => state.search.keyword;

export const { populateSearch, populateKeyword } = SearchSlice.actions;
export default SearchSlice;
