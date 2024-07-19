import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../../context/shop-context";
import './navbar.css'


export const Navbar = () => {
    const { cartItem } = useContext(ShopContext);

    const getTotalItems = () => {
        return Object.values(cartItem).reduce((total, count) => total + count, 0);
    };

    const totalItems = getTotalItems();

    return <div className="navbar">
        <h1>Shop</h1>
        <div className="links">
            <Link className="btn" to="/"> HOME </Link>
            <Link className="btn" to="/cart">
                <ShoppingCart size={32} />
                {totalItems > 0 && (
                    <div className="cartItemsCount">{getTotalItems()}</div>
                )}
            </Link>
        </div>
    </div>
}