import { dateFormatter } from '@/lib/common'
import React, { useEffect, useState } from 'react'
import CheckoutCard from './checkoutCard'

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
        <div className='bg-white rounded-xl p-2 shadow-lg mb-2'>
            <div>{dateFormatter(billings.date)}</div>
            {
                billings.products.map((product, i) => {
                    return (
                        <CheckoutCard key={i} product={product} editable={false} />
                    )
                })
            }
            <div>Discount : {billings.discount}</div>
            <div>Total : {total}</div>
        </div>
    )
}

export default BillingCard