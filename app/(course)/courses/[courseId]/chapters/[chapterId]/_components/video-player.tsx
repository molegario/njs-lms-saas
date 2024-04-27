"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store"

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


  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if(completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if(!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("User progress logged successfully.");
        router.refresh();

        if(nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }

      }

    } catch {
      toast.error(
        "An error occurred. Failed to log user auto completion. Please try setting progress manually."
      );
    }
  };


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
            onEnded={onEnd}
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
