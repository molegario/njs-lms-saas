"use client";
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

  const Icon = iconMap[label];
  return ( 
    <button
      className={
        cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          //TODO: add active state
        )
      }
    >
      {
        Icon && <Icon size={20} />
      }
      <div className="truncate">{label}</div>
    </button>
   );
}
 
export default CategoryItem;