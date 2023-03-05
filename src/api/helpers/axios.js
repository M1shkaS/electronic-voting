import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export default instance;

// VITE_API_KEY='apikey=7003a06bfb4ab4d72d650777a0f77351'
// VITE_BASE_API_URL='https://gateway.marvel.com:443/v1/public'
//import envs from "config/environments";
