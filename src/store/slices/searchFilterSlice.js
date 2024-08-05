import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    area_type: [],
    from_updated_date: "",
    order: "desc",
    sort: "",
    tmpSortDate: "",
    to_updated_date: "",
    from_deposit: 0,
    to_deposit: 99999,
    from_monthly_rent: 0,
    to_monthly_rent: 99999,
    from_monthly_rent_by: 0,
    to_monthly_rent_by: 99999,
    page: 1,
    keyword: "",
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
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setKeyword, setFilters, setPage } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
