import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		action: null,
	},
	reducers: {
		setAction: (state, { payload }) => {
			state.action = payload;
		},
	},
});

export const { setAction } = modalSlice.actions;
export default modalSlice.reducer;
