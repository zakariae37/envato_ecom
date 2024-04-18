"use server";

import Product from "@/database/product.model";
import { connectToDB } from "../mongoose";
import { CreateProductProps } from "./shared";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";


export async function createProduct(params: CreateProductProps) {
  try {
    connectToDB();
    const {
      title,
      description,
      price,
      categories,
      seller,
      tags,
      type,
      path,
    } = params;
    const product = await Product.create({
      title,
      description,
      price,
      categories,
      seller,
      type,
      path,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { products: product._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Product.findOneAndUpdate(product._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

