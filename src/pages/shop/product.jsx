
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, title, price, image } = props.data;
    const { addToCart, cartItem } = useContext(ShopContext);

    const cartItemAmount = cartItem[id]

    return (
        <div className="product">
            <img src={image} />
            <div className="description">
                <p>
                    <b>{title}</b>
                </p>
                <p> ${price}</p>
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>Add to cart {cartItemAmount > 0 && <> ({cartItemAmount}) </>}</button>
        </div>
    );
};