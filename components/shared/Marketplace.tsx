import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  return (
    <div className="my-20 flex items-center justify-end gap-12">
      
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-semibold">
        We&apos;re the largest theme <br /> marketplace in the world
        </h1>
        <Link href="/AllProducts">
          <Button className="bg-[#6CA329] text-white hover:bg-green-500">
            View all themes
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2 rounded-md bg-white p-4 shadow-xl">
        <div className="flex gap-2">
          <Image
            src="/assets/images/pict21.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
          <Image
            src="/assets/images/pict23.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
        </div>
        <div className="flex gap-2">
          <Image
            src="/assets/images/pict22.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
          <Image
            src="/assets/images/pict24.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
