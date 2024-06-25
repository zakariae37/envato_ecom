import { z } from "zod";
const CategoryEnum = z.enum([
  "Web Themes & Templates",
  "Code",
  "Graphics",
  "Photo",
]);

const TypeEnum = z.enum([
  "WordPress",
  "HTML",
  "Shopify",
  "CMS",
  "E-commerce",
]);

export const productSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(10).max(900),
  price: z.coerce.number(),
  categories: CategoryEnum,
  type: TypeEnum,
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  images: z.array(z.string())
});
