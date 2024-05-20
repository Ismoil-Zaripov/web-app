import axios from "axios";

const API = "/api/orders"

export const makeOrder = async (email, favoriteProducts, token) => {
    return await axios.post(
        `${API}/make-order/${email}`,
        favoriteProducts,
        { headers: {"Authorization": `Bearer ${token}`}}
    ).then(response => response.status)
}

export const getAllOrders = async (token) => {
    return await axios.get(API, { headers: {"Authorization": `Bearer ${token}`}})
        .then(response => response.data)
}

export const getAllOrdersByEmail = async (email, token) => {
    return await axios.get(`${API}/${email}`, { headers: {"Authorization": `Bearer ${token}`}})
        .then(response => response.data)
}