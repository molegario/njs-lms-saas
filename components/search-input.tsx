"use client";
import qs from "query-string";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(
    () => {
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      }, {
        skipEmptyString: true,
        skipNull: true,
      });
      router.push(url);
    }, 
    [debouncedValue, currentCategoryId, pathname, router]
  );

  return ( 
    <div className="relative ">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        placeholder="Search for a course."
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-offset-slate-200"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
   );
}
 
export default SearchInput;