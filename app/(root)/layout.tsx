import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Types from "@/components/shared/Types";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Types />
      <div className="bg-[#FBFAFB] px-8 py-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
