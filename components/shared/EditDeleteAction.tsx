"use client";
import { deleteProduct } from "@/lib/actions/product.action";
import { FileEditIcon, TrashIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  itemId: string;
}
const EditDeleteAction = ({ itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/product/edit/${JSON.parse(itemId)}`)
  }
  const handleDelete = async () => {
    await deleteProduct({ productId: JSON.parse(itemId), path: pathname });
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      <Button
        className="size-8 rounded-full border border-gray-200 dark:border-gray-800"
        size="icon"
        variant="ghost"
        onClick={handleEdit}
      >
        <FileEditIcon className="size-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button
        className="size-8 rounded-full border border-gray-200 dark:border-gray-800"
        size="icon"
        variant="ghost"
        onClick={handleDelete}
      >
        <TrashIcon className="size-4" />
        <span className="sr-only">Delete</span>
      </Button>


    </div>
  );
};

export default EditDeleteAction;


