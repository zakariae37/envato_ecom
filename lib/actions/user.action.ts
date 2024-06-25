"use server"
import User from "@/database/user.model";
import { connectToDB } from "../mongoose";
import { CreateUserParams, DeleteUserParams, GetSavedProductsParams, GetUserByIdParams, ToggleSaveProductsParams, UpdateUserParams } from "./shared";
import Product from "@/database/product.model";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";


export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    await Product.deleteMany({ seller: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params:GetUserByIdParams) {
  try {
    connectToDB()
    const { userId } = params
    const user = await User.findOne({clerkId: userId})
    return user
  } catch (error) {
    console.log(error);
  }
}


export async function toggleSaveProducts(params: ToggleSaveProductsParams) {
  try {
    connectToDB()
    const { userId, productId, path } = params
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('user not found')
    }
    const productIndex = user.saved.indexOf(productId);

    if (productIndex !== -1) { // Product exists in saved array (cart)
      await User.findByIdAndUpdate(
        userId, 
        { $pull: { saved: productId }},
        { new: true }
      )
    } else { // Add product to saved array (cart)
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: productId }},
        { new: true }
      )
    }
    revalidatePath(path)
  } catch (error) {
    console.log(error);
  }
}


export async function getSavedProducts(params:GetSavedProductsParams) {
  try {
    connectToDB()
    const { clerkId } = params
    const user = await User.findOne({ clerkId }).populate({ 
      path: "saved",
      populate: [
        { path: "tags", model: Tag },
        { path: "seller", model: User }
      ]
    })
    if (!user) {
      throw new Error('user not found')
    }
    const savedProducts = user.saved
    return { products: savedProducts }
  } catch (error) {
    console.log(error);
  }
}