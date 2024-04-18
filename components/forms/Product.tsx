"use client";
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/lib/validations";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { createProduct } from "@/lib/actions/product.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  mongoUserId: string;
}

const Product = ({ mongoUserId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categories: "Code",
      type: "WordPress",
      tags: []
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsSubmitting(true);
    try {
      await createProduct({
        title: values.title,
        description: values.description,
        price: values.price,
        categories: values.categories,
        type: values.type,
        tags: values.tags,
        seller: JSON.parse(mongoUserId),
        path: pathname,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement; // get the tag input
      const tagValue = tagInput.value.trim(); // trim for delete white spaces

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 charachters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  // const handleInputKeyDownPress = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   field: any
  // ) => {
  //   if (e.key === "Enter" && field.name === "images") {
  //     e.preventDefault();
  //     const imageInput = e.target as HTMLInputElement; // get the image input
  //     const imageValue = imageInput.value.trim(); // trim for delete white spaces

  //     if (imageValue !== "") {

  //       if (!field.value.includes(imageValue as never)) {
  //         form.setValue("images", [...field.value, imageValue]);
  //         imageInput.value = "";
  //         form.clearErrors("images");
  //       }
  //     } else {
  //       form.trigger();
  //     }
  //   }
  // };

  // const handleImageRemovePress = (image: string, field: any) => {
  //   const newImages = field.value.filter((i: string) => i !== image);
  //   form.setValue("images", newImages);
  // };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-[400px]" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-[400px]" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-[400px]" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full rounded border border-gray-300 p-2">
                    <div className="line-clamp-1 flex-1 text-left">
                      <SelectValue placeholder="Select a Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Themes & Templates">
                      Web Themes & Templates
                    </SelectItem>
                    <SelectItem value="Code">Code</SelectItem>
                    <SelectItem value="Graphics">Graphics</SelectItem>
                    <SelectItem value="Photo">Photo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full rounded border border-gray-300 p-2">
                    <div className="line-clamp-1 flex-1 text-left">
                      <SelectValue placeholder="Select a Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WordPress">WordPress</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="Shopify">Shopify</SelectItem>
                    <SelectItem value="CMS">CMS</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Add Tags <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Add Tags ..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                      className="w-[400px]"
                    />
                    {field.value.length > 0 && (
                      <div className="mt-2.5 flex items-center justify-start gap-2.5">
                        {field.value.map((tag: any) => (
                          <Badge
                            key={tag}
                            className="flex items-center justify-center gap-2 rounded-md border-none bg-gray-500 px-4 py-2 text-[10px] font-medium capitalize leading-[13px]"
                            onClick={() => handleTagRemove(tag, field)}
                          >
                            {tag}

                            <Image
                              src="/assets/icons/close.svg"
                              alt="close"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain"
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="col-span-full" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Product;
