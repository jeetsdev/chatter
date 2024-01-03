import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: process.env.REACT_APP_TOKEN,
	},
});

export default axiosInstance;
