import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  totalPrice: number;
}

const TotalPriceCard = ({ totalPrice }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">Your Cart Total</h3>
      <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>

      <Button className="w-full bg-[#83B441] text-white hover:bg-[#83B441]">
        <Link href="/checkout">Secure Chekout</Link>
      </Button>
    </div>
  );
};

export default TotalPriceCard;
