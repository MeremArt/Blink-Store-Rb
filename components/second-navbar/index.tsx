import React from 'react'
import Image from 'next/image'
import logo from '@/assets/images/Logo - Ribh Finance.png';
import { Button } from '../button';
import Plus from '@/assets/svg-comps/plus';
import { Typography } from '../typography';
import avatar from '@/assets/images/Avatar.svg'
export default function SecondNavBar() {
  return (
    <div className='flex h-[88px] px-[96px] w-full border py-4 justify-between items-center'>
        <div>
                <Image src={logo} alt='logo' width={200} height={43.373}/>
            </div>
        <div className='flex items-center gap-[32px]'>
            <div className='flex items-center gap-[16px]'>
                <Typography>James Dancer</Typography>
                <div className=' relative flex w-[48px] h-[48px] justify-center items-center'>
                    <Image src={avatar} alt='avatar' fill/>
                </div>
            </div>
            <div>
                <Button label='Create Product' leftIcon={<Plus/>} customClassName='flex h-[56px] p-[16px_24px] justify-center items-center gap-[8px] bg-[#7839EE] rounded-[32px] text-white'/>
            </div>
        </div>
    </div>
  )
}
