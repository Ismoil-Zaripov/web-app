import axios from "axios";

const API = "/api/products"

export const searchProduct = async (sort, query, accessToken) => {
    return await axios.get(`${API}/search?query=${query}&sort=${sort}`, { header: {"Authorization": `Bearer ${accessToken}`}})
        .then(response => response.data)
}

export const createProduct = async (productRequest, accessToken) => {
    return await axios.post(API, productRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}
export const updateProduct = async (productId, productRequest, accessToken) => {
    return await axios.put(`${API}/${productId}`, productRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}
export const deleteProduct = async (productId, accessToken) => {
    return await axios.delete(`${API}/${productId}`, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.status)
}
export const productsList = async () => {
    return await axios.get(API)
        .then(response => response.data)
}

export const productsListByCatalog = async (catalogId) => {
    return await axios.get(`${API}/get-by-catalog/${catalogId}`)
        .then(response => response.data)
}