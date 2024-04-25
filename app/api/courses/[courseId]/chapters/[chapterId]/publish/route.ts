import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

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

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: chapterId,
      },
    });

    if ( !chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl ) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    const chapterpatch = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(chapterpatch);

  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID]/PUBLISH",
      e.message || "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID]/PUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
