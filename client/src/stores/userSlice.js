import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const userSlice = createSlice({
	name: "user",
	initialState: {
		users: [],
		loading: false,
		errorMessage: "",
		currentUser: null,
	},
	reducers: {
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
				console.log(action);
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
			.addCase(createUser.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				toast.success(payload);
				state.errorMessage = "";
				state.access_token = payload;
				localStorage.setItem("access_token", payload.access_token);
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
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
			.addCase(editUser.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
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
			.addCase(deleteUser.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
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
			.addCase(getUserById.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
			});
	},
});

export const loginUser = createAsyncThunk("users/login", async (data, { rejectWithValue }) => {
	try {
		const { data: user } = await AxiosJSON({
			method: "post",
			url: "user/login",
			data,
		});

		return user;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const fetchUsers = createAsyncThunk("users/fetch", async (data, { rejectWithValue }) => {
	try {
		const { data } = await AxiosJSON({
			method: "get",
			url: "/user",
		});
		return data;
	} catch (error) {
		if (!error.response) {
			throw error;
		}
		return rejectWithValue(error);
	}
});

export const createUser = createAsyncThunk("users/create", async (data, { rejectWithValue }) => {
	try {
		const user = await AxiosJSON({
			method: "post",
			url: "/user",
			data,
		});
		return user;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const editUser = createAsyncThunk("users/edit", async (data, { rejectWithValue }) => {
	try {
		const { data: user } = await AxiosJSON({
			method: "put",
			url: `/user/${data.id}`,
			data,
		});
		return user;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteUser = createAsyncThunk("users/delete", async (data, { rejectWithValue }) => {
	try {
		const { data: user } = await AxiosJSON({
			method: "delete",
			url: `/user/${data.id}`,
		});
		return user;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getUserById = createAsyncThunk("users/getUserById", async (data, { rejectWithValue }) => {
	try {
		const { data: user } = await AxiosJSON({
			method: "get",
			url: `/user/${data}`,
		});
		return user;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export default userSlice.reducer;
