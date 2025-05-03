import { logoUrl, profileUrl } from '@/constants'
import Image from 'next/image'
import React from 'react'
import ThemeToggle from '../ui/darkModeToggleBtn'
import Link from 'next/link'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-6 fixed w-full backdrop-blur-sm bg-white/80 dark:bg-dark-1/80 top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-all duration-300'>
      <Link 
        href="/" 
        className="flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300 group"
      >
        <div className='relative group-hover:rotate-12 transition-transform duration-300'>
          <Image
            src={logoUrl}
            width={46}
            height={46}
            alt="yoom logo"
            className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
          />
          {/* <span className="absolute inset-0 border-2 border-sky-400 dark:border-sky-600 rounded-full opacity-0 group-hover:opacity-100 animate-ping-slow transition-opacity duration-300"></span> */}
        </div>
        <p className="text-[26px] bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-600 dark:to-blue-600 bg-clip-text text-transparent font-extrabold tracking-tight">
          VOOC
        </p>
      </Link>

      <div className='flex justify-center items-center gap-5'>
        <ThemeToggle />
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-600 dark:to-blue-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300'></div>
          {/* <Image
            src={profileUrl}
            width={40}
            height={40}
            alt="profile logo"
            className="relative size-10 object-cover rounded-full border-2 border-white dark:border-gray-800 group-hover:scale-110 transition-transform duration-300 shadow-lg"
          /> */}
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


 export const myNav = () => {
    return (
      <div className='flex justify-between px-6 sticky  bg-white dark:bg-dark-1 top-0'>
          <Link href="/" className="flex items-center justify-center gap-1">
          <Image
            src={logoUrl}
            width={46}
            height={46}
            alt="yoom logo"
            className="max-sm:size-16"
          />
          <p className="text-[26px] text-sky-400 dark:text-sky-600 font-extrabold max-sm:hidden">
            VOOC
          </p>
        </Link>
  
          <div className='flex justify-center items-center gap-4'>
              <ThemeToggle />
              <Image
            src={profileUrl}
            width={32}
            height={32}
            alt="profile logo"
            className="max-sm:size-16 size-10 object-cover rounded-full"
          />
          </div>
      </div>
    )
  }