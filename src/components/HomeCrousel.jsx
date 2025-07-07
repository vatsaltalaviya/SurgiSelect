import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomeCrousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className=" flex-res px-4 md:px-10 mb-15 ">
      <div className="lg:w-1/3 py-2 md:p-10">
        <h1 className="text-lg md:text-4xl font-medium">We connect </h1>
        <h1 className="text-lg md:text-4xl font-semibold">Buyers & Sellers</h1>
        <h3 className="text-xs md:text-lg tracking-tight leading-6 font-medium pt-4">
          SurgiSelect is India's largest online B2B
        </h3>
        <h3 className="text-xs md:text-lg tracking-tight leading-6 font-medium">
          marketplace, connecting buyers with suppliers.
        </h3>
        <div className="mt-5">
          <div className="h-full flex items-start gap-4 md:items-center">
            <div className="flex flex-col items-center">
              <img
                className="w-5 md:w-10"
                src="https://cdn-icons-png.flaticon.com/128/2956/2956792.png"
                alt="trusted platform"
              />
              <span className="text-xs md:text-[12px] font-light">Trusted platform</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-5 md:w-10"
                src="https://cdn-icons-png.flaticon.com/128/1489/1489589.png"
                alt="Safe & Secure"
              />
              <span className="text-xs md:text-[12px] font-light">Safe & Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-5 md:w-10"
                src="https://cdn-icons-png.flaticon.com/128/1489/1489589.png"
                alt="Quick Assistance"
              />
              <span className="text-xs md:text-[12px] font-light">Quick Assistance</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3">
        <Slider {...settings}>
          <div className="w-full h-90">
            <img
              className="w-full h-full object-fill"
              src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751885547/20250707_1620_Healthcare_Simplified_remix_01jzj820a9ercvcs3nh7b6ry6s_qy8qvs.png"
              alt=""
            />
          </div>
          <div
            className="w-full h-full relative bg-cover bg-center"
          >
            <img className="w-full object-cover" src='https://hm.imimg.com/imhome_gifs/home-banner-4.jpg' alt="" />
            <div className="absolute hidden xl:block top-18  xl:right-18 bg-opacity-50 p-6 rounded text-white max-w-sm">
              <form className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter product/service name"
                  className="w-full px-3 py-2 rounded border text-black"
                />
                <input
                  type="number"
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 rounded border text-black"
                />
                <button className="w-full text-xl bg-emerald-600 text-white py-2 rounded">
                  Submit Requirements
                </button>
              </form>
            </div>
          </div>
        </Slider>
      </div>
      <div className=" lg:hidden bg-opacity-50 p-6 rounded text-white max-w-sm">
        <h1 className="w-full text-xl font-medium text-center text-black">Get free quotes from multiple sellers</h1>
              <form className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter product/service name"
                  className="w-full px-3 py-2 rounded border text-black"
                />
                <input
                  type="number"
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 rounded border text-black"
                />
                <button className="w-full text-xl bg-emerald-600 text-white py-2 rounded">
                  Submit Requirements
                </button>
              </form>
            </div>
    </div>
  );
};

export default HomeCrousel;
