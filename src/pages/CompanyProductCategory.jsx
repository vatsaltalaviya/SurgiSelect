import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2023/10/349654925/MF/FR/XA/199582225/lotus-pro-visc-3d-composite-dual-sided-mesh-jpg-webp-250x250.webp",
    title: "Lotus 3d Provisc Ipom Hernia Mesh",
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2023/10/349763007/QL/KS/KY/199582225/lotus-3d-provisc-ipom-hernia-mesh-10cm-x-15cm-250x250.jpeg",
    title: "Lotus 3d Provisc Ipom Hernia Mesh, 10cm x 15cm",
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2024/4/410447057/TP/VR/CR/199582225/untitled-250x250.png",
    title: "Prolene Non Absorbable Synthetic Surgical Mesh",
  },
  {
    img: "https://5.imimg.com/data5/SELLER/Default/2023/10/349738829/WT/QY/YV/199582225/lotus-prolus-7-6-x-15cm-mesh-lotus-prolene-mesh-250x250.jpg",
    title: "White Polypropylene Lotus Prolene Mesh",
  },
];

const CompanyProductCategory = () => {
  return (
   <>
   {[...Array(4)].map((_,i)=> <section key={i} className="bg-white mt-5 p-6 shadow rounded-md">
      <Link to="#" className="text-xl font-bold text-primary mb-2">Surgical Mesh</Link>
      <p className="text-sm text-gray-600 mb-3">
        Providing you the best range of Lotus 3d Provisc Ipom Hernia Mesh, Lotus 3d Provisc Ipom Hernia Mesh, 10cm x 15cm,
        Prolene Non Absorbable Synthetic Surgical Mesh, White Polypropylene Lotus Prolene Mesh and Lotus Prolus Mesh,
        Lotus Prolene Mesh 10x15cm with effective & timely delivery.
      </p>
      <Link to="#" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        View More
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
        {products.map((product, i) => (
          <div key={i} className="border border-black/20 p-2 bg-white">
            <img src={product.img} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <p className="text-sm hover:font-semibold cursor-pointer">{product.title}</p>
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
