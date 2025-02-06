import axios from 'axios';

const CommonClient = axios.create({
  baseURL: process.env.BE_CANISTER,
});

CommonClient.interceptors.request.use(config => {
  // get some token from cookie or localstorage
  // and add it to the request header
  const token = '';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { CommonClient };
