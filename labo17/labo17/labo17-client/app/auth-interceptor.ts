import axios from "axios";


export const weebRequest = axios.create();

weebRequest.interceptors.request.use((config) => {

    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");

    return config;

});