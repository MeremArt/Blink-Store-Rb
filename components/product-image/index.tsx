import React,{ChangeEvent} from 'react'
import { Typography } from '../typography'
import { Button } from '../button'
import PictureIcon from '../picture'
import Image from 'next/image'
import Wallet from '@/assets/svg-comps/wallet'
type ImageProps={
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    image:string;
    id:string
}
export default function ProductImage({image,onChange,id}:ImageProps) {
  return (
    <div className='flex flex-col items-start gap-3 self-stretch'>
        <div>
            <Typography customClassName='text-[#5B5B5B] text-base mmd:text-[0.75rem] font-normal'>Product Image</Typography>
        </div>
        <div className='flex flex-col items-start gap-2 self-stretch'>
        <div className='flex flex-col p-6 items-center gap-1 self-stretch rounded-2xl border border-dashed border-[#BFBFBF] bg-[#FAFAFA]'   onClick={() => {
                        const inputElement = document.getElementById(id) as HTMLInputElement;
                        if (inputElement && !image) {
                            inputElement.click();
                        }
                    }}>
        <input
                        type="file"
                        id={id}
                        className="input-field"
                        accept="image/*"
                        hidden
                        onChange={onChange}
                    />
                    {image ? (
                        <div className="relative w-full h-full">
                            <Image  src={image} alt="Uploaded" className="w-full h-full object-cover rounded-[10.23px] " width={400}height={400}/>
                            <div className="absolute  inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-black hover:bg-opacity-20">
                                <div
                                    className="cursor-pointer rounded-full p-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange({ target: { files: null } } as any);
                                    }}
                                >
                                    <Wallet/>
                                </div>
                            </div>
                        </div>
                    ) :(
                <>
                <div>
                <PictureIcon/>
            </div>
            <div className='flex flex-col text-center items-center '>
                <Typography customClassName='text-[#A6A6A6] text-base mmd:text-[0.875rem] font-medium font-inter'>Select an image file to upload</Typography>
                <Typography customClassName='text-[#A6A6A6] text-base mmd:text-[0.75rem] font-medium font-inter'>or drag and drop it here</Typography>
            </div>
                </>
            )}
        </div>
        <div className='flex flex-col items-start gap-3 self-stretch'>
            <div>
                <Typography customClassName='text-[#5B5B5B] text-sm mmd:text-[0.75rem] font-normal font-inter'>Or upload image from URL</Typography>
            </div>
            <div className='flex h-[56px] px-2.5 py-2 justify-between items-center self-stretch rounded-2xl mmd:rounded-[24px] border border-[#BFBFBF] bg-[#FAFAFA]'>
                <input className='w-full h-full outline-none placeholder:text-[#A6A6A6] placeholder:text-sm mmd:placeholder:text-[0.75rem] placeholder:font-medium font-inter' placeholder='Paste image URL here'/>
                <Button label='update' fit customClassName='flex h-[40px] px-6 py-4 justify-center items-center gap-1 rounded-[24px] bg-[#7839EE] text-white'/>
            </div>
        </div>
        </div>
    </div>
  )
}
