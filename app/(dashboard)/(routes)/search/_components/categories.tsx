import { Category } from "@prisma/client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc"
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
  categories: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Engineering": FcEngineering,
  "Filming": FcFilmReel,
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Accounting": FcSalesPerformance,
  "Fitness": FcSportsMode,
  "Computer Science": FcMultipleDevices,
}

const Categories = ({
  categories
}:CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            label={category.name}
            value={category.id}
          />
        );
      })}
    </div>
  );
}
 
export default Categories;