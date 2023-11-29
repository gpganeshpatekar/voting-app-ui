import axios from "axios";
import { getToken } from "../auth";


export const BASE_URL = 'http://localhost:8080/voting-app';

export const PUBLIC_AXIOS = axios.create({
    baseURL: BASE_URL,
});
export const PRIVATE_AXIOS = axios.create({
    baseURL: BASE_URL,
});

export const PRIVATE_AXIOS_JWT = axios.create({
    baseURL:BASE_URL
})

PRIVATE_AXIOS_JWT.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
// PRIVATE_AXIOS_JWT.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

PRIVATE_AXIOS.interceptors.request.use(config => {
    const token = getToken();
    console.log(token);
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
        return config;
    }
},error => Promise.reject(error));