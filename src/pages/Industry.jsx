import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoriesbyCategoryId } from "../slices/Category.slice";



const Industry = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { subCategories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchSubCategoriesbyCategoryId(id));
  }, []);
  
  return (
    <div className="w-full bg-gray-100 py-8 px-4 lg:px-12 min-h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Consumer Electronics
      </h1>
      {loading ? (
       <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white gap-2 md:gap-0">
            {subCategories?.map((category, idx) => (
              <div
                key={idx}
                className=" p-4 shadow-sm border-y border-gray-200/20 hover:bg-blue-100/20 transition"
              >
                <div className="flex items-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-40 h-40 object-cover rounded mb-3"
                  />
                  <ul className=" list-inside space-y-1 text-sm text-gray-700 mx-2">
                    <li>
                      <Link to={`/allproducts/${category.slug}`} className="hover:text-blue-600 text-xl font-medium">
                        {category.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Industry;

export function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white gap-2 md:gap-0">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="p-4 shadow-sm border-y border-gray-200/20 hover:bg-blue-100/20 transition"
            >
              <div className="flex items-center">
                {/* Image skeleton */}
                <div className="w-40 h-40 bg-gray-300 rounded mb-3 animate-pulse" />

                {/* Text skeleton */}
                <ul className="list-inside space-y-2 text-sm text-gray-700 mx-2 w-full">
                  <li className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></li>
                 
                </ul>
              </div>
            </div>
          ))}
        </div>
  );
}

