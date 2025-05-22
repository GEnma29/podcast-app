import { AxiosInstance } from "./index";

export const fetcher = async (url: string) => AxiosInstance.get(url).then((res) => res.data)