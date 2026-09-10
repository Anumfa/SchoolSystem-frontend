import axios from 'axios';

// In dev, /api is proxied to the local backend by Vite.
// In production (separate Vercel projects), set VITE_API_URL to the backend URL.
const baseURL = import.meta.env.VITE_API_URL || '/api';

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.warn(
    '[bfhs] VITE_API_URL is not set. Requests will go to "/api" on the frontend domain, ' +
      'which cannot reach a separately deployed backend — set VITE_API_URL to your backend URL (e.g. https://your-backend.vercel.app/api).'
  );
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bfhs_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Guard against single-page-app rewrites returning index.html with a 200 status.
// Without this, callers get an HTML string instead of JSON and fail in confusing
// ways (e.g. the home page event cards stay stuck on "Loading events…").
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (typeof data === 'string' && /^\s*(<!doctype html|<html)/i.test(data)) {
      return Promise.reject(
        new Error(
          `Request to ${response.config.url} returned HTML instead of JSON. ` +
            'The API base URL is probably wrong — set VITE_API_URL to your backend URL.'
        )
      );
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
