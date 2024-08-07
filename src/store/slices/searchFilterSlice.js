import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    order: "desc",
    sort: "updated_at",
    page: 1,
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      console.log("setFilters", state, action.payload);

      return {
        ...action.payload,
      };
    },
  },
});

export const { setKeyword, setFilters, setPage } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
