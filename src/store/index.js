import { configureStore } from "@reduxjs/toolkit";
import auth from "./user";
import video from "./videoSound";
import matches from "./matches";
import utils from "./utils";

const store = configureStore({
  reducer: {
    auth,
    video,
    matches,
    utils,
  },
});

export default store;
