// AxiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://example.com/api', // Базовый URL вашего API
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Устанавливаем заголовок Access-Control-Allow-Origin
    'Authorization': `Bearer ${token}`,
  }
});


export default instance;
