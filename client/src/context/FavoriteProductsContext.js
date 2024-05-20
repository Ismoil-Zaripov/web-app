import {createContext, useContext, useEffect, useState} from "react";
import {addFavoriteProduct, favoriteProducts, removeFavoriteProduct} from "../service/FavoriteProductService";

const FavoriteProductsContext = createContext({})

export const FavoriteProductsProvider = ({children}) => {
    const [favoriteList, setFavoriteList] = useState([]);

    useEffect(() => {
        fetchFavoritesList()
    }, []);

    const addToFavoriteList = (productId) => {
        addFavoriteProduct(productId)
            .then(response => {
                if (response.status === 200) {
                    fetchFavoritesList()
                }
            })
    }

    const removeFromFavoriteList = (productId) => {
        removeFavoriteProduct(productId)
            .then(response => {
                if (response.data === 200) {
                    fetchFavoritesList()
                }
            })
    }

    const fetchFavoritesList = () => {
        favoriteProducts()
            .then(response => {
                if (response.status === 200) {
                    setFavoriteList(response.data)
                }
            })
    }

    return (
        <FavoriteProductsContext.Provider value={{
            favoriteList,
            addToFavoriteList,
            removeFromFavoriteList
        }}>
            {children}
        </FavoriteProductsContext.Provider>
    )

}
export const useFavoriteProducts = () => useContext(FavoriteProductsContext);
