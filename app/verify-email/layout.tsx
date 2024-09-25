import Image from 'next/image';
import React from 'react';
import backgroundImage from '@/assets/images/ribhStoreContainer.svg';
import phonesize from '@/assets/images/phonesize.svg'
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" relative flex  flex-row gap-[1rem] w-full mmd:items-center mmd:justify-center  ">
      <Image className=' object-cover lg:hidden mmd:w-full' src={phonesize} alt='phone size' fill/>
      <div className="relative w-1/2  p-[1rem]  mmd:hidden ">
        <Image 
          className="object-cover" 
          src={backgroundImage} 
          alt="backgroundImage" 
          priority
        />
      </div>
      <div className="relative px-[1.5rem] py-[1rem] w-1/2  mmd:w-full mmd:flex mmd:items-center mmd:justify-center">
        {children}
      </div>
    </div>
  );
}

export default Layout;
