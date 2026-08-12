import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "../config/env";

const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const storage = localStorage.getItem("batch-tracking-auth");

  if (storage) {
    try {
      const parsed = JSON.parse(storage);

      const token = parsed?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem("batch-tracking-auth");
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("batch-tracking-auth");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
