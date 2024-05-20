import axios from "axios";

const API = "/api/users"

export const users = async (accessToken) => {
    return await axios.get(API, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}