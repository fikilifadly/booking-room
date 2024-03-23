import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";

const clientSlice = createSlice({
	name: "clients",
	initialState: {
		clients: [],
		loading: false,
		errorMessage: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchClients.fulfilled, (state, { payload }) => {
				state.clients = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(fetchClients.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			})
			.addCase(createClient.pending, (state) => {
				state.loading = true;
			})
			.addCase(createClient.fulfilled, (state, { payload }) => {
				state.clients.push(payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(createClient.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.error.message;
			});
	},
});

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
	const { data } = await AxiosJSON({
		method: "get",
		url: "http://localhost:3000/clients",
	});
	return data;
});

export const createClient = createAsyncThunk("clients/create", async (data) => {
	const { data: client } = await AxiosJSON({
		method: "post",
		url: "http://localhost:3000/clients",
		data,
	});
	return client;
});

export default clientSlice.reducer;
