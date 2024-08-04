import { createSlice } from "@reduxjs/toolkit";


const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    keyword: "",
    from_area: "",
    to_area: "",
    from_deposit: "",
    to_deposit: "",
    from_monthly_rent_per_py: "",
    to_monthly_rent_per_py: "",
    grade: [],
    status: [],
    is_active: null,
    is_contact_completed: null,
    sort: null,
    from_updated_date: null,
    to_updated_date: null,
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },

    setFilters: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state) {
          state[key] = value;
        }
      });
    },
  },
});

export const { setKeyword, setFilters } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
