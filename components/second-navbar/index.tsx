"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/Logo - Ribh Finance.png";
import { Button } from "../button";
import Plus from "@/assets/svg-comps/plus";
import { Typography } from "../typography";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import avatar from "@/assets/images/Avatar.svg";
import Logo from "@/assets/images/Logo.svg";
import { useRouter } from "next/navigation";
export default function SecondNavBar() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const toHome = () => {
    router.push("/verify-email/verify");
  };
  const shortenString = (str: string | undefined) => {
    if (str && str.length > 5) {
      return str.slice(0, 5) + "...";
    }
    return str; // Return the string as is if it's shorter than 5 characters
  };

  const { publicKey, signTransaction } = useWallet();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);
  return (
    <div className="flex h-[88px] px-[96px] mxs:p-[1rem] w-full py-4 justify-between items-center">
      <div onClick={toHome}>
        <Image src={logo} alt="logo" width={200} height={43.373} />
      </div>
      <div className="flex items-center gap-[32px]">
        <div className="flex items-center gap-[16px]">
          <Typography customClassName="mmd:hidden">
            {" "}
            {email.split("@")[0]}
          </Typography>
          <div className=" relative flex w-[48px] h-[48px] justify-center items-center">
            <Image src={Logo} alt="avatar" fill />
          </div>
        </div>
        <div className="mmd:hidden">
          <Button
            label="Create Product"
            leftIcon={<Plus />}
            customClassName="flex h-[56px] p-[16px_24px] justify-center items-center gap-[8px] bg-[#7839EE] rounded-[32px] text-white"
            onClick={() => router.push("/products/create-products")}
          />
        </div>
      </div>
    </div>
  );
}
