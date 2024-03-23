import axios from "axios";

export const AxiosJSON = axios.create({
	baseURL: "http://localhost:3000",
	headers: {
		Authorization: `Bearer ${localStorage.access_token}`,
		"content-type": "application/json",
	},
});
