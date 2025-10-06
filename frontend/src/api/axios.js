// frontend/src/api/axios.js (UPDATED)

import axios from 'axios';

// 🎯 Use the environment variable, falling back to development URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL 
    ? `${import.meta.env.VITE_API_BASE_URL}/api` 
    : 'http://localhost:5000/api'; // Fallback for local development

const api = axios.create({
    baseURL: BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;