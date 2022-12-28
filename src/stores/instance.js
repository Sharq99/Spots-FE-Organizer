import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://192.168.0.80:8000";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
