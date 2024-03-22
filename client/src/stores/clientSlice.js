import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
	name: "client",
	initialState: {
		clients: [],
	},
	reducers: {
		setClient: (state, { payload }) => {
			state.client.push(payload);
		},
	},
});

export const { setClient } = clientSlice.actions;
export default clientSlice.reducer;
