import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		access_token: "",
		loading: false,
		errorMessage: "",
		currentUser: null,
	},
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.access_token = payload;
		},
		getUserById: (state, { payload }) => {
			state.currentUser = state.users.find((user) => user.id === payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, { payload }) => {
				state.users = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});
		builder
			.addCase(createUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(createUser.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.users.push(payload);
				state.loading = false;
			})
			.addCase(createUser.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});
		builder
			.addCase(loginUser.pending, (state) => {
				console.log("masuk pending");
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				toast.success("Login Success");
				state.errorMessage = "";
				state.access_token = payload;
				localStorage.setItem("access_token", payload);
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});
		builder
			.addCase(editUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(editUser.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.users = state.users.map((user) => {
					if (user.id === payload.id) {
						return payload;
					}
					return user;
				});
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(editUser.rejected, (state, action) => {
				state.errorMessage = action.error.message;
				state.loading = false;
			});
		builder
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteUser.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.users = state.users.filter((user) => user.id !== payload.id);
				state.loading = false;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
		builder
			.addCase(getUserById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserById.fulfilled, (state, { payload }) => {
				state.currentUser = state.users.find((user) => user.id === payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getUserById.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
				toast.error(state.errorMessage);
			});
	},
});

export const loginUser = createAsyncThunk("users/login", async (data) => {
	const { data: user } = await AxiosJSON({
		method: "post",
		url: "user/login",
		data,
	});

	return user.access_token;
});

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
	const { data } = await AxiosJSON({
		method: "get",
		url: "/user",
	});
	return data;
});

export const createUser = createAsyncThunk("users/create", async (data) => {
	const { data: user } = await AxiosJSON({
		method: "post",
		url: "/user",
		data,
	});
	return user;
});

export const editUser = createAsyncThunk("users/edit", async (data) => {
	const { data: user } = await AxiosJSON({
		method: "put",
		url: `/user/${data.id}`,
		data,
	});
	return user;
});

export const deleteUser = createAsyncThunk("users/delete", async (data) => {
	const { data: user } = await AxiosJSON({
		method: "delete",
		url: `/user/${data.id}`,
	});
	return user;
});

export const getUserById = createAsyncThunk("users/getUserById", async (data) => {
	const { data: user } = await AxiosJSON({
		method: "get",
		url: `/user/${data}`,
	});
	return user;
});

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;
