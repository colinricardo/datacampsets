import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const API = publicRuntimeConfig.API;

const client = () => {
  const instance = axios.create({});
  instance.interceptors.request.use((config) => config);
  instance.defaults.baseURL = API;
  return instance;
};

export default client();
