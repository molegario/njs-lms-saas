"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { db } from "@/lib/db";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

const CourseProgressButton = ({
  courseId,
  chapterId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const Icon = isCompleted ? XCircle : CheckCircle;
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted,
      });

      if(!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if(!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("User progress logged successfully.");
      router.refresh();

    } catch {

      toast.error("An error occurred. Failed to log user progress. Please try again later.");


    } finally {
      setIsLoading(false);
    }
  }


  return ( 
    <Button
      onClick={onClick}
      className="w-full md:w-auto"
      type="button"
      disabled={isLoading}
      variant={isCompleted ? "outline" : "success"}
    >
      {
        isCompleted ? "Not completed" : "Mark as Completed"
      }
      <Icon className="h-4 w-4 ml-2"/>
    </Button>
   );
}
 
export default CourseProgressButton;