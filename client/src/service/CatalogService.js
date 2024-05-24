import axios from "axios";
import {CATALOGS_API} from "./constants";

export const createCatalog = async (catalogRequest, accessToken) => {
    return await axios.post(CATALOGS_API, catalogRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => {
            return response.data
        })
}

export const updateCatalog = async (catalogId, catalogRequest, accessToken) => {
    return await axios.put(`${CATALOGS_API}/${catalogId}`, catalogRequest, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}

export const deleteCatalog = async (catalogId, accessToken) => {
    return await axios.delete(`${CATALOGS_API}/${catalogId}`, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.status)
}

export const catalogsList = async () => {
    return await axios.get(CATALOGS_API)
        .then(response => response.data)
}