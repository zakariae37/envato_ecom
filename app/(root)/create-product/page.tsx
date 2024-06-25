import React from "react";
import Product from "@/components/forms/Product";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const createProduct = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const mongoUser = await getUserById({userId})
  return (
    <div>
      <h1 className='text-3xl font-bold'>Add New Product</h1>
        <Product mongoUserId={JSON.stringify(mongoUser._id)}/>
    </div>  
)};

export default createProduct;
