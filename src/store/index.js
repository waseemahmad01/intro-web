import { configureStore } from "@reduxjs/toolkit";
import auth from "./user";
import video from "./videoSound";

const store = configureStore({
  reducer: {
    auth,
    video,
  },
});

export default store;
