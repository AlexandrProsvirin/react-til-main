import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://your-laravel-backend-url/api', // replace with your Laravel backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

