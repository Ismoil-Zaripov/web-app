import axios from "axios";

const API = "/api/favorite-products"

export const addFavoriteProduct = async (productId) => {
    return await axios.post(`${API}?product-id=${productId}`)
        .then(response => response.data)
}

export const removeFavoriteProduct = async (productId) => {
    return await axios.delete(`${API}?product-id=${productId}`)
        .then(response => response.data)
}

export const favoriteProducts = async () => {
    return await axios.get(API)
        .then(response => response.data)
}