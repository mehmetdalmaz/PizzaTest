import axios from "axios";

// https://siparis.vendentech.com/api/
const api = axios.create({
  baseURL: "https://localhost:7052/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const methods = {
  get: (url, config) => api.get(url, config),
  post: (url, body, config) => api.post(url, body, config),
  put: (url, body, config) => api.put(url, body, config),
  delete: (url, config) => api.delete(url, config),
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;

    let errorMessage;
    switch (status) {
      case 400:
        errorMessage = data.message || "Bad Request";
        break;
      case 401:
        errorMessage = data.message || "Unauthorized";
        break;
      case 403:
        errorMessage = data.message || "Forbidden";
        break;
      case 404:
        errorMessage = "Not Found";
        break;
      case 500:
        errorMessage = "Server Error";
        break;
      default:
        errorMessage = "An unexpected error occurred";
    }

    return Promise.reject(errorMessage);
  }
);
