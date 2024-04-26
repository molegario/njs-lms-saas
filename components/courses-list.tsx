import { Category, Course } from "@prisma/client";
import { Cat } from "lucide-react";
import CourseCard from "./course-card";

export type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: {  id: string; }[];
  progress: number | null;
}

interface CoursesListProps {
  courses: CoursesWithProgressWithCategory[];
}

const CoursesList = ({
  courses,
}:CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!} // publish safeguards this
            chaptersLength={course.chapters.length}
            price={course.price!} // publish safeguards this
            progress={course.progress}
            category={course.category?.name!} // publish safeguards this
          />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center test-sm text-muted-foreground mt-10">
          No courses found.
        </div>
      )}
    </div>
  );
}
 
export default CoursesList;