"use server";

import Product from "@/database/product.model";
import { connectToDB } from "../mongoose";
import { GlobalSearchParams } from "./shared";

export async function globalSearch(params: GlobalSearchParams) {
  try {
    connectToDB();
    const { query } = params;
    const regexQuery = { $regex: query, $options: "i" };

    const products = await Product.find({ title: regexQuery }).limit(8);

    const results = products.map((item) => ({
      title: item.title,
      type: "product", // You can customize this if needed
      id: item._id,
    }));

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
  }
}


