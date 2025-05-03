"use client"
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
    const pathname = usePathname();
    
    return (
        <div className='sticky top-0 left-0 h-screen w-fit pt-16 bg-white dark:bg-dark-1/90 max-sm:hidden  border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm transition-colors duration-300'>
            <div className='flex flex-col gap-3 px-4 py-4'>
                {sidebarLinks.map(({route, Icon, label}, index) => {
                    const isActive = pathname === route || pathname.startsWith(`${route}/`);
                    
                    return (
                        <Link 
                            href={route} 
                            key={index}
                            className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                                isActive 
                                    ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 shadow-blue-500/10' 
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${
                                isActive 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-blue-500/20'
                            } transition-colors duration-300`}>
                                <Icon className={`size-5 ${
                                    isActive ? 'text-white' : 'text-current'
                                }`} />
                            </div>
                            <p className='font-medium sm:hidden lg:block'>{label}</p>
                            {isActive && (
                                <div className='ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse sm:hidden lg:block' />
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar