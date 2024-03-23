import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosJSON } from "../utils";
import { toast } from "react-toastify";

const clientSlice = createSlice({
	name: "clients",
	initialState: {
		clients: [],
		loading: true,
		errorMessage: "",
		currentClient: null,
	},
	reducers: {
		setNullCurrentClient: (state) => {
			state.currentClient = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.pending, (state) => {
				console.log("masuk pending");
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
			});

		builder
			.addCase(createClient.pending, (state) => {
				state.loading = true;
			})
			.addCase(createClient.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.clients.push(payload);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(createClient.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(deleteClient.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteClient.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(deleteClient.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(updateClient.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateClient.fulfilled, (state, { payload }) => {
				toast.success(payload.message);
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(updateClient.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});

		builder
			.addCase(getClientById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getClientById.fulfilled, (state, { payload }) => {
				state.currentClient = payload;
				state.errorMessage = "";
				state.loading = false;
			})
			.addCase(getClientById.rejected, (state, { payload }) => {
				state.errorMessage = payload.response.data.message;
				toast.error(state.errorMessage);
				state.loading = false;
			});
	},
});

export const fetchClients = createAsyncThunk("clients/fetch", async (data, { rejectWithValue }) => {
	try {
		const { data: clients } = await AxiosJSON({
			method: "get",
			url: "/client",
		});
		return clients;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const createClient = createAsyncThunk("clients/create", async (data, { rejectWithValue }) => {
	try {
		const { data: client } = await AxiosJSON({
			method: "post",
			url: "/client",
			data,
		});
		return client;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteClient = createAsyncThunk("clients/delete", async (id, { rejectWithValue }) => {
	try {
		const { data } = await AxiosJSON({
			method: "delete",
			url: `/client/${id}`,
		});
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getClientById = createAsyncThunk("clients/get", async (id, { rejectWithValue }) => {
	try {
		const { data: client } = await AxiosJSON({
			method: "get",
			url: `/client/${id}`,
		});
		return client;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const updateClient = createAsyncThunk("clients/update", async (data, { rejectWithValue }) => {
	try {
		const url = `/client/${data.id}`;
		console.log(url, data);
		delete data.id;
		const { data: client } = await AxiosJSON({
			method: "patch",
			url,
			data,
		});
		return client;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const { setNullCurrentClient } = clientSlice.actions;
export default clientSlice.reducer;
