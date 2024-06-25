"use client";

import { downvoteProduct, upvoteProduct } from "@/lib/actions/product.action";
import { formatNumberWithExtension } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {

  userId: string;
  productId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({

  userId,
  productId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,

}: Props) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }
    if (action === "upvote") {
      
        await upvoteProduct({
          productId: JSON.parse(productId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
     
    }
    if (action === 'downvote') {
      
        await downvoteProduct ({
          productId: JSON.parse(productId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        })
     
    }
  };

  
  return (
    <div className="flex gap-5">
      <div className="flex items-center justify-center gap-2.5">
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            onClick={() => handleVote("upvote")}
            className="cursor-pointer"
          />
          <div className="flex min-w-[18px] items-center justify-center rounded-sm bg-gray-200 p-1">
            <p className="text-[10px] font-medium leading-[13px] text-gray-800">
              {formatNumberWithExtension(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            onClick={() => handleVote("downvote")}
            className="cursor-pointer"
          />
          <div className="flex min-w-[18px] items-center justify-center rounded-sm bg-gray-200 p-1">
            <p className="text-[10px] font-medium leading-[13px] text-gray-700">
              {formatNumberWithExtension(downvotes)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
