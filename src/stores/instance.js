import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION
    : process.env.REACT_APP_TEST;
// : "https://destkw.com/api";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
