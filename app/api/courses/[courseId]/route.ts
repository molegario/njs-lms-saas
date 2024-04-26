import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video: Video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    // check user login exists
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const course = await db.course.findUnique({
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
        attachments: true,
      },
    });

    // check user access
    if (!course) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    // flush chapters and chapter content
    if (course?.chapters?.length > 0) {
      for (const chapter of course.chapters) {
        if (chapter?.muxData?.assetId) {
          await Video.assets.delete(chapter.muxData.assetId);
          await db.muxData.delete({
            where: {
              id: chapter.muxData.id,
            },
          });
        }
        await db.chapter.delete({
          where: {
            id: chapter.id,
            courseId: courseId,
          },
        });
      }
    }

    // flush attachments
    if(course?.attachments?.length > 0) {
      for(const attachment of course.attachments) {
        await db.attachment.delete({
          where: {
            id: attachment.id,
            courseId: courseId,
          },
        });
      }
    }

    // delete course
    const deletedcourse = await db.course.delete({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    // relay update
    return NextResponse.json(deletedcourse);
  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]::DELETE",
      e.message || "COURSES/[COURSEID]::DELETE API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (
      !values.title &&
      !values.description &&
      !values.imageUrl &&
      !values.categoryId &&
      !values.price
    ) {
      return new NextResponse("Missing fields to update.", { status: 401 });
    }

    const coursepatch = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(coursepatch);
  } catch (e: any) {
    console.error(
      "COURSES/[COURSEID]",
      e.message || "COURSES/[COURSEID] API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
