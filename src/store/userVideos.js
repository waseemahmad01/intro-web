import { createSlice } from "@reduxjs/toolkit";

const userVideos = createSlice({
  name: "videos",
  initialState: {
    data: [],
  },
  reducers: {
    setUserVideos: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserVideos } = userVideos.actions;
export default userVideos.reducer;
