import axios, { AxiosInstance } from 'axios';

function getInstance() {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_ADDR,
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log('response', response);
      return response?.data ? response.data : response;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return instance;
}

type Params = {
  [key: string]: string | number | undefined;
};

export async function sendGet(url: string, params?: Params): Promise<any> {
  const axios = getInstance();
  let response;
  console.log('url', url);
  if (params) {
    response = await axios.get(url, { params });
  } else {
    response = await axios.get(url);
  }
  return response;
}
