import axios from "axios";
import {AUTH_API} from "./constants";

export const refreshJwt = async (refreshToken) => {
    return await axios.get(`${AUTH_API}/refresh-token`, {
        header: {
            "Authorization": `Bearer ${refreshToken}`
        }
    }).then(response => response.data)
}

export const doLogin = async (username, password) => {
    return await axios.post(`${AUTH_API}/login`, {username, password})
        .then(response => {
            return response.data
        })
}

export const doRegister = async (registerRequest) => {
    return await axios.post(`${AUTH_API}/register`, registerRequest)
        .then(response => response.status)
}