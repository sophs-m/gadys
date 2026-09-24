import axios from 'axios';
import { storage } from './storage';

const api = axios.create({
  baseURL: 'https://gadys-backend.onrender.com',
});

api.interceptors.request.use(async (config) => {
  const usuarioId = await storage.getItem('usuarioId');
  if (usuarioId) config.headers['usuarioId'] = usuarioId;
  return config;
});

export default api;