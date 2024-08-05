import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {},
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      state.Page = action.payload;
    },
    setFilters: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { setKeyword, setFilters, setPage } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
