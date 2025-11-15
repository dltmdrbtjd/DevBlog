import { getAllCategory } from "@/src/entities/post";
import Link from "next/link";

export default async function CategoryPage() {
  const categories = await getAllCategory();
  return (
    <div>
      <h2 className="text-5xl text-center border-b-2 border-b-gray-500 pb-5 mb-8 text-white">
        Category
      </h2>
      <div className="flex flex-wrap max-w-xl mx-auto">
        {categories.map(({ category, count }) => {
          return (
            <div
              key={category}
              className="flex justfiy-center items-center mt-2 mr-8 ml-8 mb-2 h-6"
            >
              <Link
                href={`/category/${category}/1`}
                className="text-xl no-underline text-green-200 hover:text-green-400"
              >
                {category}
              </Link>
              <p className="ml-2 font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
