import React from 'react'
import { Typography } from '../typography'
import DollarIcon from '@/assets/svg-comps/usdc'
type TableCompProps={
    text1 : string;
    text2: string;
    text3:string;
    text4: string;
    text5:string;
}
export default function TableComp(prop:TableCompProps) {

    const{
        text1,text2,text4, text3,text5
    }=prop
  return (
    <div className='flex p-4 gap-[16px] w-full items-start justify-between self-stretch border-b border-[#DFDFDF]'>
            <div>
            <Typography customClassName='text-gray-600 font-inter text-lg font-normal leading-normal'>{shortenString(text1)}</Typography>
            </div>
            <div>
            <Typography customClassName='text-black font-inter text-lg font-normal leading-normal'>Payment Received</Typography>
            </div>
            <div className='flex  flex-col items-start gap-2'>
                 <Typography customClassName='text-black font-inter text-xl font-medium leading-normal'>{text3}</Typography>
                 <Typography customClassName='text-[#5B5B5B] font-inter text-[16px] font-normal leading-normal'>{text4}</Typography>
            </div>
            <div className='flex items-center gap-2'>
                <div className='flex flex-col items-end gap-2'>
                    <Typography customClassName='text-[#2775CA] font-inter text-[18px] font-medium leading-normal'>{text5}</Typography>
                    <Typography customClassName='text-[#5B5B5B] font-inter text-[16px] font-normal leading-normal'>30000</Typography>
                </div>
                <div>
                    <DollarIcon/>
                </div>
            </div>
        </div>
  )
}

function shortenString(str: string) {
    if (str.length > 5) {
      return str.slice(0, 5) + '...';
    }
    return str; // Return the string as is if it's shorter than 5 characters
  }