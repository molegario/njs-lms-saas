import { db } from "@/lib/db";
import Categories from "./_components/categories";

const search = async () => {

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return ( 
    <div className="p-6">
      <Categories categories={categories}/>
    </div>
   );
}
 
export default search;