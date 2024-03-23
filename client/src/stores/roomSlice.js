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
	reducers: {},
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
			.addCase(createRoom.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(editRoom.pending, (state) => {
				state.loading = true;
			})
			.addCase(editRoom.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.rooms = state.rooms.map((room) => {
					if (room.id === payload.id) {
						return payload;
					}
					return room;
				});
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(editRoom.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(deleteRoom.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteRoom.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.rooms = state.rooms.filter((room) => room.id !== payload.id);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(deleteRoom.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(getRoomById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRoomById.fulfilled, (state, { payload }) => {
				state.currentRoom = state.rooms.find((room) => room.id === payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getRoomById.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});
	},
});

export const fetchRooms = createAsyncThunk("rooms/fetch", async () => {
	const { data } = await AxiosJSON({
		method: "get",
		url: "/room",
	});
	return data;
});

export const createRoom = createAsyncThunk("rooms/create", async (data) => {
	const { data: room } = await AxiosJSON({
		method: "post",
		url: "/room",
		data,
	});
	return room;
});

export const editRoom = createAsyncThunk("rooms/edit", async (data) => {
	const { data: room } = await AxiosJSON({
		method: "put",
		url: `/room/${data.id}`,
		data,
	});
	return room;
});

export const deleteRoom = createAsyncThunk("rooms/delete", async (data) => {
	const { data: room } = await AxiosJSON({
		method: "delete",
		url: `/room/${data.id}`,
	});
	return room;
});

export const getRoomById = createAsyncThunk("rooms/getRoomById", async (data) => {
	const { data: room } = await AxiosJSON({
		method: "get",
		url: `/room/${data}`,
	});
	return room;
});

export const { setroom } = roomSlice.actions;
export default roomSlice.reducer;
