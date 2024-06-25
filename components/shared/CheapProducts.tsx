import React from 'react'
import NoResult from './NoResult'
import ProductCard from '../cards/ProductCard'
import { getCheapProducts } from '@/lib/actions/product.action'
import Link from 'next/link'
import { Button } from '../ui/button'

const CheapProducts = async () => {
    const result = await getCheapProducts({})
  return (
    <div>
        <h1 className="my-4 text-2xl font-semibold text-gray-700">Hot under $50</h1>
      <div className="my-6 grid grid-cols-1 gap-2 md:grid-cols-3">
        {result && result?.products && result.products.length > 0 ? (
          result.products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              images={product.images}
              upvotes={product.upvotes.length}
              downvotes={product.downvotes.length}
              reviews={product.reviews}
              price={product.price}
              seller={product.seller}
              />
          ))
        ) : (
          <NoResult
            title="There's no Product to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
          />
        )}
      </div>
      <Link href="/AllCheapProducts" className="flex justify-end">
        <Button className="rounded bg-[#6CA329] px-4 text-white hover:bg-green-600">
          View All 
        </Button>
      </Link>
    </div>
  )
}

export default CheapProducts