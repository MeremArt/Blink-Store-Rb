import Image from 'next/image';
import React from 'react';
import backgroundImage from '@/assets/images/ribhStoreContainer.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex  flex-row gap-[1rem] w-full">
      <div className="relative w-1/2 p-[1rem]">
        <Image 
          className="object-cover" 
          src={backgroundImage} 
          alt="backgroundImage" 
          priority
        />
      </div>
      <div className="px-[1.5rem] py-[1rem] w-1/2">
        {children}
      </div>
    </div>
  );
}

export default Layout;
