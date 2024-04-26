import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import CoursesSidebarItem from "./course-sidebar-item";
import Logo from "@/app/(dashboard)/_components/logo";

interface CoursesSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CoursesSidebar = async ({ course, progressCount }: CoursesSidebarProps) => {
  const { userId } = auth();

  if(!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        courseId: course.id,
        userId: userId,
      },
    }
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="mt-5 w-full flex flex-row items-center justify-center">
        <div className="p-0 flex items-center justify-center w-[175px]">
          <Logo />
        </div>
      </div>

      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/***TODO:: CHECK PURCHASE AND ADD PROGRESS */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CoursesSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesSidebar;
