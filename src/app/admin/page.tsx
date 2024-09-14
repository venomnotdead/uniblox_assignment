"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import BillingCard from '@/components/rendered/product/billingCard'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const Page = () => {
    const [coupon, setCoupon] = useState({
        name: '',
        quantity: 0
    })
    const [savedCoupon, setSavedCoupon] = useState(false)
    const [billingList, setBillingList] = useState([])
    const [pass, setPassword] = useState<number | null>()
    const [authenticated, setAuthenticated] = useState<boolean>(false)

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

    const handleVerify = () => {
        if (pass == 123456) {
            setAuthenticated(true)
            return
        }
        setPassword(null)
        alert('Invalid pin entered')
    }
    useEffect(() => {
        if (String(pass).length == 6)
            handleVerify()
    }, [pass])

    return (
        <>
            {
                !authenticated ?<div className="p-4">
                <div className="bg-white p-6 shadow-lg rounded-lg mt-6 max-w-sm mx-auto">
                  <div className="text-lg font-semibold mb-4">Enter PIN</div>
                  <InputOTP maxLength={6} onChange={(e) => setPassword(Number(e))}>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={0} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <InputOTPSlot index={1} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <InputOTPSlot index={2} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <InputOTPSlot index={3} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <InputOTPSlot index={4} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <InputOTPSlot index={5} className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
                    :

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
            }
        </>
    )
}

export default Page