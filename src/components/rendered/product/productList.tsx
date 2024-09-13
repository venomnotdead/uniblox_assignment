"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Spinner } from 'shadcn'; // Adjust the import path if needed, or use a native spinner
import ProductCard from './productCard';

export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const ProductList: React.FC = ({ limit }: { limit?: number }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCTS_URL}`);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    console.log(loading);
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <Spinner className="text-blue-500" /> {/* Adjust styling as needed */}
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {length ? products?.map(product => (
                <ProductCard product={product} key={product.id} />
            )) : products.slice(0, limit)?.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductList;
