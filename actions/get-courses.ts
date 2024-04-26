import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & { 
  category: Category | null;
  chapters: { id:string }[];
  progress: number | null;
};

 type GetCourses = {
  userId: string;
  categoryId?: string;
  title?: string;
}

export const getCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try{
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
          // mode: "insensitive",
        },
        categoryId: categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        purchases: {
          where: {
            userId,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    const coursesWithProgress:CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {

        if(course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        } 

        const progressPercentage = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      }),
    );

    return coursesWithProgress;

  } catch(e:any) {
    console.log("[GET_PROGRESS]", e.message ?? "courses not available.");
    return [];
  }
};
