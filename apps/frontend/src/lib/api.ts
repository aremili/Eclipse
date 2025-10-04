import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true, // Important for Better Auth cookies
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor for auth tokens (if needed)
api.interceptors.request.use(
	(config) => {
		// Better Auth typically uses cookies, but if you need tokens:
		// const token = localStorage.getItem('token');
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error) => Promise.reject(error),
);

// Add response interceptor for error handling
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Handle unauthorized - redirect to login
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

export default api;
