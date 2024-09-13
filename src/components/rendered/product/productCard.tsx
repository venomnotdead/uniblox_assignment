import React from 'react'
import Image from 'next/image';
import { Product } from './productList';

const ProductCard = ({ product }: Product) => {
    return (
        <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
            <Image src={product.thumbnail} alt={product.title} width={200} height={200} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductCard