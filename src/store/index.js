import { configureStore } from "@reduxjs/toolkit";
import auth from "./user";

const store = configureStore({
	reducer: {
		auth,
	},
});

export default store;
