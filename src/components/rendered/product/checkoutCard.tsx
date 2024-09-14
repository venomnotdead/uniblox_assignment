import Image from 'next/image'
import React from 'react'
import { Product } from './productList'
import { Input } from '@/components/ui/input'
import { removeProductFromCart } from '@/lib/dataFunctions'

const CheckoutCard = ({ product, index, setProducts, products, editable }: { editable?: boolean, products: Product[], product: Product, index: number, setProducts: any }) => {
    const handleQuantitiyChange = (e: Event) => {
        const quantity = e?.target?.value;
        if (quantity > 0) {
            setProducts((prevProducts: Product[]) => {
                const newProducts = [...prevProducts];
                newProducts[index].quantity = quantity;
                return newProducts;
            });
        }
    }

    const handleProductRemove = () => {
        removeProductFromCart(product.id)
        const newProducts = products.filter((p) => p.id != product.id)
        setProducts(newProducts)
    }

    return (
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1 align-start">
                <div className='flex justify-between'>
                    <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>

                </div>
                <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
                <p className="text-gray-700">Quantity:
                    {editable ? <Input onChange={(e) => handleQuantitiyChange(e)} type='number' value={product.quantity || 1} /> : product.quantity || 1} </p>
            </div>
            <div className="text-right">
                {
                    editable &&
                    <div onClick={() => handleProductRemove()}>remove</div>
                }
                <p className="text-xl font-bold text-gray-900">
                    ${(product.price * (product?.quantity || 1)).toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default CheckoutCard