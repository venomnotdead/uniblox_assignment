"use client"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { getCheckoutProduct } from '@/lib/dataFunctions'
import { Product } from '@/components/rendered/product/productList'
import CheckoutCard from '@/components/rendered/product/checkoutCard'
import PricingSection from '@/components/rendered/pricing/pricingSection'

const Page = () => {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [totalPricing, setTotalPricing] = useState<number>(0)
    const [discount, setTotalDiscount] = useState<number>(0)
    const [couponApplied, setCouponApplied] = useState(false);
    const removeCoupon = () => {
        setCouponApplied(false)
        setTotalDiscount(0);
    }
    const applyCoupon = (valid: boolean) => {
        if (valid) {
            setTotalDiscount(10)
            return 10.00;
        }
        return 0;
    };

    useEffect(() => {
        setProducts(getCheckoutProduct())
    }, [])

    const handlePurchase = () => {
        if (!products.length) return;
        // console.log(products);
        // return
        const pastPurchase = localStorage.getItem('purchase')
        if (pastPurchase) {
            const purchase = JSON.parse(pastPurchase)
            purchase.push({ products: products, discount, date: new Date().getTime() })
            localStorage.setItem('purchase', JSON.stringify(purchase))
        } else {
            const purchase = [{ products: products, discount, date: new Date().getTime() }]
            localStorage.setItem('purchase', JSON.stringify(purchase))
        }
        if (couponApplied) {
            localStorage.removeItem('coupon')
        }
        localStorage.removeItem('products')
        router.push('/')
    }

    useEffect(() => {
        const total = products.reduce((acc, product) => acc + (product.price * (Number(product.quantity) || 1)), 0)
        setTotalPricing(total)
    }, [products])

    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                Checkout
            </h1>
            <Separator />
            <div className='p-2'>

                {
                    products.length ? products.map((product, index) => <CheckoutCard
                        key={index}
                        index={index}
                        editable={true}
                        setProducts={setProducts}
                        product={product} products={products} />)
                        :
                        <div className=''>
                            <div className='text-center'>No products in cart</div>
                            <div className='text-center'>
                                <Button onClick={() => router.push('/')}>View products</Button>
                            </div>
                        </div>
                }
            </div>
            <PricingSection
                totalPricing={totalPricing}
                initialDiscount={discount}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                setCouponApplied={setCouponApplied}
            />
            <div className='p-2 flex'>
                <Button className='w-1/2 m-1 rounded-xl' variant={'outline'} onClick={() => router.back()}>Cancel</Button>
                <Button className='w-1/2 m-1 rounded-xl' onClick={() => handlePurchase()} >Purchase</Button>
            </div>
        </div>
    )
}

export default Page