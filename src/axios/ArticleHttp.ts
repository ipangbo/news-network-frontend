import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/article",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + JSON.parse(access).token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
