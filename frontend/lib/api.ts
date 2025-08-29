import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
});

// Attach Bearer token (from cookie) automatically for client requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
