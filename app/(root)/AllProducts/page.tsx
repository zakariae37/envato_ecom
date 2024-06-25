import NoResult from "@/components/shared/NoResult";
import { Button } from "@/components/ui/button";
import { FaChartSimple } from "react-icons/fa6";
import { getProducts } from "@/lib/actions/product.action";
import React from "react";
import CardProduct from "@/components/cards/CardProduct";
import LocalSearchbar from "@/components/search/LocalSearchbar";
import { SearchParamsProps } from "@/types";
import Filter from "@/components/shared/Filter";
import { FiltersTypes } from "@/constants/filters";

const AllProducts = async ({ searchParams } : SearchParamsProps) => {
  const result = await getProducts({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <div>
        <div className="relative w-full">
          <LocalSearchbar
            route="/AllProducts"
            placeholder="Search within these results"
          />
          <Button className="absolute inset-y-0 right-0 rounded-none bg-[#6DA02B] px-10 py-6 text-white shadow-md hover:bg-[#6DA02B]">
            Search
          </Button>
        </div>
        <p className="text-gray-700">
          You found <span className="font-bold">{result?.products.length}</span> website templates
          cheaper than $39 sorted by best sellers.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaChartSimple />
            <h4 className="font-bold">Filter & Refine</h4>
          </div>
          <div className="my-4 flex items-center gap-6">
            <p>Price is in US dollars and excludes tax and handling fees</p>
            <Filter filters={FiltersTypes} />

          </div>
        </div>
        <div className="flex flex-col gap-10">
          {result && result?.products && result.products.length > 0 ? (
            result.products.map((product) => (
              <CardProduct
                key={product._id}
                _id={product._id}
                title={product.title}
                seller={product.seller}
                images={product.images}
                tags={product.tags}
                price={product.price}
                createdAt={product.createdAt}
                description={product.description}
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
    </>
  );
};

export default AllProducts;
