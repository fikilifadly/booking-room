import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		currentUser: {},
	},
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
