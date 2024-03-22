import { createSlice } from "@reduxjs/toolkit";

const roomUsageSlice = createSlice({
	name: "roomUsage",
	initialState: {
		roomUsages: [],
	},
	reducers: {
		setRoomUsage: (state, { payload }) => {
			state.roomUsages.push(payload);
		},
	},
});

export const { setRoomUsage } = roomUsageSlice.actions;
export default roomUsageSlice.reducer;
