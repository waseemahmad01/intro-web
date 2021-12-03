import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "video",
  initialState: {
    matches: [],
  },
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
  },
});

export const { setMatches } = matchSlice.actions;
export default matchSlice.reducer;
