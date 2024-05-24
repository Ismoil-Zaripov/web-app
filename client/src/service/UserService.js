import axios from "axios";
import {USERS_API} from "./constants";

export const users = async (accessToken) => {
    return await axios.get(USERS_API, { header: {"Authorization": `Bearer ${accessToken}`}} )
        .then(response => response.data)
}