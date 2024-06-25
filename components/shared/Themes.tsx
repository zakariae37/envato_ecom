import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ImageGallery = () => {
  return (
    <div className="my-20 flex items-center gap-12">
      <div className="flex flex-col gap-2 rounded-md bg-white p-4 shadow-xl">
        <div className="flex gap-2">
          <Image
            src="/assets/images/pict17.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
          <Image
            src="/assets/images/pict18.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
        </div>
        <div className="flex gap-2">
          <Image
            src="/assets/images/pict19.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
          <Image
            src="/assets/images/pict20.jpg"
            alt="image"
            width={300}
            height={300} // Adjusted height
            className="h-48 rounded-r-md"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-semibold">
          Unique themes and <br /> templates for every budget <br /> and every
          project.
        </h1>
        <Link href="/AllProducts">
          <Button className="bg-[#6CA329] text-white hover:bg-green-500">
            View all themes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ImageGallery;
