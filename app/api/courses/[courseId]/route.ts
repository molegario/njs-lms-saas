import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try{
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!values.title && !values.description && !values.imageUrl) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const coursepatch = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(coursepatch);
  } catch(e:any) {
    console.error("[COURSES/[COURSEID]]", e.message || "COURSES/[COURSEID] API DB ACTION FAIL");
  }
}