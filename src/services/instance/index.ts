import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "qs";

const config: AxiosRequestConfig = {
  baseURL: "http://mapleweb.herokuapp.com",
  paramsSerializer: params => stringify(params, { arrayFormat: "repeat" }),
};

const instance = axios.create(config);

export default instance;
