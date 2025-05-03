"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Copy, Video, User } from "lucide-react";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { cn } from "@/lib/utils";

const InfoRow = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-1 font-medium text-foreground break-all">
          {description}
        </p>
      </div>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;

    try {
      const newCall = client.call("default", meetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
            custom: {
              description: `${user.username}'s Personal Room`,
            },
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.log(error)
      toast.error("Failed to start meeting");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast.success("Meeting link copied to clipboard!");
  };

  return (
    <div className="container mx-auto">
      <div >
        <div className="pb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Personal Meeting Room
          </h1>
          <p className="text-muted-foreground">
            Your always-available meeting space
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <InfoRow
              title="Meeting Host"
              description={user?.username || "You"}
              icon={<User className="h-4 w-4" />}
            />
            <InfoRow
              title="Meeting ID"
              description={meetingId!}
              icon={<Video className="h-4 w-4" />}
            />
            <InfoRow
              title="Invitation Link"
              description={meetingLink}
              icon={<Copy className="h-4 w-4" />}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={startRoom}
              size="lg"
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            >
              <Video className="h-5 w-5" />
              Start Meeting
            </Button>
            <Button
              onClick={copyToClipboard}
              size="lg"
              variant="secondary"
              className="flex-1 gap-2"
            >
              <Copy className="h-5 w-5" />
              Copy Invite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRoom;