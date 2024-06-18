// src/api.ts
import axios from 'axios';

const baseURL = 'https://localhost:7106/api';

const api = axios.create({
  baseURL, // Alterar a URL da API caso necessário
});

export const buildUrl = () => {
  return baseURL;
};
// export const buildUrl = (controller: string, action: string) => {
//   return `${baseURL}/${controller}/${action}`;
// };

export default api;
