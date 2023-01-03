import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://destkw.com/api"
    : "http://localhost:3000";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
