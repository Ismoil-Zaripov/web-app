import axios from "axios";
import {ORDERS_API} from "./constants";

export const makeOrder = async (email, favoriteProducts, token) => {
    return await axios.post(
        `${ORDERS_API}/make-order/${email}`,
        favoriteProducts,
        { headers: {"Authorization": `Bearer ${token}`}}
    ).then(response => response.status)
}

export const getAllOrders = async (token) => {
    return await axios.get(ORDERS_API, { headers: {"Authorization": `Bearer ${token}`}})
        .then(response => response.data)
}

export const getAllOrdersByEmail = async (email, token) => {
    return await axios.get(`${ORDERS_API}/${email}`, { headers: {"Authorization": `Bearer ${token}`}})
        .then(response => response.data)
}