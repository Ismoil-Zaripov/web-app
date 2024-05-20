import {createContext, useContext, useEffect, useState} from "react";
import {catalogsList} from "../service/CatalogService";

const CatalogContext = createContext({})

export const CatalogProvider = ({children}) => {
    const [catalogs, setCatalogs] = useState([])

    useEffect(() => {
        catalogsList()
            .then(response => {
                if (response.status === 200) {
                    setCatalogs(response.data)
                }
            })
    }, []);

    return (
        <CatalogContext.Provider value={{ catalogs, setCatalogs }}>
            {children}
        </CatalogContext.Provider>
    )
}

export const useCatalogs = () => useContext(CatalogContext)
