import axios from 'axios';

export const baseUrl = 'https://conduit.productionready.io/api/';

export const serverRegistrations = (regData) => {
  const url = `${baseUrl}users`;
  const response = axios.post(url, regData);
  return response;
};

export const serverAutorizations = (autData) => {
  const url = `${baseUrl}users/login`;
  const response = axios.post(url, autData);
  return response;
};

export const dataAutorization = (header) => {
  const url = `${baseUrl}user`;
  const response = axios.get(url, header);
  return response;
};
