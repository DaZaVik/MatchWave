import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001", // порт бэка
});

export default api;
