import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  try {

    const { userId } = auth();
    const { title } = await req.json();

    if(!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if(!title) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);

  } catch(e:any) {
    console.error("[COURSES]", e.message || 'COURSES API DB ACTION FAIL');
    return new NextResponse(e.message || "Internal Error", { status: 500 })
  }
}