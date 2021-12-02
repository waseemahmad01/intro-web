import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    muted: false,
  },
  reducers: {
    toggleMute: (state, action) => {
      state.muted = !state.muted;
    },
  },
});

export const { toggleMute } = videoSlice.actions;
export default videoSlice.reducer;
