import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5501',
});

export default api;