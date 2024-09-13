import React from 'react'
import { Icon } from '@iconify/react'

const Cart = () => {
    return (
        <div className='fixed bottom-5 right-5 p-3 bg-primary rounded-full cursor-pointer shadow-lg transition-transform transform hover:scale-110'>
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