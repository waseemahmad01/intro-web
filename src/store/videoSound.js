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
    setMute: (state, action) => {
      state.muted = action.payload;
    },
  },
});

export const { toggleMute, setMute } = videoSlice.actions;
export default videoSlice.reducer;
