import axios from "axios";
import { sha1 } from "js-sha1";

const API_URL = "https://api.podcastindex.org/api/1.0";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

export const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const currentTime = Math.floor(Date.now() / 1000); 
  const hash = sha1(API_KEY + API_SECRET + currentTime);

  config.headers["X-Auth-Key"] = API_KEY;
  config.headers["X-Auth-Date"] = currentTime;
  config.headers["Authorization"] = hash;

  return config;
});