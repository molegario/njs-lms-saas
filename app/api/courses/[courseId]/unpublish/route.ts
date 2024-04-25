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
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const coursepatch = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(coursepatch);

  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/UNPUBLISH",
      e.message || "COURSES/[COURSEID]/UNPUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
