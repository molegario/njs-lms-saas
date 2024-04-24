import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const {isPublished, ...values} = await req.json();

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values
      },
    });

    // TODO: handle video upload

    return NextResponse.json(chapter);

  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID]",
      e.message || "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID] API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
