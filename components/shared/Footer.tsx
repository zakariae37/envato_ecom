import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1A1A1A] px-8 py-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-20 md:gap-y-0">
          {footerLinks.map((link) => (
            <div key={link.title} className="flex flex-col gap-y-4">
              <h3 className="font-bold text-white">{link.title}</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-none ">
                {link.links.map((item) => (
                  <Link key={item.route} href={item.route}>
                    <p className="text-gray-400 transition-colors duration-300 hover:text-white">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center md:gap-5">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={180}
            height={180}
          />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-4">
            <div>
              <p className="font-bold text-white">+1,030,709</p>
              <p className="text-sm text-gray-400">items sold</p>
            </div>
            <div>
              <p className="font-bold text-white">$15,690,370</p>
              <p className="text-sm text-gray-400">community earnings</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="mt-8 text-center text-white">@copyright 2024</h1>
      </div>
    </div>
  );
};

export default Footer;
