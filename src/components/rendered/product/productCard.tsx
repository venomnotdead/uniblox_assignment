import React from 'react'
import Image from 'next/image';
import { Product } from './productList';
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { addProductToCart, removeProductFromCart } from '@/lib/dataFunctions';

const ProductCard = ({ product }: { product: Product }) => {
    const router = useRouter()
    const { toast } = useToast()

    const handleProductClick = (id: number) => {
        router.push(`/${id}`)
    }
    return (
        <div key={product.id} className="relative border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-40 object-cover"
            />
            <div>
                <div className="p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800 cursor-pointer" onClick={() => handleProductClick(product.id)}>{product.title}</h2>
                    <div className='flex justify-between'>
                        <p className="text-primary text-xl font-semibold">${product.price.toFixed(2)}</p>
                        <div>
                            <Button
                                variant={'outline'}
                                onClick={() => {
                                    addProductToCart(product)
                                    toast({
                                        title: `${product.title} added to your cart`,
                                        action: (
                                            <ToastAction onClick={() => removeProductFromCart(product.id)} altText="Goto schedule to undo">Undo</ToastAction>
                                        ),
                                    })
                                }}>
                                <Icon icon="ion:cart" width="24" height="24" className="text-blue-500" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard