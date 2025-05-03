import { VideoIcon } from "lucide-react";

export default function VideoCallLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-b-transparent animate-spin" />
          <VideoIcon className="w-10 h-10 text-purple-500 absolute inset-0 m-auto z-10" />
        </div>
        <h2 className="text-xl text-white font-semibold tracking-wide">Connecting to your video call...</h2>
      </div>
    </div>
  );
}
