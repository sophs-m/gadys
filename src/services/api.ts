import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://gadys-backend.onrender.com',
});

api.interceptors.request.use(async (config) => {
  const usuarioId = await SecureStore.getItemAsync('usuarioId');
  if (usuarioId) config.headers['usuarioId'] = usuarioId;
  return config;
});

export default api;
