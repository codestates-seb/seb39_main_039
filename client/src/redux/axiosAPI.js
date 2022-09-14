import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "ec2-52-78-178-145.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: { "Content-type": "application/json" }
});

axiosAPI.interceptors.request.use(
  function (config) {
    console.log("req start", config);
    return config;
  },
  function (error) {
    console.log("req error", error);
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  function (error) {
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default axiosAPI;
