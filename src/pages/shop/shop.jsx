import React from 'react'
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import { Product } from './product';
import './shop.css'


export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(8);


    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };

        getProducts();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDisplayCount(8);
    };

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 8);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedProducts = filteredProducts.slice(0, displayCount);

    return (
        <div className='shop'>
            <div className="shopTitle">
                <form>
                    <input
                        type="text"
                        placeholder='Enter your product name'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>

            <div className='products'>
                {displayedProducts.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
            <div>
                {filteredProducts.length === 0 && (
                    <p className="noProducts">Not Found</p>
                )}
            </div>
            {displayCount < filteredProducts.length && (
                <button className='showMoreBttn' onClick={handleShowMore}>
                    Show More
                </button>
            )}
        </div>
    )
}
