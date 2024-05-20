import axios from "axios";

const API = "/api/auth"
export const refreshJwt = async (refreshToken) => {
    return await axios.get(`${API}/refresh-token`, {
        header: {
            "Authorization": `Bearer ${refreshToken}`
        }
    }).then(response => response.data)
}

export const doLogin = async (username, password) => {
    return await axios.post(`${API}/login`, {username, password})
        .then(response => {
            return response.data
        })
}

export const doRegister = async (registerRequest) => {
    return await axios.post(`${API}/register`, registerRequest)
        .then(response => response.status)
}