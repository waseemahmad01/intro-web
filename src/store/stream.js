import { createSlice } from "@reduxjs/toolkit";

const stream = createSlice({
  name: "stream",
  initialState: {
    coHostUid: false,
  },
  reducers: {
    setCoHostUid: (state, action) => {
      state.coHostUid = action.payload;
    },
  },
});

export const { setCoHostUid } = stream.actions;
export default stream.reducer;
