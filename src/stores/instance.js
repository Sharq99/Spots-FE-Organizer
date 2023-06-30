import axios from "axios";

const baseURL = "https://destkw.com/api";
// const baseURL = process.env.REACT_APP_TEST;

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
