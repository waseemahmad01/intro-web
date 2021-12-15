import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "video",
  initialState: {
    matches: [],
    iVisited: [],
    visitedMe: [],
    myLikes: [],
  },
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setIvisited: (state, action) => {
      state.iVisited = action.payload;
    },
    setVisitedMe: (state, action) => {
      state.visitedMe = action.payload;
    },
    setMyLikes: (state, action) => {
      state.myLikes = action.payload;
    },
  },
});

export const { setMatches, setIvisited, setVisitedMe, setMyLikes } =
  matchSlice.actions;
export default matchSlice.reducer;
