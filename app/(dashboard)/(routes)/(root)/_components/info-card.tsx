import { IconBadge } from "@/components/icon-badge";
import { IconNode, LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

const InfoCard = ({
  icon,
  label,
  numberOfItems,
  variant,
}:InfoCardProps) => {
  return ( 
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge 
        variant={variant}
        icon={icon}        
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-grey-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
   );
}
 
export default InfoCard;