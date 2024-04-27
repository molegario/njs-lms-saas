import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {
  const { userId } = auth();

  if(!userId) {
    return redirect("/sign-in");
  }

  const {
    completedCourses,
    coursesInProgress,
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={Clock}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList courses={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
