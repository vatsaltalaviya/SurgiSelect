import React from "react";
import { Link } from "react-router-dom";

const CompanyProductCategory = ({
  categoryData,
  categoryloading,
  setId,
  showproducts,
}) => {
  return (
    <>
      {categoryloading ? <CategorySectionSkeleton />:categoryData?.map((data, i) => (
        <section key={i} className="bg-white mt-5 p-6 shadow rounded-md">
          <Link
            to="#"
            onClick={() => {
              setId(data._id);
              showproducts(true);
            }}
            className="text-xl font-bold text-primary mb-2"
          >
            {data.name}
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
            {data?.items?.slice(0, 4).map((product, i) => (
              <div key={i} className="border border-black/20 p-2 bg-white">
                <img
                  src={product.logoImage}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <p
                  onClick={() => {
                    setId(product.subCategory);
                    showproducts(true);
                  }}
                  className="text-sm hover:font-semibold cursor-pointer line-clamp-2"
                >
                  {product.name}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right">
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-sm font-medium transition">
              View more details
            </button>
          </div>
        </section>
      ))}
    </>
  );
};

export default CompanyProductCategory;
const CategorySectionSkeleton = () => {
  return (
    <section className="bg-white mt-5 p-6 shadow rounded-md animate-pulse">
      {/* Title Skeleton */}
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="border border-black/20 p-2 bg-white">
            <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="text-right">
        <div className="h-8 w-40 bg-gray-300 rounded ml-auto"></div>
      </div>
    </section>
  );
};

