import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isList: true,
  left: false,
  search: false,
};

const isListSlice = createSlice({
  name: "isList",
  initialState,
  reducers: {
    toggleIsList: (state) => {
      state.isList = !state.isList;
    },
    setIsList: (state, action) => {
      state.isList = action.payload;
    },
    toggleLeft: (state) => {
      state.left = !state.left;
    },
    setLeft: (state, action) => {
      state.left = action.payload;
    },
    toggleSearch: (state) => {
      state.search = !state.search;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  toggleIsList,
  setIsList,
  toggleLeft,
  setLeft,
  toggleSearch,
  setSearch,
} = isListSlice.actions;
export default isListSlice.reducer;
