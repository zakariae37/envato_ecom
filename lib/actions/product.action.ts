"use server";

import Product from "@/database/product.model";
import { connectToDB } from "../mongoose";
import {
  CreateProductProps,
  EditProductParams,
  GetProductByIdParams,
  GetProductsParams,
  UpvoteProductParams,
  deleteProductParams,
} from "./shared";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";

export async function createProduct(params: CreateProductProps) {
  try {
    connectToDB();
    const {
      title,
      description,
      price,
      categories,
      seller,
      images,
      tags,
      type,
      path,
    } = params;
    const product = await Product.create({
      title,
      description,
      price,
      images,
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

export async function getProducts(params: GetProductsParams) {
  try {
    connectToDB();
    const { searchQuery, filter, page = 1, pageSize = 6 } = params;
    const skipAmount = (page -1 ) * pageSize
    const query: FilterQuery<typeof Product> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "bestrated":
        sortOptions = { upvotes: -1 };
        break;
      case "price":
        sortOptions = { price: 1 };
        break;
      default:
        break;
    }
    const products = await Product.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "seller", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalProducts = await Product.countDocuments(query)
    const isNext = totalProducts > skipAmount + products.length
    return { products, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function getCheapProducts(params: GetProductsParams) {
  try {
    connectToDB();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Product> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "bestrated":
        sortOptions = { upvotes: -1 };
        break;
      case "price":
        sortOptions = { price: 1 };
        break;
      default:
        break;
    }
    const products = await Product.find({
      price: { $gt: 0, $lt: 50 }, // Price greater than 0 and less than 50
      ...query, // Include the query object directly inside the find method
    })
      .populate({ path: "seller", model: User })
      .populate({ path: "tags", model: Tag })
      .sort(sortOptions)
      .limit(3)
      .exec();
    return { products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch cheap products");
  }
}

export async function getFreeProducts(params: any) {
  try {
    connectToDB();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Product> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "bestrated":
        sortOptions = { upvotes: -1 };
        break;
      case "price":
        sortOptions = { price: 1 };
        break;
      default:
        break;
    }
    const products = await Product.find({ ...query, price: 0 })
      .populate({ path: "seller", model: User })
      .populate({ path: "tags", model: Tag })
      .sort(sortOptions)
      .limit(3)
      .exec();

    return { products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products with zero price");
  }
}

export async function getProductById(params: GetProductByIdParams) {
  try {
    connectToDB();
    const { productId } = params;
    const product = await Product.findById(productId)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "seller", model: User });
    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function upvoteProduct(params: UpvoteProductParams) {
  try {
    connectToDB();
    const { userId, productId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const product = await Product.findByIdAndUpdate(productId, updateQuery, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function downvoteProduct(params: UpvoteProductParams) {
  try {
    connectToDB();
    const { userId, productId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const product = await Product.findByIdAndUpdate(productId, updateQuery, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getCmsProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "CMS" }) // Filter by category 'CMS'
      .populate("tags") // Assuming you want to populate tags
      .populate("seller") // Assuming you want to populate seller
      .exec();

    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getShopifyProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "Shopify" })
      .populate("tags")
      .populate("seller")
      .exec();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getWordPressProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "WordPress" })
      .populate("tags")
      .populate("seller")
      .exec();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getCodeProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "Code" })
      .populate("tags")
      .populate("seller")
      .exec();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getHTMLProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "HTML" })
      .populate("tags")
      .populate("seller")
      .exec();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getEcommerceProducts(params: any) {
  try {
    connectToDB();
    const products = await Product.find({ type: "E-commerce" })
      .populate("tags")
      .populate("seller")
      .exec();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(params:deleteProductParams) {
  try {
    connectToDB()
    const { productId, path } = params
    await Product.deleteOne({ _id: productId });
    await Tag.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    
  }
}

export async function editProduct(params:EditProductParams) {
  try {
    connectToDB()
    const { productId, title, price, images, path } = params
    const product = await Product.findById(productId).populate({ path: 'tags', model: Tag })
    if (!product) {
      console.log('product not found');
    }
    product.title = title;
    product.price = price;
    product.images = images;

    await product.save()
    revalidatePath(path)
  } catch (error) {
    console.log(error);
  }
}
