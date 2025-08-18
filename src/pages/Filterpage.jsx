import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchSubCategoriesbyCategoryId } from "../slices/Category.slice";
import { getBrand } from "../slices/brand.slice";
import { useNavigate } from "react-router-dom";

const Filterpage = () => {
  const [category, setcategory] = useState(null);
  const [subcategory, setsubcategory] = useState([]);
  const [brand, setbrand] = useState([]);
  const dispatch = useDispatch();
  const { categories ,subCategories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getBrand());
  }, []);
  useEffect(() => {
    if(category!=null){
        dispatch(fetchSubCategoriesbyCategoryId(category));
        setsubcategory([])
    }
  }, [category]);

  const handleApplyFilter = () => {
    const query = new URLSearchParams();

    if (category) query.append("category", category);
    if (subcategory.length > 0) query.append("subCategory", subcategory.join(","));
    if (brand.length > 0) query.append("brand", brand.join(","));

    navigate(`/allproducts?${query.toString()}`);
    
  };
    
  return (
    <div className="px-5 py-2 min-h-[calc(100vh-100px)]">
      <div className="py-2 border-t border-black/10">
        <h1 className="text-xl lg:text-2xl font-medium py-2">Category</h1>
        <div className="flex flex-wrap  gap-2 lg:px-52 ">
          {categories?.map((item) => (
            <button
              onClick={() => setcategory(p => (p == item._id ? null:item._id))}
              className={`${
                category == item._id
                  ? "bg-primary text-white"
                  : ""
              } px-2 py-2 font-medium border rounded`}
              key={item._id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="py-2 border-t mt-5 border-black/30">
        <h1 className="text-xl lg:text-2xl font-medium py-2">Sub Category</h1>
        <div className="flex flex-wrap  gap-2 lg:px-52 ">
          {category && subCategories?.map((item) => (
            <button
              onClick={() => setsubcategory((p) => p.includes(item._id)? p.filter((id)=>id !=item._id): [...p, item._id])}
              className={`${
                subcategory.includes(item._id)
                  ? "bg-primary text-white"
                  : ""
              } px-2 py-2 font-medium border rounded`}
              key={item._id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="py-2 border-t mt-5 border-black/30">
        <h1 className="text-xl lg:text-2xl font-medium py-2">Brands</h1>
        <div className="flex flex-wrap  gap-2 lg:px-52 ">
          {brands?.map((item) => (
            <button
              onClick={() => setbrand((p) => p.includes(item._id)? p.filter((id)=>id !=item._id): [...p, item._id])}
              className={`${
                brand.includes(item._id)
                  ? "bg-primary text-white"
                  : ""
              } px-2 py-2 font-medium border rounded`}
              key={item._id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="space-x-4 mt-5">
        <button onClick={()=>handleApplyFilter()} className="text-xl font-medium px-3 py-1 rounded bg-emerald-800 text-white">Apply Filters</button>
        <button onClick={()=>navigate(-1)} className="text-xl font-medium px-3 py-1 rounded border bg-red-800 text-white">Cancel</button>
      </div>
    </div>
  );
};

export default Filterpage;
