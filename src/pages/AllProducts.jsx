import React, { useRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link } from "react-router-dom";

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Rajkot",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Ludhiana",
  "Agra",
  "Nashik",
];

const AllProducts = () => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full p-4 bg-gray-100 space-y-1">
      {/* Title */}
      <div className="my-4 flex flex-wrap gap-2 items-baseline">
        <h1 className="text-3xl sm:text-5xl font-medium">
          Fingerprint Scanners
        </h1>
        <h3 className="text-lg sm:text-xl font-medium">
          (1000+ products available)
        </h3>
      </div>

      {/* Filter Row */}
      <div className="bg-white w-full flex-res lg:justify-between px-5 py-4 rounded space-y-4 lg:space-y-0">
        {/* Input + Near Me */}
        <form className="flex-res items-center gap-2">
          <div className="relative w-full max-w-md">
            <i className="ri-map-pin-fill text-primary text-sm md:text-xl absolute top-2 left-3" />
            <input
              placeholder="Enter City"
              type="text"
              className="w-full border border-primary text-primary pl-10 pr-10 py-2 text-sm md:text-xl rounded outline-primary"
            />
            <button className="text-primary text-sm md:text-xl absolute top-2 right-3">
              <i className="ri-search-line" />
            </button>
          </div>

          <button className="whitespace-nowrap px-4 py-1 bg-blue-400/30 text-primary text-sm md:text-xl font-semibold rounded-full flex-1/2 items-center gap-1">
            <i className="ri-focus-3-line" />
            near me
          </button>
        </form>

        {/* City List with Scroll */}
        <div className="relative w-full 2xl:w-7xl mt-1 overflow-hidden">
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => scroll("left")}
              className="bg-white shadow px-2 py-1 z-10"
            >
              <i className="ri-arrow-left-wide-fill ttext-sm md:text-xl" />
            </button>

            {/* Scrollable list */}
            <ul
              ref={scrollRef}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth noscrollbar w-full"
            >
              {cities.map((city, i) => (
                <Link key={i} to="#">
                  <li className="whitespace-nowrap px-4 py-1 bg-blue-400/30 text-primary text-sm md:text-xl font-semibold rounded-full hover:bg-primary hover:text-white transition">
                    {city}
                  </li>
                </Link>
              ))}
            </ul>

            {/* Next */}
            <button
              onClick={() => scroll("right")}
              className="bg-white shadow px-2 py-1  z-10"
            >
              <i className="ri-arrow-right-wide-fill text-sm md:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="w-full flex-res">
        {/* left side */}
        <aside className="space-y-4 w-xs hidden md:block">
          {/* related Category */}
          <div className="bg-white rounded px-2 py-1 text-wrap">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Related Category
            </h1>

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-x-1 py-1 border-y border-gray-400/30 flex items-center"
              >
                <div className="w-1/3">
                  <PhotoProvider>
                    <PhotoView src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg">
                      <img
                        src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg"
                        alt={`Image`}
                        className="max-w-full max-h-full object-contain cursor-zoom-in"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>
                <div className="text-xl font-medium w-2/3 break-words">
                  <Link className="hover:underline ">Fingerprint Devices</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Filter result */}
          <div className="bg-white rounded px-2 py-1">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Filter Result
            </h1>
            <form className="w-full">
              <div className="py-2">
                <input
                  className="form-checkbox h-5 w-5 mx-2 text-primary"
                  type="checkbox"
                  name=""
                  id=""
                />
                <Link className="text-xl font-medium hover:underline" to="#">
                  Your city
                </Link>
              </div>
              <div className="py-2">
                <input
                  className="form-checkbox h-5 w-5 mx-2 text-primary"
                  type="checkbox"
                  name=""
                  id=""
                />
                <Link className="text-xl font-medium hover:underline" to="#">
                  Video
                </Link>
              </div>
            </form>
          </div>

          {/* related Brand */}
          <div className="bg-white rounded px-2 py-1 text-wrap">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Related Brands
            </h1>

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-x-1 py-1 border-y border-gray-400/30 flex items-center"
              >
                <div className="w-1/3">
                  <PhotoProvider>
                    <PhotoView src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg">
                      <img
                        src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg"
                        alt={`Image`}
                        className="max-w-full max-h-full object-contain cursor-zoom-in"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>
                <div className="text-xl font-medium w-2/3 break-words">
                  <Link className="hover:underline ">Fingerprint Devices</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Business Type */}
          <div className="bg-white rounded px-2 py-1">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Business Type
            </h1>
            <div className="w-full">
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Menufacture
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Retailer
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  WholeSeller/Distributer
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Expoter
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AllProducts;
