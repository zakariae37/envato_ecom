import Image from "next/image";
import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  _id: string;
  title: string;
  images: string[];
  price: number;
  upvotes: number;
  downvotes: number;
  reviews: number;
  seller: { _id: string; name: string; picture: string };
}

const ProductCard = ({
  _id,
  title,
  images,
  price,
  upvotes,
  downvotes,
  reviews,
  seller,
}: Props) => {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <div className="relative">
        <Link href={`/product/${_id}`}>
          <Image
            src={images[0]}
            alt="image"
            width={200}
            height={200}
            className="h-48 w-full object-cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <h2 className="truncate text-xl font-bold text-gray-700">{title}</h2>
        {seller ? (
          <p className="text-sm text-gray-600">
            by{" "}
            <span className="text-base font-semibold text-gray-700">
              {seller.name}
            </span>
          </p>
        ) : null}

        <div className="mt-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-700 ">${price}</h2>
            <div className="flex items-center gap-4 rounded-md border border-gray-300 p-2">
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/upvoted.svg"
                  alt="upvoted"
                  width={20}
                  height={20}
                />
                <span className="text-sm text-gray-600">{upvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/downvote.svg"
                  alt="downvote"
                  width={20}
                  height={20}
                />
                <span className="text-sm text-gray-600">{downvotes}</span>
              </div>
            </div>
            
          </div>
          <div className="flex gap-2">
            <Button className="rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100">
              <FaHeart />
            </Button>
            <Button className="rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100">
              <FaShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
