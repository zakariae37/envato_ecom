import React from "react";
import NoResult from "./NoResult";
import ProductCard from "../cards/ProductCard";
import { getFreeProducts } from "@/lib/actions/product.action";
import Link from "next/link";
import { Button } from "../ui/button";
import { SearchParamsProps } from "@/types";

const FreeProducts = async ({ searchParams }: SearchParamsProps) => {
  const result = await getFreeProducts({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Grab April&apos;s free items
        </h1>
        <p className="mt-2 text-gray-500">
          There are always new freebies ready for you to enjoy on Envato Market.
          Website templates here on ThemeForest, WordPress plugins, graphic
          assets of all sorts, thousands of background music tracks and more.
          Get them while you can!
        </p>
      </div>
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
      <Link href="/FreeProducts" className="flex justify-end">
        <Button className="rounded bg-[#6CA329] px-4 text-white hover:bg-green-600">
          View All
        </Button>
      </Link>
    </div>
  );
};

export default FreeProducts;
