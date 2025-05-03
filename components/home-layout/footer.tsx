"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();
  const middleIndex = Math.floor(sidebarLinks.length / 2);

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg z-50 sm:hidden">
      {/* Floating center button effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-t from-transparent to-primary/10 rounded-t-full" />

      <div className="relative flex justify-between items-center px-2 h-16">
        {sidebarLinks.map((item, index) => {
          const isActive = pathname === item.route;
          const isMiddle = index === middleIndex;
          const Icon = item.Icon;

          if (isMiddle) {
            return (
              <div key={index} className="relative z-20 -mt-8 w-20 flex flex-col items-center">
                <Link href={item.route} className="group">
                  <div
                    className={cn(
                      "rounded-full w-14 h-14 border-2 flex items-center justify-center shadow-lg transition-all",
                      "group-hover:shadow-primary/20 group-hover:scale-105",
                      isActive
                        ? "bg-primary border-primary shadow-primary/30"
                        : "bg-card border-muted shadow-muted/20"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        isActive ? "text-primary-foreground" : "text-primary"
                      )}
                    />
                  </div>
                </Link>
                <p className={cn(
                  "text-xs mt-1 font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </p>
              </div>
            );
          }

          return (
            <Link 
              key={index} 
              href={item.route} 
              className="w-full flex flex-col items-center group"
            >
              <div className="relative p-2">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </div>
              <p className={cn(
                "text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;


// 'use client'
// import { CalendarArrowDown, CalendarClock, Home } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const Footer = () => {
//   const pathName = usePathname();
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-gray-700 sm:hidden max-sm:block">
//       <div className="flex justify-around py-2">
//         <Link href={"/"} className="text-center">
//           <div className={`${pathName === '/' && 'text-green-400'}`}>
//             <Home />
//             <p className="text-sm">Home</p>
//           </div>
//         </Link>
//         <Link href={"/upcoming"} className="text-center">
//           <div  className={`${pathName.split('/')[1] === 'upcoming' && 'text-green-400'}`}>
//             <CalendarClock />
//             <p className="text-sm">Upcoming</p>
//           </div>
//         </Link>
//         <Link href={"/profile"} className="text-center">
//           <div  className={`${pathName.split('/')[1] === 'profile' && 'text-green-400'}`}>
//             <CalendarArrowDown />
//             <p className="text-sm">Previous</p>
//           </div>
//         </Link>
//         <Link href={"/profile"} className="text-center">
//           <div  className={`${pathName.split('/')[1] === 'profile' && 'text-green-400'}`}>
//             <CalendarArrowDown />
//             <p className="text-sm">Previous</p>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Footer;
