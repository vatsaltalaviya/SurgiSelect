import React from "react";
import { Link } from "react-router-dom";

const CompanyProductCategory = ({categoryData,categoryloading}) => {
  console.log(categoryData,categoryloading);
  
  return (
   <>
   {categoryData?.map((data,i)=> <section key={i} className="bg-white mt-5 p-6 shadow rounded-md">
      <Link to="#" className="text-xl font-bold text-primary mb-2">{data.name}</Link>
      {/* <p className="text-sm text-gray-600 mb-3">
        Providing you the best range of Lotus 3d Provisc Ipom Hernia Mesh, Lotus 3d Provisc Ipom Hernia Mesh, 10cm x 15cm,
        Prolene Non Absorbable Synthetic Surgical Mesh, White Polypropylene Lotus Prolene Mesh and Lotus Prolus Mesh,
        Lotus Prolene Mesh 10x15cm with effective & timely delivery.
      </p> */}
      <Link to="#" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        View More
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {data?.items?.slice(0,4).map((product, i) => (
          <div key={i} className="border border-black/20 p-2 bg-white">
            <img src={product.logoImage} alt={product.name} className="w-full h-40 object-contain mb-2" />
            <p className="text-sm hover:font-semibold cursor-pointer line-clamp-2">{product.name}</p>
          </div>
        ))}
      </div>

      <div className="text-right">
        <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded text-sm font-medium transition">
          View more details
        </button>
      </div>
    </section>)}
   </>
  );
};

export default CompanyProductCategory;
