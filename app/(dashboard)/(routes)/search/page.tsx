import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "../../../../components/courses-list";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

const search = async ({searchParams}:SearchProps) => {

  const { userId } = auth();

  if(!userId) {
    return redirect("/sign-in");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories categories={categories} />
        <CoursesList courses={courses} />
      </div>
    </>
  );
}
 
export default search;