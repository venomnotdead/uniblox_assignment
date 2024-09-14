import { dateFormatter } from '@/lib/common'
import React, { useEffect, useState } from 'react'
import CheckoutCard from './checkoutCard'

const BillingCard = ({ billings }) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (billings.products) {
            const total = billings.products.reduce((acc, product) => acc + product.price * (product?.quantity || 1), 0)
            setTotal(total)
        }
    }, [billings.products])
    return (
        <div className='bg-white rounded-xl p-2 shadow-lg mb-2'>
            <div>{dateFormatter(billings.date)}</div>
            <div>Discount : {billings.discount}</div>
            {
                billings.products.map((product, i) => {
                    return (
                        <CheckoutCard key={i} product={product} editable={false} />
                    )
                })
            }
            {/* <div>Total : {total}</div> */}
        </div>
    )
}

export default BillingCard