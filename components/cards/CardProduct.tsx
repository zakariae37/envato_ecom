import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  images: string[];
  price: number;
  createdAt: Date;
  seller: { _id: string; name: string; picture: string };
  description: string;
  tags: { _id: string; name: string }[];
}

const CardProduct = ({
  _id,
  title,
  images,
  price,
  createdAt,
  seller,
  description,
  tags,
}: Props) => {
  return (
    <div className="flex overflow-hidden rounded-lg bg-white shadow-lg ">
      <div className="w-1/3">
        <Link href={`/product/${_id}`}>
          <Image
            src={images[0]}
            alt="image"
            width={200}
            height={200}
            className="h-60 w-full object-cover"
          />
        </Link>
      </div>
      <div className="flex-1 p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-700">{title}</h3>
        <p className="mb-2 text-sm italic text-gray-600">
          by <span className="font-bold">{seller.name}</span>
        </p>
        <p className="max-w-[350px] text-gray-700">
          {description.substr(0, 150)}...
        </p>
      </div>
      <div className="flex w-1/4 flex-col justify-between p-4">
        <FaHeart className="mr-2 text-2xl text-gray-400" />

        <div className="flex flex-col items-center gap-1 text-sm">
          <h2 className="text-xl font-bold">${price}</h2>

          <p className="text-gray-500">1.7k Sales</p>
          <p className="text-gray-500">Created {getTimestamp(createdAt)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag._id}
              className="inline-block rounded-md bg-blue-500 px-2 py-1 text-sm font-medium text-white shadow-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;

