"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean | undefined;
}
const Pagination = ({ pageNumber, isNext }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  if (!isNext && pageNumber === 1) {
    return null;
  }
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="rounded-md bg-gray-200 px-4 py-2 text-gray-600 transition duration-300 ease-in-out hover:bg-gray-300"
      >
        Prev
      </Button>
      <p className="text-gray-700">{pageNumber}</p>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="rounded-md bg-gray-200 px-4 py-2 text-gray-600 transition duration-300 ease-in-out hover:bg-gray-300"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
