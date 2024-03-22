import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
	name: "room",
	initialState: {
		rooms: [],
	},
	reducers: {
		setroom: (state, { payload }) => {
			state.rooms.push(payload);
		},
	},
});

export const { setroom } = roomSlice.actions;
export default roomSlice.reducer;
