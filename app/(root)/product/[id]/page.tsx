import AddToCartButton from "@/components/shared/AddToCartButton";
import Votes from "@/components/shared/Votes";

import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/actions/product.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import { FaShoppingCart, FaCheckCircle, FaCheck } from "react-icons/fa";

const page = async ({ params }: URLProps) => {
  const { userId: clerkId } = auth();
  const result = await getProductById({ productId: params.id });
  const mongoUser = await getUserById({ userId: clerkId });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-700">
          {result.title}
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-sm">
            <p>
              by <span className="text-blue-500">{result.seller.name}</span>
            </p>
            <div className="flex items-center gap-1 text-gray-700">
              <FaShoppingCart />
              <p>3 sales</p>
            </div>
            <div className="flex items-center gap-1 text-green-500">
              Recently Updated
              <FaCheckCircle />
              Well Documented
              <FaCheckCircle />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-sm font-bold">Item Details</p>
            <div className="flex items-center text-sm">
              Reviews
              <Votes
                userId={JSON.stringify(mongoUser._id)} // the user who vote
                productId={JSON.stringify(result._id)} // the item who voted , (item = question or answer)
                upvotes={result.upvotes.length}
                downvotes={result.downvotes.length}
                hasupVoted={result.upvotes.includes(mongoUser._id)} // check if the user is already vote
                hasdownVoted={result.downvotes.includes(mongoUser._id)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex w-2/3 flex-col items-center">
          <Image
            src={result.images[0]}
            alt={result.title}
            width={1200}
            height={600}
            className="w-[70%] rounded-lg"
          />
          <p className="mt-8 text-lg text-gray-700">{result.description}</p>
        </div>
        <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg">
          <div>
            <h5 className="mb-4 text-lg font-semibold">Regular License</h5>
            <h2 className="text-2xl font-bold">$35</h2>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <p>Quality Checked by {result.seller.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <p>Future updates</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <p>6 months support from PressLayouts</p>
            </div>
          </div>
          <Button className="mt-6 flex w-full items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white">
            <FaShoppingCart className="mr-2" />
            <AddToCartButton
              text="Add To Cart"
              productId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </Button>
          <p className="mt-4 italic text-gray-500">
            Price is in US dollars and excludes tax and handling fees
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {result.images.map(
          (
            image: string | StaticImport,
            index: React.Key | null | undefined
          ) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Image ${index}`}
                width={300}
                height={200}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default page;
