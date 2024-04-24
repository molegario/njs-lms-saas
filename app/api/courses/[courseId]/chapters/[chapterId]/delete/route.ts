import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const { list } = await req.json();

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
          courseId: params.courseId,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success reording chapters", {
      status: 200,
      statusText: "OK",
    });
  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]/CHAPTERS/REORDER",
      e.message || "COURSES/[COURSEID]/CHAPTERS/REORDER API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
