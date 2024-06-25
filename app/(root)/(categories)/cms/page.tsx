import ProductCard from '@/components/cards/ProductCard'
import NoResult from '@/components/shared/NoResult'
import { getCmsProducts } from '@/lib/actions/product.action'
import React from 'react'

const page = async () => {
    const result = await getCmsProducts({})
  return (
    <div>
        <h1 className="my-4 text-2xl font-semibold text-gray-700">CMS Website Templates</h1>
      <div className="my-6 grid grid-cols-1 gap-2 md:grid-cols-3">
        {result && result && result.length > 0 ? (
          result.map((product) => (
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
      
    </div>
  )
}

export default page