import { createSlice } from "@reduxjs/toolkit";

const stream = createSlice({
  name: "stream",
  initialState: {
    request: false,
  },
  reducers: {
    setRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { setRequest } = stream.actions;
export default stream.reducer;
