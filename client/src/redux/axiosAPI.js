import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const RECOMMEND_API = process.env.REACT_APP_KAKAOLOCAL_API;

export const customAxios = axios.create({
  baseURL: BASE_URL
});

customAxios.interceptors.request.use(function (config) {
  config.headers["Content-type"] = "application/json";
  config.headers["charset"] = "UTF-8";

  if (!Cookies.get("access")) {
    config.headers["Authorization"] = null;
    return config;
  }
  config.headers["Content-type"] = "application/json";
  config.headers["charset"] = "UTF-8";
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

export const weatherAxios = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: { "Content-type": "application/json" }
});

weatherAxios.interceptors.request.use(
  function (config) {
    // console.log("req start", config);
    return config;
  },
  function (err) {
    console.log("req error", err);
    return Promise.reject(err);
  }
);

weatherAxios.interceptors.response.use(
  function (response) {
    // console.log("response", response);
    return response;
  },
  function (err) {
    console.log("response err", err);
    return Promise.reject(err);
  }
);

export const recommendAxios = axios.create({
  baseURL: "https://dapi.kakao.com"
});

recommendAxios.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `KakaoAK ${RECOMMEND_API}`;
  return config;
});

recommendAxios.interceptors.request.use(
  function (config) {
    // console.log("req start", config);
    return config;
  },
  function (err) {
    console.log("req error", err);
    return Promise.reject(err);
  }
);

recommendAxios.interceptors.response.use(
  function (response) {
    // console.log("response", response);
    return response;
  },
  function (err) {
    console.log("response err", err);
    return Promise.reject(err);
  }
);
