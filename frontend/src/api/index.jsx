import axios from "axios";

const api = axios.create({
  baseURL: "https://calm-rose-pangolin-tux.cyclic.app/api",
});
export default api;
