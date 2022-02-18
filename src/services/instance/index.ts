import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "qs";

const config: AxiosRequestConfig = {
  baseURL: "https://mapleweb.herokuapp.com/",
  paramsSerializer: params => stringify(params, { arrayFormat: "repeat" }),
  headers: {},
};

const instance = axios.create(config);

export default instance;
