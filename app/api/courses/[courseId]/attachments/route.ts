import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if(!courseOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url: url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);

  } catch (e: any) {
    console.error(
      "[COURSES/[COURSEID]/ATTACHMENTS]",
      e.message || "COURSES/[COURSEID]/ATTACHMENTS API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", { status: 500 });
  }
}
