import axios from 'axios';
// // axios.defaults.withCredentials = true

const client = axios.create({
  //'http://localhost:3500'
  // 'https://ecommerce-users-api-production.up.railway.app'
    baseURL: 'https://ecommerce-users-api-production.up.railway.app'
  });
  
export default client