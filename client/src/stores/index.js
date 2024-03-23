import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./clientSlice";
import roomSlice from "./roomSlice";
import roomUsage from "./roomUsage";
import userSlice from "./userSlice";

export const store = configureStore({
	reducer: {
		client: clientSlice,
		room: roomSlice,
		roomUsage: roomUsage,
		user: userSlice,
	},
});
