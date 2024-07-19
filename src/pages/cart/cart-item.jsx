import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import './cart.css';

export const CartItem = (props) => {
    const { id, title, price, image } = props.data;
    const { addToCart, removeFromCart, cartItem } = useContext(ShopContext);

    const totalPrice = (price * cartItem[id]).toFixed(2);

    return (
        <div className='cartItem'>
            <img src={image} />
            <div className='description'>
                <p>
                    <b>{title}</b>
                </p>
                <p>${price}</p>
                <p>Total Price: ${totalPrice}</p>
                <div className='quantityControl'>
                    <button className="remove" onClick={() => removeFromCart(id)}>-</button>
                    <span>{cartItem[id]}</span>
                    <button className="add" onClick={() => addToCart(id)}>+</button>
                </div>
            </div>
        </div>
    )
}
