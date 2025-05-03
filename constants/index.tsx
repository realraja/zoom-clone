import { CalendarArrowDown, CalendarClock, Home, Plus, Video } from "lucide-react";

export const logoUrl = '/logo.png';
export const profileUrl = 'https://res.cloudinary.com/dwc3gwskl/image/upload/v1746071272/0/kivkifx1btjqflipepdq.jpg';

export const sidebarLinks = [
    {
      Icon: Home,
      route: '/',
      label: 'Home',
    },
  
    {
      Icon: CalendarClock,
      route: '/upcoming',
      label: 'Upcoming',
    },
    {
      Icon: Video,
      route: '/recordings',
      label: 'Recordings',
    },
    {
      Icon: CalendarArrowDown,
      route: '/previous',
      label: 'Previous',
    },
    {
      Icon: Plus,
      route: '/personal-room',
      label: 'Personal Room',
    },
  ];