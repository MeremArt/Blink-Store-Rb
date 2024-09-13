import React from "react";
import { Button } from "../button";
import { Typography } from "../typography";
import Image from "next/image";

import logo from "@/assets/images/Logo - Ribh Finance.png";
export default function NavBar() {
  return (
    <div className="flex h-[88px] px-24 py-4 justify-between items-center">
      <div className="flex items-center gap-10">
        <div>
          <Image src={logo} alt="logo" width={200} height={43.373} />
        </div>
        <div className="flex items-center gap-12">
          <Typography>Home</Typography>
          <Typography>Products</Typography>
          <Typography>Contact Us</Typography>
          {/* <WalletModalButton /> */}
        </div>
      </div>
      <div>
        <Button
          label="Join the Waitlist"
          customClassName="flex h-[56px] px-6 py-4 justify-center items-center gap-1 bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] text-white rounded-[8px]"
        />
      </div>
    </div>
  );
}
