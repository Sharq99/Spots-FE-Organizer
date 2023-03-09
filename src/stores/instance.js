import axios from "axios";
import { TEST, PRODUCTION } from '../config/info'

const baseURL =
  process.env.NODE_ENV === "production"
    ? PRODUCTION
    : TEST;
// : "https://destkw.com/api";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
