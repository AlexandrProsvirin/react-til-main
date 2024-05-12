// AxiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://example.com/api', // Базовый URL вашего API
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' // Устанавливаем заголовок Access-Control-Allow-Origin
  }
});

export default instance;
