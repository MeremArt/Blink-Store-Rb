'use client'
import React, { useState } from "react";
import NavBar from "@/components/navbar";
import SmallNavBar from "@/components/small-navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSmallNav, setIsSmallNav] = useState(false);

  const CloseHandler = () => {
    setIsSmallNav((prev) => !prev);
  };
  const OpenHan = () => {
    setIsSmallNav((prev) => !prev);
  };
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="w-full mx-auto">
        <NavBar openSmallNav={OpenHan} />
        {isSmallNav && <SmallNavBar onClick={CloseHandler} />}
      </div>
      <div className="w-full">
        <div className="mx-auto flex flex-col items-center max-w-[1440px] px-1 py-6 gap-6 mmd:px-[1rem] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
