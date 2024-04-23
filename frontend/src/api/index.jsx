import axios from "axios";

const api = axios.create({
  baseURL: "https://books-task-manager.onrender.com/api",
});
export default api;
