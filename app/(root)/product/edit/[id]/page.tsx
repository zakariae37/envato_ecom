import Product from '@/components/forms/Product'
import { getProductById } from '@/lib/actions/product.action'
import { getUserById } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'
import React from 'react'

const page = async ({ params }: SearchParamsProps) => {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const mongoUser = await getUserById({ userId });
  const result = await getProductById({ productId: params.id })
  return (
    <>
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <div className="mt-9">
        <Product
          type='Edit'
          mongoUserId={mongoUser._id}
          productDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default page