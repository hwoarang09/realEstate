// src/slices/isListSlice.js
import { createSlice } from "@reduxjs/toolkit";

const isListSlice = createSlice({
  name: "isList",
  initialState: true,
  reducers: {
    toggleIsList: (state) => !state,
    setIsList: (state, action) => action.payload,
  },
});

export const { toggleIsList, setIsList } = isListSlice.actions;
export default isListSlice.reducer;
