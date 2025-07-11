import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductImage from "../components/ProductImage";

const CompanyProductsDisplay = () => {
  const image = [
    "https://5.imimg.com/data5/SELLER/Default/2023/10/349738829/WT/QY/YV/199582225/lotus-prolus-7-6-x-15cm-mesh-lotus-prolene-mesh-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/10/349675075/FU/UI/LZ/199582225/lotus-3d-provisc-ipom-hernia-mesh-500x500.jpeg",
    "https://5.imimg.com/data5/SELLER/Default/2023/10/349763007/QL/KS/KY/199582225/lotus-3d-provisc-ipom-hernia-mesh-10cm-x-15cm-500x500.jpeg"
  ]
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div className="w-full flex-res relative min-h-screen">
      <aside className="hidden xl:block sticky top-0 min-w-62">
        <div className="bg-zinc-100 p-1 w-full">
          <h1 className="px-1 font-stretch-semi-condensed py-1 text-sm font-semibold text-center">
            Product & Services
          </h1>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="py-1 ">
            <details className="group bg-zinc-50 px-1 py-2">
              <summary className="flex items-center gap-x-2 text-xs font-semibold cursor-pointer list-none select-none">
                Surgical instruments
                <span className="transform transition-transform duration-300 group-open:rotate-90">
                  <i className="ri-arrow-right-s-line" />
                </span>
              </summary>

              <div className="mt-1 pl-4 space-y-1">
                {[...Array(6)].map((_, i) => (
                  <Link
                    key={i}
                    to="#"
                    className="block text-xs text-zinc-800 hover:underline leading-tight"
                  >
                    Lotus 3d Provisc Ipom Hernia Mesh
                  </Link>
                ))}
              </div>
            </details>
          </div>
        ))}
      </aside>

      <div className="w-full lg:px-2">
        <h1 className="text-2xl text-primary font-semibold">Surgical Mesh</h1>
        <p className="text-sm font-normal">
          Providing you the best range of Lotus 3d Provisc Ipom Hernia Mesh,
          Lotus 3d Provisc Ipom Hernia Mesh, 10cm x 15cm, Prolene Non Absorbable
          Synthetic Surgical Mesh, White Polypropylene Lotus Prolene Mesh, Lotus
          Prolus Mesh, Lotus Prolene Mesh 10x15cm and Polypropylene Lotus Prolus
          Mesh with effective & timely delivery.
        </p>

        <div className="w-full 2xl:max-w-5xl relative sm:px-1 px-2 mx-auto my-2">
          <Slider {...settings}>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="min-w-[140px] max-w-[180px] w-full sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] border mx-2 border-black/20 rounded shadow-sm text-center bg-white flex-shrink-0 p-2"
              >
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2023/10/349738829/WT/QY/YV/199582225/lotus-prolus-7-6-x-15cm-mesh-lotus-prolene-mesh-500x500.jpg"
                  alt="Lotus 3d Provisc Ipom Hernia Mesh"
                  className="w-full h-24 sm:h-28 md:h-32 object-contain mb-2"
                />
                <h2 className="text-xs sm:text-sm font-medium text-blue-800 hover:underline line-clamp-2">
                  Lotus 3d Provisc Ipom Hernia Mesh
                </h2>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ₹ 16,999
                  <span className="text-xs text-gray-500 ml-1">/Piece</span>
                </p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="py-2 mt-5 space-y-3">
            {/* ======== Hare all product shows ================= */}
          
          <div className="w-full px-2 py-2 xl:mx-4 bg-white shadow border border-black/15 rounded-md flex flex-col lg:flex-row gap-6">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-3 w-full lg:w-1/2">
            {/* Thumbnail Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Main Image */}
              <div className="w-full md:max-w-[200px]">
              <ProductImage images={image} />
              </div>
            </div>

            {/* CTA button */}
            <button className="border border-green-500 text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-50 w-max self-center">
              📷 Get More Photos
            </button>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-0.5">
            <Link to="#" target="" className="text-xl font-semibold text-gray-800 hover:text-red-500">
              Lotus 3d Provisc Ipom Hernia Mesh
            </Link>

            <div className="text-lg font-bold text-gray-900">
              ₹ 16,999
              <span className="text-sm font-normal text-gray-600">/Piece</span>
              <a href="#" className="text-sm text-blue-600 underline ml-2">
                Get Latest Price
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Minimum Order Quantity: <strong>5 Piece</strong>
            </p>

           
            <div className="text-sm text-red-500 font-medium underline cursor-pointer">
              📄 Product Brochure
            </div>

          
            <table className="w-full border text-sm mt-3">
              <tbody>
                <tr className="border-b">
                  <td className="px-2 py-0.5 font-semibold">Material</td>
                  <td className="px-2 py-0.5">Polypropylene (PP)</td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-0.5 font-semibold">Size</td>
                  <td className="px-2 py-0.5">15x15 cm</td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-0.5 font-semibold">Color</td>
                  <td className="px-2 py-0.5">White</td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-0.5 font-semibold">Usage/Application</td>
                  <td className="px-2 py-0.5">Hospital</td>
                </tr>
                <tr>
                  <td className="px-2 py-0.5 font-semibold">Brand</td>
                  <td className="px-2 py-0.5">Lotus</td>
                </tr>
              </tbody>
            </table>

            {/* Description */}
            <p className="text-sm text-gray-700 mt-3">
              Lotus 3D provisc ipom hernia mesh - Pro-Visc is a macro-perforated
              structure with two distinct sides: a permeable peritoneal side in
              polyester for good fibroblast colonization and quick tissue
              fixation; and a smooth, non-adherent side in polyurethane that
              allows fluid transfer and contact with viscera. Pro-Visc is the
              first dual-side mesh in the market for intra-peritoneal placement.
              The polyester visible mark printed on the dual-side mesh makes it
              simple to center the mesh because it is pre-fitted with sutures.
            </p>

            {/* Additional Info */}
            <div className="mt-3 text-sm">
              <strong>Additional Information:</strong>
              <ul className="list-disc ml-6 text-gray-700">
                <li>Item Code: LH3D225</li>
                <li>Delivery Time: 4 days</li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              <a href="#" className="text-sm text-blue-600 underline">
                💬 Get Best Quote
              </a>
              <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 w-full sm:w-auto">
                Yes, I am interested!
              </button>
            </div>
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default CompanyProductsDisplay;
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-10 top-1/2 -right-1 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300  rounded-full shadow cursor-pointer"
      onClick={onClick}
    >
      <i className="ri-arrow-right-s-line text-xl" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-10 top-1/2 -left-1 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300  rounded-full shadow cursor-pointer"
      onClick={onClick}
    >
      <i className="ri-arrow-left-s-line text-xl" />
    </div>
  );
};
