import { configureStore } from "@reduxjs/toolkit";
import auth from "./user";
import video from "./videoSound";
import matches from "./matches";
import utils from "./utils";
import stories from "./stories";
import stream from "./stream";

const store = configureStore({
  reducer: {
    auth,
    video,
    matches,
    utils,
    stories,
    stream,
  },
});

export default store;
