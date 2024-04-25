import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (
      ownCourse?.chapters.some(
        (xx) => !!xx.muxData && !!xx.title && xx.description
      ) && !!ownCourse.title && !!ownCourse.description && !!ownCourse.imageUrl 
        && !!ownCourse.price && !!ownCourse.categoryId
    ) {
      const coursepatch = await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: true,
        },
      });

      return NextResponse.json(coursepatch);
    }

  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/PUBLISH",
      e.message || "COURSES/[COURSEID]/PUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
