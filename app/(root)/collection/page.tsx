import ShopingCart from "@/components/cards/ShopingCart";
import TotalPriceCard from "@/components/cards/TotalPriceCard";
import NoResult from "@/components/shared/NoResult";
import { getSavedProducts } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const ShoppingCartPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const result = await getSavedProducts({ clerkId: userId });
  const totalPrice =
    result?.products?.reduce((acc: any, product: { price: any; }) => acc + product.price, 0) || 0;

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-gray-700">Shopping Cart</h1>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="col-span-3 flex flex-col gap-4">
          {result && result?.products && result.products.length > 0 ? (
            result.products.map(
              (product: {
                _id: string;
                title: string;
                seller: { _id: string; name: string; picture: string };
                images: string[];
                price: number;
              }) => (
                <ShopingCart
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  seller={product.seller}
                  images={product.images}
                  price={product.price}
                />
              )
            )
          ) : (
            <NoResult
              title="There's no products saved to show"
              description="Be the first to break the silence! 🚀 Save some products and see them here."
            />
          )}
        </div>

        <div className="col-span-1">
          <TotalPriceCard totalPrice={totalPrice} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
