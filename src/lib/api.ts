// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // or your production URL later
  timeout: 10000, // 10 seconds timeout
});

export default api;
