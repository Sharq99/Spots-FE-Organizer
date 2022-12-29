import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
