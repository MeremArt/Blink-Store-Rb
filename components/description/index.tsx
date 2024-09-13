import React,{ChangeEvent } from 'react'
import { Typography } from '../typography'

interface OnChangeProp {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    value:string
  }
  
export default function Description({onChange, value}:OnChangeProp) {
  return (
    <div className='flex flex-col items-start gap-3 self-stretch'>
        <div>
           <Typography customClassName='text-[#5B5B5B] text-base font-normal font-inter'>
           Description
           </Typography>
        </div>
        <div className='flex h-[104px] px-6 py-4 items-start gap-1 self-stretch rounded-sm border border-[#BFBFBF] bg-[#FAFAFA]'>
            <textarea id='description' value={value} className='w-full h-full border-none outline-none bg-transparent resize-none' onChange={onChange}/>
        </div>
    </div>
  )
}
