import React from 'react'
import Image from 'next/image';
import { Product } from './productList';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Icon } from "@iconify/react"

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div key={product.id} className="relative border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">

            <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-40 object-cover"
            />
            <div className='flex flex-col'>
                <div className="p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h2>
                    <p className="text-primary text-xl font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <div>
                    <ToggleGroup type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle favorite" className="hover:bg-gray-200 transition">
                            <Icon icon="uit:favorite" width="24" height="24" className="text-red-500" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle cart" className="hover:bg-gray-200 transition">
                            <Icon icon="ion:cart" width="24" height="24" className="text-blue-500" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    )
}

export default ProductCard