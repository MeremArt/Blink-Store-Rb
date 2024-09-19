'use client'
import { Button } from '@/components/button'
import Description from '@/components/description'
import { Input } from '@/components/inputs'
import ProductImage from '@/components/product-image'
import { Typography } from '@/components/typography'
import Image from 'next/image'

import React, { useState, ChangeEvent } from "react";
import progress1 from '@/assets/images/Progress1.svg'
import NairaLogo from '@/assets/svg-comps/naira-logo'
import { updateName,updateDescription,updateAmount,updateImage } from '@/store/redux-slices/product-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import DollarIcon from '@/assets/svg-comps/usdc'
import { formatAmount } from '@/app/overview/dummydata'

function Page() {
const[isLoading , setIsLoading]= useState<boolean>(false);

const selector = useSelector((state :any)=> state.product);
const {name, image,imageName,amount,description} = selector
const dispatch =useDispatch();
const router =useRouter();
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;
  

  if (id === "Amount") {
    const formattedValue = formatAmount(value);
    dispatch(updateAmount(formattedValue));
  } else {
    switch (id) {
      case "ProductName":
        dispatch(updateName(value));
        break;
      default:
        break;
    }
  }
};
      const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        switch (id) {
          case "description":
            dispatch(updateDescription(value));
            break;
          default:
            break;
        }
      };
      
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const files = e.target.files;
    
        if (files && files[0]) {
          const file = files[0];
          const { name } = file;
    
          reader.onload = (event) => {
            const dataURL = event?.target?.result as string;
            dispatch(updateImage({ image: dataURL, imageName: name }));
          };
    
          reader.readAsDataURL(file);
        } else {
          dispatch(updateImage({ image: "", imageName: "" }));
        }
      };

      const handleFormSubmit = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        router.push("/products/preview-products");
        setIsLoading(false);
      };
      
  return (
        <>
       <div className='mx-auto lg:w-[826px] lg:h-[48px] mmd:w-[758px] mxs:w-[358px]  mmd:h-[25px] mxs:h-[25px]  mxxxs:w-[320px] relative'>
           <Image className='absolute' src={progress1} alt={progress1} fill/>
        </div>
         <div className=' mx-auto flex flex-col items-start lg:max-w-[826px] w-full mmd:px-[24px]  px-[136px] py-8 gap-8 bg-[#FFF] shadow-[0_0_32px_0_rgba(0,_0,_0,_0.08)]'>
        <div className='w-full'>
            <Typography customClassName='text-black text-center text-[28px] mmd:text-[1.25rem] font-semi-bold font-inter tracking[-0.014em]'>
            Create Product
            </Typography>
        </div>
            <form className='flex flex-col items-start gap-10 self-stretch' onSubmit={handleFormSubmit}>
                <div className='flex flex-col items-start gap-6 self-stretch'>
                <div className='w-full'>
                <Input id='ProductName' value={name} name="ProductName" label='Product Name' placeholder="Product Name" passwordWay={false} onChange={handleInputChange}/>
                </div>
                <div className='w-full'>
                <Input id='Amount' value={amount} name="Amount" label='Amount' placeholder="Amount" passwordWay={false} icon2={<DollarIcon/>} onChange={handleInputChange}/>
                </div>
                <div className='w-full'>
                    <ProductImage id='image' image={image} onChange={handleImageChange}/>
                </div>
                <div className='w-full'>
                    <Description onChange={handleChange} value={description} />
                </div>
                 </div>
                <div className='w-full'>
                    <Button  type='submit' label='Continue' customClassName='flex h-[56px] px-6 py-4 justify-center items-center gap-1 self-stretch bg-[#7839EE] rounded-[32px] text-white'/>
                </div>
            </form>
    </div>
        </>
  )
}

export default Page