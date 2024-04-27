"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number
}

const CourseEnrollButton = ({
  courseId,
  price
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);


  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch {
      toast.error("Failed to enroll in course");
    } finally {
      setIsLoading(false);
    }
  };


  return ( 
    <Button
      onClick={onClick}
      className="w-full md:w-auto"
      size="sm"
      disabled={isLoading}
    >
      Enroll now for {formatPrice(price)}
    </Button>
   );
}
 
export default CourseEnrollButton;