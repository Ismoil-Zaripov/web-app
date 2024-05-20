import {createContext, useContext, useEffect, useState} from "react";
import {productsList} from "../service/ProductService";

const ProductContext = createContext({})

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        productsList()
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data)
                }
            })
    }, []);

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
