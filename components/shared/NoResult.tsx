import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
}
const NoResult = ({ title, description }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result"
        width={270}
        height={270}
        className="block object-contain"
      />

      <h2 className="mt-8 text-[24px] font-bold leading-[31.2px]">{title}</h2>
      <p className=" my-3.5 max-w-md text-center">{description}</p>
    </div>
  );
};

export default NoResult;
