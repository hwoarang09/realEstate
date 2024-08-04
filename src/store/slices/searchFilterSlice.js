import { createSlice } from "@reduxjs/toolkit";

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState: {
    keyword: "",
    // 다른 필터 값들 추가 가능
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    // 다른 필터 값들을 설정하는 리듀서도 추가 가능
  },
});

export const { setKeyword } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
