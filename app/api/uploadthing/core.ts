import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" });
const handleAuth = ()=>{
  const { userId } = auth()

  if(!userId) throw new Error("Unauthorized access");
  return { userId };

}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;


//OLEGARIO ref. 2:58:53 https://youtu.be/Big_aFLmekI?t=10733
