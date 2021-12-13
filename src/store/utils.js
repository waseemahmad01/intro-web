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
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.liveloop.filters = action.payload;
    },
  },
});

export const { setFilters } = utilsSlice.actions;
export default utilsSlice.reducer;
