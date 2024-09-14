"use client"
import BillingCard from '@/components/rendered/product/billingCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [billingList, setBillingList] = useState([])

    useEffect(() => {
        const purchase = localStorage.getItem('purchase')
        if (purchase) {
            setBillingList(JSON.parse(purchase))
        }
    }, [])
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                    <Image width={400} height={400} src="https://github.com/shadcn.png" alt="Profile Picture" className="w-24 h-24 rounded-full border-2 border-gray-300" />
                    <div>
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-gray-600">john.doe@example.com</p>
                        <p className="text-gray-500">Joined: January 2024</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">About Me</h3>
                    <p className="mt-2 text-gray-700">
                        A passionate software developer with experience in building web applications. Enjoys working on front-end technologies and exploring new frameworks.
                    </p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Purchase List</h2>
                <ul className="space-y-4">
                    {
                        billingList.map((billings, index) => {
                            return <BillingCard key={index} billings={billings} />
                        }).reverse()
                    }
                </ul>
            </div>
        </div>
    )
}

export default Page