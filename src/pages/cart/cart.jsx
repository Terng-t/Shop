import React, { useContext } from 'react'
import { fetchProducts } from '../../api';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item'
import './cart.css'

export const Cart = () => {
    const { cartItem } = useContext(ShopContext)
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    const cartProducts = products.filter(product => cartItem[product.id] > 0);

    const totalAll = cartProducts.reduce((total, product) => {
        return total + product.price * cartItem[product.id];
    }, 0).toFixed(2);


    return (
        <div className='cart'>
            <div className='total'>
                <h2>Total All: ${totalAll}</h2>
            </div>
            <div className='cartItems'>
                {cartProducts.map((product) => (
                    <CartItem key={product.id} data={product} quantity={cartItem[product.id]} />
                ))
                }
            </div>
        </div>
    )
}
