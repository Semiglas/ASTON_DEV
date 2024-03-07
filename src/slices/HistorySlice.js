import { createSlice, createSelector } from "@reduxjs/toolkit";

const HistorySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
  },
  reducers: {
    populateHistory: (state, action) => {
      state.history = action.payload;
    },
    removeHistory: (state, action) => {
      state.history = state.history.filter(
        (searchTerm) => searchTerm.id !== action.payload
      );
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export const selectHistory = (state) => state.history?.history;




export const { populateHistory, removeHistory, addToHistory } =
  HistorySlice.actions;
export default HistorySlice;
