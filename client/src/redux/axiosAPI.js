import axios from "axios";
import Cookies from "js-cookie";

const customAxios = axios.create({
  baseURL: "https://server.albamung.tk/"
});

customAxios.interceptors.request.use(function (config) {
  config.headers["Content-type"] = "application/json";
  if (!Cookies.get("access")) {
    config.headers["Authorization"] = null;
    return config;
  }
  config.headers["Authorization"] = `Bearer ${Cookies.get("access")}`;
  return config;
});

customAxios.interceptors.request.use(
  function (config) {
    // console.log("req start", config);
    return config;
  },
  function (error) {
    console.log("req error", error);
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    // console.log("response", response);
    return response;
  },
  function (error) {
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default customAxios;
