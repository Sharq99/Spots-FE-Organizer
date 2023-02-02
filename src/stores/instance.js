import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://destkw.com/api"
    : "https://destkw.com/api";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
