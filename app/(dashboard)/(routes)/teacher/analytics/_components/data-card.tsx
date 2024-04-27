import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({
  value,
  label,
  shouldFormat = false,
}:DataCardProps) => {
  return ( 
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <CardContent className="py-5">
          <div className="text-2xl font-bold">
            {
              shouldFormat ? formatPrice(value) : value
            }
          </div>
        </CardContent>

      </CardHeader>
    </Card>
   );
}
 
export default DataCard;