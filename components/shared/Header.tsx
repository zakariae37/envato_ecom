import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import GlobalSearch from "../search/GlobalSearch";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-10 ">
      <div className="flex flex-col items-center gap-4">
        <div className="sm:max-w-none md:max-w-[600px]">
          {" "}
          {/* Adjust max-width for medium devices */}
          <h1 className="text-4xl font-bold text-gray-800">
            Professional WordPress Themes & Website Templates for any project
          </h1>
          <p className="mt-2 text-gray-700">
            Discover thousands of easy to customize themes, templates & CMS
            products, made by world-class developers.
          </p>
        </div>
        <div className="relative w-full md:w-[450px]">
          {" "}
          {/* Adjust input width for medium devices */}
          <GlobalSearch />
          <Button className="absolute inset-y-3 right-3 rounded-md bg-[#6DA02B] px-4 py-2 text-white shadow-md hover:bg-[#6DA02B]">
            <FaSearch className="pr-2 text-2xl text-white" /> Search
          </Button>
        </div>
      </div>
      <div className="hidden md:block">
        {" "}
        {/* Hide image in medium and smaller devices */}
        <Image
          src="/assets/images/header.webp"
          alt="header"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};

export default Header;
