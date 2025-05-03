import CallList from '@/components/page-components/callList';
import MeetingTypeList from '@/components/page-components/meetingTypeList';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Image */}
        <div className="relative mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-8 text-white h-48">
          {/* Time and Upcoming Meeting - Positioned at top right */}

          <Image
            src={'https://res.cloudinary.com/dwc3gwskl/image/upload/v1746114134/0/kjnrarhnvfnmxz2lge2j.png'}
            alt="Team meeting illustration"
            className="absolute right-0 top-0 h-full w-auto max-sm:hidden sm:hidden lg:block object-contain"
            width={400}
            height={300}
            priority
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-600/20 dark:from-blue-800/90 dark:to-blue-800/20"></div> */}

          {/* Hero content */}
          <div className="relative z-10 h-full flex flex-col justify-between max-w-md">
            <h1 className="text-xl font-bold mb-2">Upcoming Meeting at: 12:30 PM</h1>
          <div>
            {/* <p className="text-xs text-white/80">Current time</p> */}
            <p className="font-medium text-5xl text-white">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-md text-white/90">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          </div>



        </div>

         {/* Quick Actions */}
       <MeetingTypeList />

        {/* Upcoming Meetings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Meetings</h2>
              <Link href={'/upcoming'}>
              <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                See all
              </Button></Link>
            </div>
          </div>

          {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <MeetingCard
              title="Team Sync: Sprint Planning & Updates"
              date="March 15, 2024 - 10:00 AM"
              attendees={9}
              buttons={[
                { label: "Start", variant: "default" },
                { label: "Copy Invitation", variant: "outline" }
              ]}
            />
            <MeetingCard
              title="Project Pulse Check: Weekly Standup"
              date="March 15, 2024 - 10:00 AM"
              attendees={5}
              buttons={[
                { label: "Start", variant: "default" },
                { label: "Copy Invitation", variant: "outline" }
              ]}
            />
          </div> */}
          <div className='max-h-screen'>

          <CallList type='upcoming' />
          </div>
        </div>
      </div>
    </div>
  );
}
 


// function MeetingCard({ title, date, attendees, buttons }: {
//   title: string,
//   date: string,
//   attendees: number,
//   buttons: { label: string, variant: "default" | "outline" }[]
// }) {
//   return (
//     <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{date}</p>
//           <div className="flex items-center mt-2">
//             <div className="flex -space-x-2">
//               {[...Array(Math.min(attendees, 5))].map((_, i) => (
//                 <div key={i} className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
//               ))}
//             </div>
//             {attendees > 5 && (
//               <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">+{attendees - 5}</span>
//             )}
//           </div>
//         </div>
//         <div className="flex gap-2">
//           {buttons.map((button, index) => (
//             <Button key={index} variant={button.variant} size="sm">
//               {button.label}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }