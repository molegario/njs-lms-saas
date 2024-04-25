"use client";

import ConfirmModal from "@/components/modals/confim-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseAction = ({
  disabled,
  courseId,
  isPublished
}:CourseActionProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try{
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully");
      router.push(`/teacher/courses`);
      router.refresh();
    } catch(e:any){
      toast.error(e.message ?? "Failed to delete course");
    }
    finally{
      setIsLoading(false);
    }
  }

  const onPublish = async () => {
    try{
      setIsLoading(true);

      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished successfully");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published successfully");
      }

      router.refresh();

    } catch(e:any){
      toast.error(e.message ?? "Failed to publish course");
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
 
export default CourseAction;