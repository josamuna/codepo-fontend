import axios from 'axios';

// const mybaseURL = 'http://185.98.137.19:8001/api/';
// const mybaseURL = 'http://localhost:8000/api/';

 // Lien officiel du site
 // const mybaseURL = 'https://api.monitor-engine.com/api/';
 // lien localhost
const mybaseURL = 'http://localhost:8000/api/';
// const mybaseURL = 'http://185.98.137.19/api/';
// const mybaseURL = 'http://192.148.43.246:8000/api/';

const axiosInstance = axios.create({
  baseURL: mybaseURL,
  timeout: 15000,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    Authorization: localStorage.getItem('access_token')
      ? `Bearer ${localStorage.getItem('access_token')}`
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  }
});
// "proxy": "http://localhost:8000",
export default axiosInstance;
