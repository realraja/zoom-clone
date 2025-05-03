'use client';

import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { Button } from '../ui/button';
import Alert from '../modals/alert';
import { Loader2 } from 'lucide-react';
// import { useTheme } from 'next-themes';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // const { theme } = useTheme();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Derived state
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call]);

  if (!mounted) return null;

  if (!call) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (callTimeNotArrived) {
    return (
      <Alert 
  title="Meeting Not Started"
  description={`Meeting Scheduled for ${callStartsAt?.toLocaleString()}`}
  icon="time"
/>
    );
  }

  if (callHasEnded) {
    return (
      <Alert 
  title="Meeting Not Found"
  description="The meeting you're looking for doesn't exist or has expired"
  icon="error"
/>
    );
  }

  const handleJoinMeeting = async () => {
    setIsJoining(true);
    try {
      await call.join();
      setIsSetupComplete(true);
    } catch (error) {
      console.error('Failed to join meeting', error);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-4xl space-y-8 flex items-center justify-center flex-col">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Setup Your Meeting</h1>
          <p className="mt-2 text-muted-foreground">
            Configure your audio and video before joining
          </p>
        </div>

          <VideoPreview />
        {/* <div className="w-96  rounded-lg dark:bg-gray-400 border-4 border-blue-600 dark:border-indigo-700 shadow-sm">
        </div> */}

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={isMicCamToggled}
                onChange={(e) => setIsMicCamToggled(e.target.checked)}
                className="h-4 w-4 rounded border-muted-foreground/30 text-primary focus:ring-primary"
              />
              Join with mic and camera off
            </label>
            <DeviceSettings />
          </div>

          <Button
            onClick={handleJoinMeeting}
            disabled={isJoining}
            className="w-full max-w-xs mx-auto bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isJoining ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Joining...
              </div>
            ) : (
              'Join Meeting'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;