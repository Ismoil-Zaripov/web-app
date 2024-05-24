import axios from "axios";
import {FAVORITE_PRODUCTS_API} from "./constants";

export const addFavoriteProduct = async (productId) => {
    return await axios.post(`${FAVORITE_PRODUCTS_API}?product-id=${productId}`)
        .then(response => response.data)
}

export const removeFavoriteProduct = async (productId) => {
    return await axios.delete(`${FAVORITE_PRODUCTS_API}?product-id=${productId}`)
        .then(response => response.data)
}

export const favoriteProducts = async () => {
    return await axios.get(FAVORITE_PRODUCTS_API)
        .then(response => response.data)
}