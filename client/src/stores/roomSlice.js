import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const roomSlice = createSlice({
	name: "room",
	initialState: {
		rooms: [],
		currentRoom: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setNullCurrentRoom: (state) => {
			state.currentRoom = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRooms.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRooms.fulfilled, (state, { payload }) => {
				state.rooms = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(fetchRooms.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(createRoom.pending, (state) => {
				state.loading = true;
			})
			.addCase(createRoom.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.rooms.push(payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(createRoom.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(editRoom.pending, (state) => {
				state.loading = true;
			})
			.addCase(editRoom.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(editRoom.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(deleteRoom.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteRoom.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(deleteRoom.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(getRoomById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRoomById.fulfilled, (state, { payload }) => {
				state.currentRoom = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getRoomById.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			});
	},
});

export const fetchRooms = createAsyncThunk("rooms/fetch", async (data, { rejectWithValue }) => {
	try {
		const { data: clients } = await AxiosJSON({
			method: "get",
			url: "/room",
		});
		return clients;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const createRoom = createAsyncThunk("rooms/create", async (data, { rejectWithValue }) => {
	try {
		const { data: room } = await AxiosJSON({
			method: "post",
			url: "/room",
			data,
		});
		return room;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const editRoom = createAsyncThunk("rooms/edit", async (data, { rejectWithValue }) => {
	try {
		const { data: room } = await AxiosJSON({
			method: "patch",
			url: `/room/${data.id}`,
			data,
		});
		return room;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteRoom = createAsyncThunk("rooms/delete", async (id, { rejectWithValue }) => {
	try {
		const { data } = await AxiosJSON({
			method: "delete",
			url: `/room/${id}`,
		});
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getRoomById = createAsyncThunk("rooms/get", async (id, { rejectWithValue }) => {
	try {
		const { data: room } = await AxiosJSON({
			method: "get",
			url: `/room/${id}`,
		});
		return room;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const { setNullCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
