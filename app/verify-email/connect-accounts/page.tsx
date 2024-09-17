"use client";

import Image from "next/image";
import React from "react";
import { useEffect } from "react";

import logo from "@/assets/images/Logo.svg";
import { Typography } from "@/components/typography";
import { Input } from "@/components/inputs";
import { Button } from "@/components/button";
import ArrowLeft from "@/assets/svg-comps/arrow-left";
import Wallet from "@/assets/svg-comps/wallet";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Twitter from "@/assets/svg-comps/twitter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Suspense } from "react";
function Page() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    const checkIfUserExists = async () => {
      try {
        if (connected && publicKey) {
          toast.success("Welcome back!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem("publicKey", publicKey.toString());

          setTimeout(() => {
            router.push(`/products/create-products`);
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    checkIfUserExists();
  }, [connected, publicKey, router]);
  return (
    <div className="flex flex-col items-center gap-12 flex-[1_0_0] self-stretch max-w-[42rem] h-full">
      <div className="flex flex-col items-end gap-1 self-stretch ">
        <Button
          label="Back to Home"
          leftIcon={<ArrowLeft />}
          fit
          size="small"
          customClassName=" text-[#7839EE] mmd:text-white mxs:text-white mxs:bg-[#7839EE] mmd:bg-[#7839EE] font-Inter text-base mxs:text-[0.875rem] font-semibold leading-normal rounded-[2rem] border border-[#7839EE] "
        />
      </div>

      <div className="flex flex-col items-start gap-14 p-[72px_54px_104px_54px] mxs:p-[32px_24px_12px_24px] self-stretch rounded-lg bg-white shadow-[0px_0px_32px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-start gap-10 mxs:gap-4 self-stretch">
          <div className="flex flex-col items-center gap-10 mxs:gap-4 self-stretch">
            <div>
              <Image src={logo} alt="logo" width={86.733} height={86.733} />
            </div>
            <div className="flex flex-col gap-8 self-stretch text-center">
              <Typography customClassName=" text-[#48258B] text-center font-Inter text-2xl mxs:text-[18px] font-semibold leading-normal">
                One last thing...
              </Typography>
              <Typography customClassName="text-[#5B5B5B] text-center font-Inter text-base mxs:font-semi-bold font-medium leading-normal">
                Connect your Twitter/X account and Wallet to proceed
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch">
            <div className="flex flex-col justify-center items-center gap-1 py-4 self-stretch border-b">
              <Button
                label="Connect Account"
                leftIcon={<Twitter />}
                fit
                customClassName="flex w-[256px] h-[56px] px-8 py-4 justify-center  mxs:text-[0.875rem] items-center gap-4 bg-[#000] rounded-[32px] text-white"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-1 py-4 self-stretch">
              {/* <WalletMultiButton /> */}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Button
            label="proceed"
            customClassName="flex h-[56px] px-6 py-4 justify-center items-center mxs:text-[0.875rem] gap-1 self-stretch rounded-[32px] bg-[#BFBFBF] text-white"
          />
        </div>
      </div>

      <div className="flex items-end gap-4 flex-[1_0_0] self-stretch">
        <div className="rounded-[100px] bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] h-[12px] flex-[1_0_0]"></div>
        <div className="rounded-[100px] bg-[linear-gradient(90deg,#7839EE_0%,#A27DFF_50.8%,#4E55FF_100%)] h-[12px] flex-[1_0_0]"></div>
      </div>
    </div>
  );
}

export default Page;
