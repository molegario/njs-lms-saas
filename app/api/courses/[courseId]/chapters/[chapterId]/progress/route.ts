import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { chapterId } = params;
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: chapterId,
        },
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      }
    })

    return NextResponse.json(userProgress);
  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID]/PROGRESS",
      e.message ||
        "COURSES/[COURSEID]/CHAPTERS/[CHAPTERID]/PROGRESS API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
