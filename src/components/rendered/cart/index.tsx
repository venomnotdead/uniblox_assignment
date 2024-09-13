"use client"
import React from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const router = useRouter()
    const navigateAddToCart = () => {
        router.push('/checkout')
    }
    return (
        <div onClick={() => navigateAddToCart()} className='fixed bottom-5 right-5 p-3 bg-primary rounded-full cursor-pointer shadow-lg transition-transform transform hover:scale-110'>
            <Icon
                icon="ion:cart"
                width="24"
                height="24"
                className="text-white"
                aria-label="Cart"
            />
        </div>
    )
}

export default Cart