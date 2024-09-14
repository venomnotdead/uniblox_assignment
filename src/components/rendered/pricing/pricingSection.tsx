import React, { useState } from 'react';

const PricingSection = ({ totalPricing, initialDiscount, onApplyCoupon, onRemoveCoupon,setCouponApplied }) => {
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(initialDiscount);

    const handleApplyCoupon = () => {
        const coupon = localStorage.getItem('coupon')
        const billingProducts = localStorage.getItem('purchase')
        if (coupon && billingProducts) {
            const parsedCode = JSON.parse(coupon)
            const parsedProducts = JSON.parse(billingProducts)
            console.log(parsedProducts.length);
            if (parsedProducts?.length % parsedCode.quantity >= 0) {
                setCouponCode(parsedCode.name)
                const newDiscount = onApplyCoupon(true);
                setDiscount(newDiscount);
                setCouponApplied(true)
            }
            else {
                alert("Not enough orders to place the order")
            }
        }
        else if (!coupon) {
            alert("Coupon code not available")
        }
        else {
            alert("Not enough orders to place the order")
        }
    };

    const handleRemoveCoupon = () => {
        setDiscount(0)
        onRemoveCoupon()
    }

    const finalAmount = totalPricing - discount;

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col mb-4">
                <label htmlFor="coupon" className="text-gray-700 font-medium mb-1">
                    Enter Coupon Code:
                </label>
                <div className="flex items-center">
                    <input
                        id="coupon"
                        type="text"
                        value={couponCode}
                        disabled={true}
                        className="border border-gray-300 rounded-lg p-2 flex-1 mr-2"
                        placeholder="Coupon Code"
                    />
                    {discount ?
                        <button
                            onClick={handleRemoveCoupon}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Remove
                        </button> :
                        <button
                            onClick={handleApplyCoupon}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Request
                        </button>}
                </div>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Total Pricing:</span>
                <span className="text-gray-900 font-semibold">${totalPricing.toFixed(2)}</span>
            </div>
            {
                discount > 0 && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">Discount:</span>
                        <span className="text-red-600 font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                )
            }
            <div className="flex justify-between font-bold text-lg">
                <span>Total Amount Due:</span>
                <span>${finalAmount.toFixed(2)}</span>
            </div>
        </div >
    );
};

export default PricingSection;
