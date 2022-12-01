// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://192.168.0.22:8000",
// });

// export default instance;

import axios from "axios";

// const baseURL = "http://192.168.0.80:8000"
const baseURL = "http://192.168.0.22:8000"
// const baseURL = "http://192.168.1.138:8000";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
