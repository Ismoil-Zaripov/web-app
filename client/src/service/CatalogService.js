import axios from "axios";

const API = "/api/catalogs"

export const createCatalog = async (catalogRequest, accessToken) => {
    return await axios.post(API, catalogRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => {
            return response.data
        })
}
export const updateCatalog = async (catalogId, catalogRequest, accessToken) => {
    return await axios.put(`${API}/${catalogId}`, catalogRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}
export const deleteCatalog = async (catalogId, accessToken) => {
    return await axios.delete(`${API}/${catalogId}`, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.status)
}
export const catalogsList = async () => {
    return await axios.get(API)
        .then(response => response.data)
}