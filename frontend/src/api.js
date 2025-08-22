import axios from "axios";

// Use backend URL from env OR default localhost:8000
const baseURL = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err);
    throw err;
  }
);

export default api;