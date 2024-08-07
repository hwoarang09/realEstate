import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    order: "desc",
    sort: "updated_at",
    page: 1,
    limit: 10,
  },
  reducers: {
    setKeyword: (state, action) => {
      if (action.payload === "" || action.payload === null) {
        const newState = { ...state };
        delete newState.keyword;
        return newState;
      }

      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setKeyword, setFilters, setPage } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
