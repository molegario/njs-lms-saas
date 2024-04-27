import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "./_components/data-card";
import DataChart from "./_components/data-chart";

const Analytics = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat={true}
        />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <DataChart 
        data={data}
      />
    </div>
  );
};

export default Analytics;
