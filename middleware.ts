import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/test", "/images", "/", "/api/uploadthing", "/api/webhook"],
});

//["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
