import { getProducts } from "@/lib/actions/product.action";
import React from "react";
import NoResult from "./NoResult";
import ProductCard from "../cards/ProductCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { SearchParamsProps } from "@/types";

const Products = async ({ searchParams } : SearchParamsProps) => {
  const result = await getProducts({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Check out our newest themes and templates
        </h1>
        <p className="mt-2 text-gray-500">
          Our dedicated team meticulously evaluates every submission from our
          vibrant community, ensuring each entry upholds our rigorous standards
          for exceptional design and functionality.
        </p>
      </div>
      <h1 className="my-4 text-2xl font-semibold text-gray-700">ALL ITEMS</h1>
      <div className="my-6 grid grid-cols-1 gap-2 md:grid-cols-3">
        {result && result?.products && result.products.length > 0 ? (
          result.products
            .slice(0, 3)
            .map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                title={product.title}
                seller={product.seller}
                upvotes={product.upvotes.length}
                downvotes={product.downvotes.length}
                images={product.images}
                reviews={product.reviews}
                price={product.price}
              />
            ))
        ) : (
          <NoResult
            title="There's no Product to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
          />
        )}
      </div>
      <Link href="/AllProducts" className="flex justify-end">
        <Button className="rounded bg-[#6CA329] px-4 text-white hover:bg-green-600">
          View All
        </Button>
      </Link>
    </div>
  );
};

export default Products;
