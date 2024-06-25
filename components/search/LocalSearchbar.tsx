"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface CustomInputProps {
  route: string;
  placeholder: string;
}

const LocalSearchbar = ({ route, placeholder }: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, isSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, route, router, pathname, search, query]);
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => isSearch(e.target.value)}
      className="w-full rounded-none border border-gray-300 px-4 py-6 shadow-sm"
    />
  );
};

export default LocalSearchbar;
