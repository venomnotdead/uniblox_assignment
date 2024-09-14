"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './productCard';

interface Review {
    rating: number; 
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    quantity?: number | string;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

interface ProductListProps {
    limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({ limit }) => {
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
            {limit ? products?.map(product => (
                <ProductCard product={product} key={product.id} />
            )) : products.slice(0, limit)?.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductList;
