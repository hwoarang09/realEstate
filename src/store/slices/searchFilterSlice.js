import { createSlice } from "@reduxjs/toolkit";

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    keyword: "",
    from_area: "",
    to_area: "",
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setFromArea: (state, action) => {
      state.from_area = action.payload;
    },
    setToArea: (state, action) => {
      state.to_area = action.payload;
    },
  },
});

export const { setKeyword, setFromArea, setToArea } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
