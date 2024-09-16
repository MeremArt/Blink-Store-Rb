import SecondNavBar from '@/components/second-navbar';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) =>{
  return (
    <div className='mx-auto flex max-w-[1440px] flex-col justify-center items-start'>
        <div className='w-full'>
            <SecondNavBar/>
        </div>
        <div className=' md:mx-auto flex mxs:w-full h-full py-6 md:justify-center md:items-start gap-4 mxs:p-[1rem] mmd:flex-col'>
            {children}
        </div>
    </div>
  )
}

export default Layout