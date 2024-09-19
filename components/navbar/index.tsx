import React from "react";
import { Button } from "../button";
import { Typography } from "../typography";
import Image from "next/image";
import Link from "next/link"; 

import logo from "@/assets/images/Logo - Ribh Finance.png";
import Hamburger from "@/assets/svg-comps/purple-hamburger";
import smallLogo from "@/assets/images/Logosmall.svg";

type NavBarProps = {
  // openModal: () => void;
  openSmallNav : ()=> void;
};


export default function NavBar(prop: NavBarProps) {

  const { openSmallNav } = prop;
  return (
    <div className="flex h-[88px]  mmd:px-[16px]  mmd:py-[16px] px-24 py-4 justify-between items-center">
      <div className="flex items-center gap-10">
        <div>
          <Link href="/">
            <Image
              src={logo}
              className="mmd:hidden"
              alt="logo"
              width={200}
              height={43.373}
            />
            <Image
              src={smallLogo}
              className="lg:hidden"
              alt="logo"
              width={136}
              height={35.2}
            />
          </Link>
        </div>
        <div className="flex items-center gap-12 mmd:hidden">
          <Link href="/overview">
            <Typography className="cursor-pointer">Home</Typography>
          </Link>

          <Link href="/products/create-products">
            <Typography className="cursor-pointer">Products</Typography>
          </Link>
        </div>
      </div>
      <div className="mmd:hidden">
        {/* <Button
          label="Join the Waitlist"
          customClassName="flex h-[56px] px-6 py-4 justify-center items-center gap-1 bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] text-white rounded-[8px]"
        /> */}
      </div>
      <div className="lg:hidden" onClick={openSmallNav}>
        <Hamburger />
      </div>
    </div>
  );
}
