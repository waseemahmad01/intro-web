import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    liveloop: {
      data: {},
      filters: {
        gender_identifier: "",
        age: [],
        distance: "",
        location: {
          coordinates: [],
        },
      },
      started: false,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.liveloop.filters = action.payload;
    },
    setLiveLoop: (state, action) => {
      state.liveloop.started = action.payload;
    },
  },
});

export const { setFilters, setLiveLoop } = utilsSlice.actions;
export default utilsSlice.reducer;
