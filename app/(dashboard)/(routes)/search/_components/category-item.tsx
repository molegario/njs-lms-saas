"use client";
import qs from "query-string";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryItemProps {
  label: string;
  value?: string;
}

const iconMap: Record<Category["name"], IconType> = {
  Engineering: FcEngineering,
  Filming: FcFilmReel,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Accounting: FcSalesPerformance,
  Fitness: FcSportsMode,
  "Computer Science": FcMultipleDevices,
};

const CategoryItem = ({
  label,
  value
}:CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");

  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );
    router.push(url);
  };

  const Icon = iconMap[label];



  return ( 
    <button
      className={
        cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
        )
      }

      onClick={onClick}
    >
      {
        Icon && <Icon size={20} />
      }
      <div className="truncate">{label}</div>
    </button>
   );
}
 
export default CategoryItem;