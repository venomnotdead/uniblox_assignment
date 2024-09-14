import { dateFormatter } from '@/lib/common'
import React, { useEffect, useState } from 'react'
import CheckoutCard from './checkoutCard'
import { Product } from './productList'

const BillingCard = ({ billings }) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (billings && billings.products) {
            // Calculate total by reducing over the products array
            const totalAmount = billings.products.reduce((acc, product) => {
                return acc + (product.price * (product.quantity || 1));
            }, 0);
            setTotal(totalAmount);
        }
    }, [billings]);
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="text-lg font-semibold text-gray-800 mb-4">
                {dateFormatter(billings.date)}
            </div>

            {billings.products.length > 0 ? (
                <div className="space-y-4 mb-4">
                    {billings.products.map((product: Product, i: number) => (
                        <CheckoutCard key={i} index={i} product={product} editable={false} />
                    ))}
                </div>
            ) : (
                <div className="text-gray-500">No products available.</div>
            )}

            <div className="flex justify-between text-gray-800 mt-4 border-t pt-4 border-gray-200">
                <span className="font-medium">Discount:</span>
                <span className="font-semibold">{billings.discount ? `$${billings.discount.toFixed(2)}` : 'N/A'}</span>
            </div>

            <div className="flex justify-between text-gray-800 mt-2">
                <span className="font-medium">Total:</span>
                <span className="font-semibold text-lg">${(total - billings.discount).toFixed(2)}</span>
            </div>
        </div>

    )
}

export default BillingCard