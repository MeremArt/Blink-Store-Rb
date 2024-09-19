import Image from 'next/image'
import React from 'react'
import xcancel from '@/component/svgs/NewImages/xcancel.svg';
import EventMintLogo from '@/component/svgs/NewImages/EventMintLogo.svg';
import smallLogo from "@/assets/images/Logosmall.svg";
import Closed from '@/assets/svg-comps/closed';
import Link from 'next/link';
import { Typography } from '../typography';
type smallNavProps = {
    onClick : () => void;
}
export default function SmallNavBar({onClick}:smallNavProps) {
  return (
    <div className='fixed top-0 left-0 w-full bg-white bg-opacity-1 z-10 animate-slide-up-fade-in'>
        <div className="flex w-full p-[12px_16px] justify-between items-center">
            <Image  
            src={smallLogo}
              className="lg:hidden"
              alt="logo"
              width={136}
              height={35.2}/>
            <div onClick={onClick}>
            <Closed />
            </div>
        </div>
        <div className='flex w-full p-[24px_16px] flex-col items-start gap-[8px]'>
            <div className='text-black'>
            <Link href="/overview">
            <Typography className="cursor-pointer">Home</Typography>
          </Link>
            </div>
            <div className='text-black'>
            <Link href="/products/create-products">
            <Typography className="cursor-pointer">Products</Typography>
          </Link>
            </div>

        </div>
    </div>
  )
}
