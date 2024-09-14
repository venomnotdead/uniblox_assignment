"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import BillingCard from '@/components/rendered/product/billingCard'

const Page = () => {
    const [coupon, setCoupon] = useState({
        name: '',
        quantity: 0
    })
    const [savedCoupon, setSavedCoupon] = useState(false)
    const [billingList, setBillingList] = useState([])

    useEffect(() => {
        const preCoupon = localStorage.getItem('coupon')
        const purchase = localStorage.getItem('purchase')
        if (purchase) {
            setBillingList(JSON.parse(purchase))
        }
        if (preCoupon) {
            setCoupon(JSON.parse(preCoupon))
            setSavedCoupon(true)
        }
    }, [])

    const handleChange = (e: Event) => {
        const { name, value } = e.target
        switch (name) {
            case "name":
                setCoupon({ ...coupon, name: value?.toUpperCase() })
                break;
            case "quantity":
                setCoupon({ ...coupon, [name]: parseInt(value) })
                break;
            default:
                setCoupon({ ...coupon, [name]: value })
                break;
        }
    }

    const handleCouponSave = () => {
        if (coupon.name && coupon.quantity) {
            localStorage.setItem('coupon', JSON.stringify(coupon))
            setSavedCoupon(true)
        }
    }

    const handleCouponDelete = () => {
        setCoupon({
            name: '',
            quantity: 0
        })
        setSavedCoupon(false)
        localStorage.removeItem('coupon')
    }

    return (
        <div>
            <div>
                Admin
            </div>
            <div>
                <div className='p-1'>
                    {
                        savedCoupon ? <div className='bg-white p-5 rounded-xl shadow-lg'>
                            <div className='flex justify-between'>
                                <div>{coupon.name}</div>
                                <div className='flex justify-around'>
                                    <div className='mr-2'>
                                        {coupon.quantity}
                                    </div>
                                    <div onClick={() => { handleCouponDelete() }}>
                                        <Icon icon="material-symbols:delete" width="24" height="24" />
                                    </div>
                                </div>
                            </div>
                        </div> :
                            <div className='p-2'>
                                <div>
                                    <Input name='name' placeholder='Coupon Code' value={coupon.name} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className='mt-2'>
                                    <Input name='quantity' placeholder='Quantity limit' value={coupon.quantity} onChange={(e) => handleChange(e)} type='number' />
                                </div>
                                <div className='flex justify-end mt-2'>
                                    <Button className='rounded-xl' variant={'outline'}>Cancel</Button>
                                    <Button onClick={() => handleCouponSave()} className='rounded-xl'>Save</Button>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div>
                <div>
                    List
                </div>
                <div>
                    {
                        billingList.map((billings, index) => {
                            console.log(billings);
                            return <BillingCard key={index} billings={billings} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Page