'use client'
import Alert from '@/components/modals/alert';
import MeetingRoom from '@/components/page-components/meetingRoom';
import MeetingSetup from '@/components/page-components/meetingSetup';
import VideoCallLoader from '@/components/ui/loader';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const MeetingPage = () => {
  const {id}:{id:string} = useParams();

  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id);
  const {user,isLoaded} = useUser(); 

  if (!isLoaded || isCallLoading) return <VideoCallLoader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold">
      Call Not Found
    </p>
  );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;


  return (
    <main className='h-screen w-full '>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete?<MeetingSetup setIsSetupComplete={setIsSetupComplete} />:<MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage