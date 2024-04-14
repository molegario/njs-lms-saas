"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();
  // const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher"); //on course creator page
  const isCoursePage = pathname?.includes("/chapter"); //on a course chapter

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isCoursePage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit teacher mode
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
 
export default NavbarRoutes;