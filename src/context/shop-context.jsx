import React, { createContext, useState, useEffect } from "react";
import { fetchProducts } from "../api";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
            initializeCart(fetchedProducts);
        };
        loadProducts();
    }, []);

    const initializeCart = (products) => {
        const initialCart = {};
        products.forEach(product => {
            initialCart[product.id] = 0;
        });
        setCartItem(initialCart);
    };

    const addToCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    };

    const contextValue = { cartItem, addToCart, removeFromCart };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};