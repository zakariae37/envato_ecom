"use client"
import { toggleSaveProducts } from '@/lib/actions/user.action'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    text: string,
    productId: string,
    userId: string,
    hasSaved: boolean,
}
const AddToCartButton = ({ text, productId, userId, hasSaved }: Props) => {
    const pathname = usePathname()
    const [isSaved, setIsSaved] = useState(hasSaved)

    const handleToggleSave = async () => {
        const parsedUserId = JSON.parse(userId)
        const parsedProductId = JSON.parse(productId)
        if (isSaved) {
            // Remove from cart
            await toggleSaveProducts({
                userId: parsedUserId,
                productId: parsedProductId,
                path: pathname
            })
        } else {
            // Add to cart
            await toggleSaveProducts({
                userId: parsedUserId,
                productId: parsedProductId,
                path: pathname
            })
        }
        setIsSaved(!isSaved) // Toggle the saved state
    }

    return (
        <p onClick={handleToggleSave}>
            {isSaved ? 'Remove from Cart' : 'Add to Cart'}
        </p>
    )
}

export default AddToCartButton
