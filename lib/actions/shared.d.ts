import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateProductProps {
  title: string;
  description: string;
  price: number;
  categories: string;
  type: string;
  seller: Schema.Types.ObjectId;
  tags: string[];
  path: string;
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetUserByIdParams {
  userId: string | null
}

export interface GetProductByIdParams {
  productId: string
}

export interface ToggleSaveProductsParams {
  userId: string,
  productId: string,
  path: string
}
export interface GetSavedProductsParams {
  clerkId: string;

}

export interface UpvoteProductParams{
  productId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface GlobalSearchParams {
  query?: string | null,
  type?: string | null
}

