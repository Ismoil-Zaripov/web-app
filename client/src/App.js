import {Navbar} from "./component/Navbar";
import {Route, Routes} from "react-router-dom";
import {Home} from "./page/Home";
import {CatalogPage} from "./page/CatalogPage";
import {ProductPage} from "./page/ProductPage";
import {FavoritesPage} from "./page/FavoritesPage";
import {SignInPage} from "./page/SignIn";
import {SignUpPage} from "./page/SignUp";
import {FavoriteProductsProvider} from "./context/FavoriteProductsContext";
import {CatalogProvider} from "./context/CatalogContext";
import {ProductProvider} from "./context/ProductContext";
import React, {useEffect} from "react";
import {AuthProvider} from "./context/AuthContext";
import {SettingsPage} from "./page/SettingsPage";
import {OrdersPage} from "./page/OrdersPage";

export const App = () => {

    useEffect(() => {
        console.log = () => {};
        console.warn = () => {};
        console.error = () => {};
        console.info = () => {};
    }, []);

    return (
        <>
            <AuthProvider>
                <FavoriteProductsProvider>
                    <CatalogProvider>
                        <ProductProvider>
                            <Navbar/>
                            <Routes>
                                <Route path={'/'} element={<Home/>}/>
                                <Route path={'/settings'} element={<SettingsPage/>}/>
                                <Route path={'/orders'} element={<OrdersPage/>}/>
                                <Route path={'/catalogs'} element={<CatalogPage/>}/>
                                <Route path={'/products'} element={<ProductPage/>}/>
                                <Route path={'/products/:catalogId'} element={<ProductPage/>}/>
                                <Route path={'/favorites'} element={<FavoritesPage/>}/>
                                <Route path={'/sign-in'} element={<SignInPage/>}/>
                                <Route path={'/sign-up'} element={<SignUpPage/>}/>
                            </Routes>
                        </ProductProvider>
                    </CatalogProvider>
                </FavoriteProductsProvider>
            </AuthProvider>
        </>
    )
}