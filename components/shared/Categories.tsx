import { HomePageCategories } from "@/constants/filters";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {HomePageCategories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col items-center justify-center gap-10 rounded-md bg-white px-6 pt-4 shadow-md transition duration-300 hover:scale-105"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Link
              href={category.route}
              className="mb-2 text-3xl font-bold hover:underline"
            >
              {category.name}
            </Link>
            <p className="text-gray-600">{category.desc}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <p className="text-blue-400 ">Newest</p>
              <p className="text-blue-400">Bestsellers</p>
            </div>
          </div>
          <div>
            <Image
              src={category.img}
              alt={category.name}
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
