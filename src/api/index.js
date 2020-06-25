import axios from 'axios';
import { getToken } from '../utils/localStorage';

export const baseUrl = 'https://conduit.productionready.io/api/';

export const instance = axios.create();

instance.interceptors.request.use((config) => {
  const userConfig = config;
  userConfig.headers.Authorization = `Token ${getToken()}`;
  return userConfig;
});

export const userRequest = () => {
  const url = `${baseUrl}user`;
  const response = instance.get(url);
  return response;
};

export const loginRequest = (values) => {
  const { username, email, password } = values;
  const regData = {
    user: {
      username,
      email,
      password,
    },
  };

  const url = `${baseUrl}users`;
  const response = axios.post(url, regData);
  return response;
};

export const signupRequest = (values) => {
  const { email, password } = values;
  const autData = {
    user: {
      email,
      password,
    },
  };
  const url = `${baseUrl}users/login`;
  const response = axios.post(url, autData);
  return response;
};
