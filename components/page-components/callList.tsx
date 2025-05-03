'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, CheckCircle2, Clock, Copy, PlayCircle, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'ended':
        return <CheckCircle2 className="h-6 w-6 text-muted-foreground" />;
      case 'upcoming':
        return <Clock className="h-6 w-6 text-muted-foreground" />;
      case 'recordings':
        return <Video className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Calendar className="h-6 w-6 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch recordings');
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="space-y-6">
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {calls.map((meeting: Call | CallRecording) => {
  const key =
    'id' in meeting && meeting.id
      ? meeting.id
      : (meeting as CallRecording).url || (meeting as CallRecording).start_time;

  return (
    <MeetingCard
      key={key}
      type={type === 'recordings' ? 'recording' : type}
      title={
        (meeting as Call).state?.custom?.description ||
        (meeting as CallRecording).filename?.substring(0, 20) ||
        'Personal Meeting'
      }
      date={
        (meeting as Call).state?.startsAt?.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) ||
        new Date((meeting as CallRecording).start_time).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }
      link={
        type === 'recordings'
          ? (meeting as CallRecording).url
          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
      }
      buttonText={type === 'recordings' ? 'Watch' : type === 'upcoming' ? 'Join' : 'View'}
      handleClick={
        type === 'recordings'
          ? () => window.open((meeting as CallRecording).url, '_blank')
          : () => router.push(`/meeting/${(meeting as Call).id}`)
      }
    />
  );
})}

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center">
          <div className="rounded-full bg-muted p-4">
            {getIcon()}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{noCallsMessage}</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {type === 'upcoming'
              ? 'Schedule a new meeting to see it here'
              : type === 'recordings'
              ? 'Recordings will appear here after your meetings end'
              : 'Your completed meetings will appear here'}
          </p>
          {type === 'upcoming' && (
            <Button onClick={() => router.push('/schedule')}>
              Schedule Meeting
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const MeetingCard = ({
  type,
  title,
  date,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const iconMap = {
    upcoming: <Clock className="h-5 w-5 text-blue-500" />,
    ended: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    recording: <PlayCircle className="h-5 w-5 text-purple-500" />,
  };

  const statusMap = {
    upcoming: {
      label: "Upcoming",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
    ended: {
      label: "Completed",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    },
    recording: {
      label: "Recording",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    },
  };

  return (
    <div className={cn(
      "flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md",
      "bg-card text-card-foreground border-border",
      "dark:border-gray-800 dark:bg-gray-900/50"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "bg-primary/10"
          )}>
            {iconMap[type]}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        <span className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          statusMap[type].color
        )}>
          {statusMap[type].label}
        </span>
      </div>

      <div className="flex gap-2">
        {type !== "ended" && (
          <Button
            onClick={handleClick}
            size="sm"
            className="flex-1 gap-2"
            variant={type === "recording" ? "secondary" : "default"}
          >
            {type === "recording" ? (
              <PlayCircle className="h-4 w-4" />
            ) : (
              <Video className="h-4 w-4" />
            )}
            {buttonText}
          </Button>
        )}
        
        <Button
          onClick={() => {
            navigator.clipboard.writeText(link);
            toast.success("Meeting link copied to clipboard!");
          }}
          size="sm"
          variant="outline"
          className={`gap-2 ${type === 'ended' && 'hidden'}`}
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  );
};

interface MeetingCardProps {
  type: 'upcoming' | 'ended' | 'recording';
  title: string;
  date: string;
  handleClick?: () => void;
  link: string;
  buttonText?: string;
}

export default CallList;