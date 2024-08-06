import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    area_type: undefined,
    from_updated_date: undefined,
    order: "desc",
    sort: undefined,
    tmpSortDate: undefined,
    to_updated_date: undefined,
    from_deposit: 0,
    to_deposit: 9000000,
    from_monthly_rent: 0,
    to_monthly_rent: 9000000,
    from_monthly_rent_by: 0,
    to_monthly_rent_by: 9000000,
    grade: undefined,
    available_md_name: undefined,
    recommended_md_name: undefined,
    is_active: undefined,
    is_contact_completed: undefined,
    page: 1,
    keyword: undefined,
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
