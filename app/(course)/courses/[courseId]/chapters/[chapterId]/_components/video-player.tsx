"use client";

// import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store"

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}:VideoPlayerProps) => {
  const [ isReady, setIsReady ] = useState(false);
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="animate-spin text-secondary w-8 h-8" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="w-8 h-8" />
          <p className="text-small">This chapter is locked.</p>
        </div>
      )}
      {
        !isLocked && (
          <MuxPlayer 
            title={title}
            className={
              cn(
                !isReady && "hidden",
              )
            }
            onCanPlay={() => setIsReady(true)}
            onEnded={() => {}}
            // autoPlay
            playbackId={playbackId}
          />
        )
      }
    </div>
  );
}
 
export default VideoPlayer;

// OLEGARIO::TIMESTAMP:: 8:54:15 https://youtu.be/Big_aFLmekI?t=32055
