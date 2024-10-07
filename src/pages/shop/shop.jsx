import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import { Product } from './product';
import './shop.css';

export const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(8);
    const [loading, setLoading] = useState(true); // เพิ่มสถานะ loading

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true); // เริ่มการโหลด
            const products = await fetchProducts();
            setProducts(products);
            setLoading(false); // โหลดเสร็จสิ้น
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
                {loading ? ( // ถ้า loading ให้แสดงข้อความ Loading
                    <p className="loading">Loading...</p>
                ) : (
                    <>
                        {displayedProducts.map((product) => (
                            <Product key={product.id} data={product} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <p className="noProducts">Not Found</p>
                        )}
                    </>
                )}
            </div>

            {!loading && displayCount < filteredProducts.length && (
                <button className='showMoreBttn' onClick={handleShowMore}>
                    Show More
                </button>
            )}
        </div>
    );
};
