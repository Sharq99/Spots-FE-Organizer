import axios from "axios";

const baseURL = "https://destkw.com/api";
// process.env.NODE_ENV === "production"
//   ? process.env.REACT_APP_PRODUCTION
//   : process.env.REACT_APP_TEST;

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
