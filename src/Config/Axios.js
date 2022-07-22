import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  //  baseURL:"http://localhost:7000/"
   baseURL:"https://api-qservices-tasks.azurewebsites.net"
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
