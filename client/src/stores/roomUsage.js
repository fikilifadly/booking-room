import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const roomUsageSlice = createSlice({
	name: "roomUsage",
	initialState: {
		roomUsages: [],
		currentRoomUsage: null,
		loading: true,
		errorMessage: "",
	},
	reducers: {
		setCurrentRoomUsage: (state, { payload }) => {
			state.currentRoomUsage = state.roomUsages.find((roomUsage) => roomUsage.id === payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoomUsages.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchRoomUsages.fulfilled, (state, { payload }) => {
				state.roomUsages = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(fetchRoomUsages.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(createRoomUsage.pending, (state) => {
				state.loading = true;
			})
			.addCase(createRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.roomUsages.push(payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(createRoomUsage.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});

		builder
			.addCase(editRoomUsage.pending, (state) => {
				state.loading = true;
			})
			.addCase(editRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.roomUsages = state.roomUsages.map((roomUsage) => {
					if (roomUsage.id === payload.id) {
						return payload;
					}
					return roomUsage;
				});
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(editRoomUsage.rejected, (state, action) => {
				toast.error(action.error.message);
				state.errorMessage = action.error.message;
				state.loading = false;
			});

		builder
			.addCase(deleteRoomUsage.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.roomUsages = state.roomUsages.filter((roomUsage) => roomUsage.id !== payload.id);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(deleteRoomUsage.rejected, (state, action) => {
				toast.error(action.error.message);
				state.errorMessage = action.error.message;
				state.loading = false;
			});

		builder
			.addCase(getRoomUsageById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRoomUsageById.fulfilled, (state, { payload }) => {
				state.currentRoomUsage = state.roomUsages.find((roomUsage) => roomUsage.id === payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getRoomUsageById.rejected, (state, action) => {
				toast.error(action.error.message);
				state.loading = false;
				state.errorMessage = action.error.message;
			});
	},
});

export const fetchRoomUsages = createAsyncThunk("roomUsage/fetch", async () => {
	const { data } = await AxiosJSON({
		method: "get",
		url: "/roomusage",
	});
	return data;
});

export const createRoomUsage = createAsyncThunk("roomUsage/create", async (data) => {
	const { data: roomUsage } = await AxiosJSON({
		method: "post",
		url: "/roomusage",
		data,
	});
	return roomUsage;
});

export const editRoomUsage = createAsyncThunk("roomUsage/edit", async (data) => {
	const { data: roomUsage } = await AxiosJSON({
		method: "put",
		url: `/roomusage/${data.id}`,
		data,
	});
	return roomUsage;
});

export const deleteRoomUsage = createAsyncThunk("roomUsage/delete", async (data) => {
	const { data: roomUsage } = await AxiosJSON({
		method: "delete",
		url: `/roomusage/${data.id}`,
	});
	return roomUsage;
});

export const getRoomUsageById = createAsyncThunk("roomUsage/getById", async (data) => {
	const { data: roomUsage } = await AxiosJSON({
		method: "get",
		url: `/roomusage/${data}`,
	});
	return roomUsage;
});

export const { setRoomUsage } = roomUsageSlice.actions;
export default roomUsageSlice.reducer;
