import { PRIVATE_AXIOS, PRIVATE_AXIOS_JWT, PUBLIC_AXIOS } from "./axios-config"

export const createUser = (data) => {
    return PUBLIC_AXIOS.get(`/users/register`,data)
}

export const logInUser = (credentials) => {
    return PUBLIC_AXIOS.post(`/auth/login`,credentials).then((response) => response.data);
}

export const fetchElections = () => {
    return PRIVATE_AXIOS.get(`/elections`).then((response) => response.data);
} 