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
		setNullCurrentRoomUsage: (state) => {
			state.currentRoomUsage = null;
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
				console.log("test1");
			})
			.addCase(createRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(createRoomUsage.rejected, (state, { payload }) => {
				console.log("test3");
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(editRoomUsage.pending, (state) => {
				state.loading = true;
			})
			.addCase(editRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(editRoomUsage.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(deleteRoomUsage.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteRoomUsage.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(deleteRoomUsage.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(getRoomUsageById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRoomUsageById.fulfilled, (state, { payload }) => {
				state.currentRoomUsage = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getRoomUsageById.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});
	},
});

export const fetchRoomUsages = createAsyncThunk("roomUsages/fetch", async (data, { rejectWithValue }) => {
	try {
		const { data: roomUsages } = await AxiosJSON({
			method: "get",
			url: "/roomusage",
		});
		return roomUsages;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const createRoomUsage = createAsyncThunk("roomUsage/create", async (data, { rejectWithValue }) => {
	try {
		const { data: roomUsage } = await AxiosJSON({
			method: "post",
			url: "/roomusage",
			data,
		});
		return roomUsage;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const editRoomUsage = createAsyncThunk("roomUsage/edit", async (data, { rejectWithValue }) => {
	try {
		const url = `/roomusage/${data.id}`;
		console.log(url, data);
		delete data.id;

		const { data: roomUsage } = await AxiosJSON({
			method: "patch",
			url,
			data,
		});
		return roomUsage;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteRoomUsage = createAsyncThunk("roomUsage/delete", async (id, { rejectWithValue }) => {
	try {
		const { data } = await AxiosJSON({
			method: "delete",
			url: `/roomusage/${id}`,
		});
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getRoomUsageById = createAsyncThunk("roomUsage/get", async (id, { rejectWithValue }) => {
	try {
		const { data: roomUsage } = await AxiosJSON({
			method: "get",
			url: `/roomusage/${id}`,
		});
		return roomUsage;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const { setNullCurrentRoomUsage } = roomUsageSlice.actions;
export default roomUsageSlice.reducer;
