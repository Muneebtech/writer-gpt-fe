import { decryptData } from "@/utils/localStorage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiEndpoint: string = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const authToken = decryptData("token")
const client = axios.create({
  baseURL: apiEndpoint,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${authToken}`, // Add the bearer token to the Authorization header
  },
});

export async function request(options: AxiosRequestConfig) {
  const onSucess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };
  const onError = (error: AxiosError) => {
    return Promise.reject(error.response);
  };

  return client(options).then(onSucess).catch(onError);
}
