import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    area: [],
    from_deposit: 0,
    from_updated_date: "",
    order: "desc",
    sort: "",
    tmpSortDate: "",
    to_deposit: 99999,
    to_updated_date: "",
    page: 1,
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      state.Page = action.payload;
    },
    setFilters: (state, action) => {
      console.log("setFilters", state, action.payload);

      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setKeyword, setFilters, setPage } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
