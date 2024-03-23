import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";

const roomUsageSlice = createSlice({
	name: "roomUsage",
	initialState: {
		roomUsages: [],
		currentRoomUsage: null,
		loading: false,
		errorMessage: "",
	},
	reducers: {
		setCurrentRoomUsage: (state, { payload }) => {
			state.currentRoomUsage = state.roomUsages.find((roomUsage) => roomUsage.id === payload);
		},
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

export const { setRoomUsage } = roomUsageSlice.actions;
export default roomUsageSlice.reducer;
