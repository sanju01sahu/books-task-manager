import axios from "axios";

const api = axios.create({
  baseURL: "https://task-mangement-backend-1.onrender.com/api",
});
export default api;
