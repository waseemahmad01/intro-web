import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: "",
    activeIndex: "",
    userId: "",
    chatVisit: 0,
  },
  reducers: {
    setChatState: (state, action) => {
      state.chatId = action.payload.chatId;
      state.activeIndex = action.payload.activeIndex;
      state.userId = action.payload.userId;
    },
    setChatVisit: (state, action) => {
      state.chatVisit = action.payload;
    },
  },
});

export const { setChatState, setChatVisit } = inboxSlice.actions;
export default inboxSlice.reducer;
