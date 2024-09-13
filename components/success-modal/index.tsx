import React from 'react'
import { Typography } from '../typography'
import CopyLink from '@/assets/svg-comps/link'
import { Button } from '../button'
import Twitter from '@/assets/svg-comps/twitter'
import SquareCopy from '@/assets/svg-comps/square-copy-link'
import Image from 'next/image'
import thumb from '@/assets/images/thumb-up-dynamic-color.svg';
export default function SuccessModal() {
  return (
        <div className='backdrop'>
             <div className='flex w-[616px] h-[400px] p-[40px_24px] flex-col items-center gap-[32px] flex-shrink-0 rounded-[8px] bg-white'>
        <div className='flex w-[282px] flex-col items-center gap-[16px]'>
            <div className='relative'>
                <Image className=''  src={thumb} alt='thumb-image' width={100} height={100}/>
            </div>
            <div>
                <Typography customClassName='text-black text-center font-inter text-[20px] font-medium leading-normal tracking-[-0.1px]'>Product successfully created!</Typography>
            </div>
        </div>
        <div className='flex p-[8px_12px] items-center gap-[8px] rounded-[24px] border border-[#BFBFBF] bg-[#FAFAFA]'>
            <CopyLink/>
            <Typography>
            https://ribhfinance.com/fake-nikes-product-page
            </Typography>
        </div>
        <div className='flex items-center gap-[16px] '>
            <Button label='Copy Link' leftIcon={<SquareCopy/>} customClassName='flex h-[56px] p-[16px_24px] justify-center items-center gap-[8px] bg-[#7839EE] rounded-[32px] text-white'/>
            <Button label='Share Product' leftIcon={<Twitter/>} customClassName='flex h-[56px] p-[16px_24px] justify-center items-center gap-[8px] bg-[#000] rounded-[32px] text-white'/>
        </div>
    </div>
        </div>
  )
}
