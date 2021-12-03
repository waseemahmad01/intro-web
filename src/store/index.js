import { configureStore } from "@reduxjs/toolkit";
import auth from "./user";
import video from "./videoSound";
import matches from "./matches";

const store = configureStore({
  reducer: {
    auth,
    video,
    matches,
  },
});

export default store;
