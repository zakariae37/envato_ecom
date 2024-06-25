import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ShoppingCartProps {
  _id: string;
  title: string;
  seller: { name: string };
  images: string[];
  price: number;
}

const ShoppingCart = ({ _id, title, seller, images, price }: ShoppingCartProps) => {
  
  return (
    <div className="relative flex items-center justify-between rounded-lg bg-white p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative size-20">
        <Link href={`/product/${_id}`}>
          <Image
            src={images[0]}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </Link>
          
        </div>

        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {seller ? (
            <p className="text-gray-500">
              by <span>{seller.name}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">${price}</h2>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
