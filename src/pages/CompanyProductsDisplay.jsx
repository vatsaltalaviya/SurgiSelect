import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductImage from "../components/ProductImage";

const CompanyProductsDisplay = ({
  categoryData,
  categoryloading,
  getId,
  setId,
  showproducts,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const productRefs = useRef({});
  const [itemid, setitemid] = useState(null)



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

  const selectedSubCategory = useMemo(() => {
    return categoryData?.find((data) => data._id === getId);
    
  }, [getId]);
  useEffect(() => {
  if (itemid && productRefs.current[itemid]) {
    productRefs.current[itemid].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [itemid]);

console.log(selectedSubCategory);


  return (
    <div className="w-full flex flex-col xl:flex-row relative overflow-hidden min-h-screen">
      <aside className="hidden xl:block sticky top-0 max-w-62 ">
        <div className="bg-zinc-100 p-1 w-full">
          <h1 className="px-1  font-stretch-semi-condensed py-1 text-sm font-semibold text-center">
            Product & Services
          </h1>
        </div>
        {categoryData.map((data, i) => (
          <div key={i} className="py-1 ">
            <details className="group bg-zinc-50 py-2 px-1">
              <summary className="flex items-center gap-x-2 text-sm font-semibold cursor-pointer whitespace-nowrap list-none select-none">
                {data.name}
                <span className="transform transition-transform duration-300 group-open:rotate-90">
                  <i className="ri-arrow-right-s-line" />
                </span>
              </summary>

              <div className="mt-1 pl-4 space-y-1">
                {data?.items?.map((data, i) => (
                  <Link
                    key={i}
                    onClick={() => {
                      setId(data.subCategory);
                      showproducts(true);
                      setitemid(data._id)
                    }}
                    to="#"
                    className="block text-sm text-zinc-800 hover:underline leading-tight"
                  >
                    <h1 className="line-clamp-3">{data.name}</h1>
                  </Link>
                ))}
              </div>
            </details>
          </div>
        ))}
      </aside>

      {/* ================================= For Mobile View ======================================== */}

      <details className="block xl:hidden text-lg font-medium p-1 border rounded w-full text-center ">
        <summary className="bg-zinc-100 p-1 w-full list-none">
          <h1 className="px-1  font-stretch-semi-condensed py-1 text-sm font-semibold text-center">
            Product & Services
          </h1>
        </summary>
        <aside className="">
          {categoryData.map((data, i) => (
            <div key={i} className="py-1 ">
              <details className="group bg-zinc-50 py-2 px-1">
                <summary className="flex items-center gap-x-2 text-sm font-semibold cursor-pointer whitespace-nowrap list-none select-none">
                  {data.name}
                  <span className="transform transition-transform duration-300 group-open:rotate-90">
                    <i className="ri-arrow-right-s-line" />
                  </span>
                </summary>

                <div className="mt-1 pl-4 space-y-1">
                  {data?.items?.map((data, i) => (
                    <Link
                      key={i}
                      onClick={() => {
                        setId(data.subCategory);
                        showproducts(true);
                      }}
                      to="#"
                      className="block text-sm text-zinc-800 hover:underline leading-tight"
                    >
                      <h1 className="line-clamp-3 text-left">{data.name}</h1>
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </aside>
      </details>

      <div className="w-full lg:px-2">
        <h1 className="text-2xl text-primary font-semibold">
          {selectedSubCategory?.name}
        </h1>

        <div className="w-full 2xl:max-w-5xl relative sm:px-1 px-2 mx-auto my-2">
          <Slider {...settings}>
            {selectedSubCategory &&
              selectedSubCategory?.items.map((data, i) => (
                <div
                  key={i}
                  className="min-w-[140px] max-w-[180px] w-full sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] border mx-2 border-black/20 rounded shadow-sm text-center bg-white flex-shrink-0 p-2"
                >
                  <img
                    src={data.logoImage}
                    alt={data.name}
                    className="w-full h-24 sm:h-28 md:h-32 object-contain mb-2"
                  />
                  <Link
                    to={`/productdetail/${data.slug}`}
                    className="text-xs sm:text-sm font-medium text-blue-800 hover:underline line-clamp-2"
                  >
                    {data.name}
                  </Link>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    ₹ {data.price}
                    <span className="text-xs text-gray-500 ml-1">/Piece</span>
                  </p>
                </div>
              ))}
          </Slider>
        </div>

        <div className="w-full py-2 xl:px-6 px-1 mt-5 space-y-3">
          {/* ======== Hare all product shows ================= */}

          {selectedSubCategory &&
          categoryloading ?<ItemLoading />:
            selectedSubCategory?.items.map((data, i) => (
              <div
                key={i}
                  ref={(el) => (productRefs.current[data._id] = el)}
                className="w-full px-2 py-2 xl:mx-4  shadow border border-black/15 rounded-md flex flex-col lg:flex-row gap-6"
              >
                {/* Left: Image Gallery */}
                <div className="flex flex-col gap-3 w-full xl:w-1/2">
                  {/* Thumbnail Row */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Image */}
                    <div className="w-full md:max-w-[200px]">
                      <ProductImage images={data.images} />
                    </div>
                  </div>

                  {/* CTA button */}
                  <button className="border border-green-500 text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-50 w-max self-center">
                    📷 Get More Photos
                  </button>
                </div>

                {/* Right: Product Info */}
                <div className="w-full xl:w-1/2 flex flex-col gap-0.5">
                  <Link
                    to={`/productdetail/${data.slug}`}
                    target=""
                    className="text-xl font-semibold text-gray-800 hover:text-red-500"
                  >
                    {data.name}
                  </Link>

                  <div className="text-lg font-bold text-gray-900">
                    ₹ {data.price}
                    <span className="text-sm font-normal text-gray-600">
                      /Piece
                    </span>
                    <a
                      href="#"
                      className="text-sm text-blue-600 underline ml-2"
                    >
                      Get Latest Price
                    </a>
                  </div>
                    {data?.quantity == 0 ?<span className="px-4 mx-2 shrink-0 py-1 text-sm font-semibold bg-red-500 text-white w-fit my-4 rounded-lg">Out Of Stock</span>:''}
                  <p className="text-sm text-gray-600">
                    Minimum Order Quantity: <strong>5 Piece</strong>
                  </p>

                  <div className="text-sm text-red-500 font-medium underline cursor-pointer">
                    📄 Product Brochure
                  </div>

                  <table className="w-full border text-sm mt-3">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-2 py-0.5 font-semibold">Size</td>
                        <td className="px-2 py-0.5">{data.size}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-2 py-0.5 font-semibold">Color</td>
                        <td className="px-2 py-0.5">{data.color}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-2 py-0.5 font-semibold">Type</td>
                        <td className="px-2 py-0.5">{data.type}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-0.5 font-semibold">Brand</td>
                        <td className="px-2 py-0.5">{data.brandInfo.name}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mt-3">{data.about}</p>

                  {/* Additional Info */}
                  <div className="mt-3 text-sm">
                    <strong>Additional Information:</strong>
                    <ul className="list-disc ml-6 text-gray-700">
                      {/* <li>Item Code: LH3D225</li> */}
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
            ))}
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
function ItemLoading (){
  return <div className="w-full px-2 py-2 xl:mx-4 shadow border border-black/15 rounded-md flex flex-col lg:flex-row gap-6 animate-pulse bg-white">
      {/* Left: Image Gallery */}
      <div className="flex flex-col gap-3 w-full xl:w-1/2">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full md:max-w-[200px] h-52 bg-gray-200 rounded" />
        </div>

        <div className="w-40 h-8 bg-gray-200 rounded self-center mt-2" />
      </div>

      {/* Right: Product Info */}
      <div className="w-full xl:w-1/2 flex flex-col gap-2">
        <div className="w-3/4 h-5 bg-gray-200 rounded" />
        <div className="w-1/2 h-4 bg-gray-200 rounded" />

        <div className="w-1/3 h-6 bg-red-100 rounded my-2" />

        <div className="w-2/3 h-3 bg-gray-200 rounded" />
        <div className="w-32 h-4 bg-gray-200 rounded" />

        <table className="w-full text-sm mt-3">
          <tbody>
            {[1, 2, 3, 4].map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-2 py-1 w-1/3">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </td>
                <td className="px-2 py-1 w-2/3">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="h-4 bg-gray-200 rounded mt-3 w-full" />
        <div className="mt-3">
          <ul className="space-y-2 list-disc ml-6">
            <li className="h-3 bg-gray-200 rounded w-1/2" />
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <div className="h-8 w-40 bg-gray-300 rounded" />
          <div className="h-8 w-full sm:w-44 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
}
