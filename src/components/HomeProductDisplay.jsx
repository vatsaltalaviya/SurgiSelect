import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  fetchlandingPageCategories,
} from "../slices/Category.slice";
import { ClipLoader } from "react-spinners";

const HomeProductDisplay = () => {
  const dispatch = useDispatch();
  const { categories, landingpageCategories, loading , error } = useSelector(
    (state) => state.category
  );

  const CategoryObj = useMemo(() => {
    if (!categories?.length || !landingpageCategories?.length) return [];

    return landingpageCategories?.map((item) => {
      const matchedCategory = categories?.find(
        (cat) => cat._id === item.categoryId
      );

      return {
        categoryId: item.categoryId,
        categoryName: matchedCategory?.name || "Unknown",
        categoryImage: matchedCategory?.image || "Unknown",
        subCategories: item.subCategories?.slice(0, 9),
      };
    });
  }, [categories, landingpageCategories]);

  

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchlandingPageCategories());
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      {loading ? (
        <Loading />
      ) : (
        <>
          {CategoryObj?.map((cat, i) => (
            <div
              key={i}
              className="w-[95vw] border-blue-600 border-t-2 border-x-0 py-4 px-5"
            >
              <Link to={`/industry/${cat.categoryId}`}>
                <h1 className="text-xl md:text-2xl inline hover:underline hover:text-blue-900 font-semibold">
                  {cat?.categoryName}
                </h1>
              </Link>
              <div className="flex-res mt-5">
                {/* ========== left side ================ */}
                <div className="hidden shrink-0 2xl:flex w-[300px] h-[55vh] relative">
                  <img
                    className="w-full h-full object-cover"
                    src={cat?.categoryImage}
                    alt={cat?.categoryName}
                  />

                  <div className="absolute inset-0 bg-zinc-900/40 flex flex-col justify-end px-10 py-4 space-y-3">
                    <Link to="/categorydetail">
                      <h1 className="text-xl md:text-3xl text-white inline hover:underline font-semibold">
                        {cat?.categoryName}
                      </h1>
                    </Link>

                   
                  </div>
                </div>

                {/* ================= right side =============== */}
                <div className=" w-full relative lg:px-2">
                  {/* <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(400px,1fr))] gap-4"> */}
                  <div className="flex flex-row lg:flex-wrap flex-nowrap gap-4 xl:overflow-hidden overflow-x-scroll">
                    {cat.subCategories.map((subcat, i) => (
                      <Link
                        to={`/allproducts/${subcat.slug}`}
                        key={i}
                        className="shrink-0"
                      >
                        <div
                          key={i}
                          className="shrink-0 md:w-[22em] h-[8em] w-full rounded flex flex-row gap-4 items-center border border-gray-500/30 p-1.5 md:p-2 py-5"
                        >
                          <div className="w-26 h-full md:w-1/3">
                            <img
                              className="w-full h-full object-fill"
                              src={subcat.image}
                              alt=""
                            />
                          </div>
                          <div className="w-fit space-y-14">
                            {
                              <h1
                                className={`font-medium ${
                                  i == 0 ? "font-bold" : ""
                                } py-0.5 bg-white md:leading-9 text-[14px] md:text-[16px] hover:underline`}
                              >
                                {subcat.name}
                              </h1>
                            }
                          
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default HomeProductDisplay;
export function Loading(){
  return(
    
  <div
     
    className="w-[95vw] border-blue-600 border-t-2 border-x-0 py-4 px-5 animate-pulse"
  >
    {/* Category Title Skeleton */}
    <div className="h-6 w-1/3 bg-gray-300 rounded mb-4" />

    <div className="flex flex-col 2xl:flex-row gap-4 mt-5">
      {/* Left Image Block */}
      <div className="hidden 2xl:flex w-[300px] h-[55vh] bg-gray-300 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900/40 flex flex-col justify-end px-10 py-4 space-y-3">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Right Side Subcategories */}
      <div className="w-full relative lg:px-2">
        <div className="flex flex-row lg:flex-wrap flex-nowrap gap-4 xl:overflow-hidden overflow-x-scroll">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="shrink-0 md:w-[22em] w-[18em] h-[8em] rounded flex gap-4 items-center border border-gray-400/30 p-2"
            >
              <div className="w-24 h-full bg-gray-300 rounded" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>


  )
}
