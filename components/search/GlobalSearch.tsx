"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const query = searchParams.get("global");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, searchParams, query]);

  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
          className="py-8 shadow-md focus-visible:ring-0 focus-visible:ring-transparent"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
