"use client";
import React from "react";
import { Typography } from "../typography";
import CopyLink from "@/assets/svg-comps/link";
import { Button } from "../button";
import Twitter from "@/assets/svg-comps/twitter";
import SquareCopy from "@/assets/svg-comps/square-copy-link";
import Image from "next/image";
import thumb from "@/assets/images/thumb-up-dynamic-color.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useRouter } from "next/navigation";
import Closed from "@/assets/svg-comps/closed";
type successProps={
    onClick : ()=> void;
    value : boolean;
}
export default function SuccessModal({onClick, value}:successProps) {
  const event = useSelector((state: any) => state.event.events);
const router = useRouter();
  const details = event && event.length > 0 ? event[0] : null;
  const blink = details?.blink || ""; 
  
  const handleCopyLink = () => {
    if (blink) {
      navigator.clipboard.writeText(blink)
        .then(() => {
          toast.success("Copied to clipboard!"); 
        })
        .catch((err) => {
          toast.error("Failed to copy!"); 
          console.error("Error copying to clipboard: ", err);
        });
    } else {
      toast.error("No link to copy!"); 
    }
  };

  const shareToTwitter =() => {
    const url = `https://twitter.com/intent/tweet?url=${blink}`;
    window.open(url, "_blank");
   
  }

  return (
    <div className="backdrop">
      <div className="relative flex w-[616px] mxs:w-[358px] mxxxs:w-[300px] h-[400px] mxxxs:h-[420px] p-[40px_24px] flex-col items-center gap-[32px] flex-shrink-0 rounded-[8px] bg-white">
         <div className="absolute cursor-pointer top-0 right-0" onClick={onClick}>
          <Closed/>
         </div>
        <div className="flex w-[282px]  flex-col items-center gap-[16px]">
          <div className="relative">
            <Image
              className=""
              src={thumb}
              alt="thumb-image"
              width={100}
              height={100}
            />
          </div>
          <div>
            <Typography customClassName="text-black text-center font-inter text-[20px]  mxs:text-[1rem] font-medium mxs:font-semi-bold  leading-normal tracking-[-0.1px]">
              Product successfully created!
            </Typography>
          </div>
        </div>
        <div className="flex p-[8px_12px] items-center gap-[8px] rounded-[24px] border border-[#BFBFBF] bg-[#FAFAFA]">
          <CopyLink />
          <Typography>{blink}</Typography>
        </div>
        <div className="flex items-center gap-[16px] mxxxs:flex-col ">
          <Button
            label="Copy Link"
            leftIcon={<SquareCopy />}
            customClassName="flex h-[56px] p-[16px_24px] mxs:p-[1rem] justify-center items-center mxs:text-[0.875rem] gap-[8px] bg-[#7839EE] rounded-[32px] text-white"
            onClick={handleCopyLink} 
          />
          <Button
            label="Share Product"
            leftIcon={<Twitter />}
            customClassName="flex h-[56px] p-[16px_24px] mxs:p-[1rem] justify-center items-center mxs:text-[0.875rem] gap-[8px] bg-[#000] rounded-[32px] text-white"
            onClick={shareToTwitter}
          />
        </div>
      </div>
    </div>
  );
}
