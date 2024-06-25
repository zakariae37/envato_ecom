import { HomePageCategories } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const Types = () => {
  return (
    <div className="flex items-center justify-between bg-[#F5F4F4] px-4 py-3">
      <div>
        {HomePageCategories.map((category) => (
          <Link
            key={category.name}
            href={category.route}
            className="px-4 text-sm text-gray-700 hover:text-black"
          >
            {category.name}
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Types;
