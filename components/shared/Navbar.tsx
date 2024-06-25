import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { getUserById } from "@/lib/actions/user.action";

const Navbar = async () => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserById({ userId: clerkId });
  return (
    <div className="flex h-24 items-center justify-between bg-[#272627] px-8 py-4">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={200}
          height={200}
        />
      </Link>

      <SignedIn>
        <Button className="flex items-center justify-between gap-8 bg-[#333232] text-gray-400 hover:bg-[#333232] hover:text-white ">
          <Link href={`/collection`} className="flex items-center gap-2">
            <FaShoppingCart className="text-xl" />
            <p className="rounded-full bg-[#6DA12A] px-2 text-white">
              {mongoUser?.saved.length}
            </p>
          </Link>

          <UserButton />
        </Button>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="flex items-center justify-between gap-8 bg-[#333232] text-gray-400 hover:bg-[#333232] hover:text-white ">
            <FaShoppingCart />
            <p>Sign In</p>
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default Navbar;
