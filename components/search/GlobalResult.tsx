"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const [result, setResult] = useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const global = searchParams.get("global");

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      setResult([]);
      try {
        const res = await globalSearch({ query: global });
        // @ts-ignore
        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global]);

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-white py-5 shadow-md">
      <div className="my-5 h-px bg-gray-600" />
      <div className="space-y-5">
        <p className="px-5 text-lg font-semibold">Top Match</p>
        {isLoading ? (
          <div className="flex items-center justify-center px-5 py-8">
            <p className="text-gray-600">Browsing the entire database...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-5">
            {result.length > 0 ? (
              result.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition duration-300 ease-in-out hover:bg-gray-50"
                >
                  <div className="flex flex-col">
                    <p className="line-clamp-1 text-lg font-medium">
                      {item.title}
                    </p>
                    <p className="text-sm capitalize text-gray-500">
                      {item.type}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="rounded-md bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                      View
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-600">Oops, no results found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
