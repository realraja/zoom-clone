'use client';
import { Calendar, CalendarPlus, CheckCircle2, Clock, Copy, NotebookPen, PlayCircle, PlusCircle, Video } from 'lucide-react';
import React, { useState } from 'react'
import MeetingModal from '../modals/meetingModal';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import DatePicker from 'react-datepicker';
import { Input } from '../ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isIstantMeeting' | undefined>();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const router = useRouter();


  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) return toast("please select a date and time!");

      const id = crypto.randomUUID();
      const call = client.call('default', id)

      if (!call) throw new Error('failed to create call meeting!');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';


      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast('Meeting Created');


    } catch (error) {
      console.error(error);
      toast('Failed to create Meeting');
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;



  return (
    <div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <ActionCard
          icon={<PlusCircle className="h-6 w-6" />}
          title="New Meeting"
          description="Setup a new recording"
          color="from-blue-500 to-blue-600"
          handleClick={() => setMeetingState('isIstantMeeting')}
        />
        <ActionCard
          icon={<PlayCircle className="h-6 w-6" />}
          title="Join Meeting"
          description="Via invitation link"
          color="from-green-500 to-green-600"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <ActionCard
          icon={<Calendar className="h-6 w-6" />}
          title="Schedule Meeting"
          description="Plan your meeting"
          color="from-purple-500 to-purple-600"
          handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <ActionCard
          icon={<Video className="h-6 w-6" />}
          title="View Recordings"
          description="Meeting recordings"
          color="from-amber-500 to-amber-600"
          handleClick={() => router.push('/recordings')}
        />
      </div>

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonTxt="Schedule Meeting"
          buttonIcon={<CalendarPlus className="mr-2 h-4 w-4" />}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium text-foreground">
                  Meeting Description
                </label>
              </div>
              <Textarea
                placeholder="Enter meeting purpose..."
                className="min-h-[100px] border-muted focus-visible:ring-1 focus-visible:ring-primary"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium text-foreground">
                  Select Date & Time
                </label>
              </div>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select meeting time"
                className="w-full rounded-md border border-muted p-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                wrapperClassName="w-full"
                calendarClassName="border-muted rounded-md shadow-lg"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Scheduled Successfully"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Meeting link copied to clipboard!');
          }}
          buttonIcon={<Copy className="mr-2 h-4 w-4" />}
          buttonTxt="Copy Meeting Link"
          className="text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" strokeWidth={1.5} />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-foreground">
                Your meeting is scheduled!
              </h3>
              <p className="text-sm text-muted-foreground">
                Share the link with your participants
              </p>
            </div>
            <div className="mt-2 w-full rounded-md bg-muted/50 p-3">
              <p className="font-mono text-sm text-foreground">{meetingLink}</p>
            </div>
          </div>
        </MeetingModal>
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonTxt="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
      <MeetingModal isOpen={meetingState === 'isIstantMeeting'} onClose={() => setMeetingState(undefined)} title={'Start a Instant Meeting'} className={'text-center'} buttonTxt={'Start Meeting'} handleClick={createMeeting} />

    </div>
  )
}

export default MeetingTypeList

function ActionCard({ icon, title, description, color, handleClick }: { icon: React.ReactNode, title: string, description: string, color: string, handleClick: () => void }) {
  return (
    <div onClick={handleClick} className={`bg-gradient-to-br ${color} p-5 rounded-xl text-white flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}>
      <div className="p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}