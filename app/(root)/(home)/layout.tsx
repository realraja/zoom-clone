import Footer from '@/components/home-layout/footer'
import Navbar from '@/components/home-layout/navbar'
import Sidebar from '@/components/home-layout/sidebar'
import React, { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-28 max-sm:pb-32 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout