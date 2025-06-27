import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false);
  //   console.log(showMenu);
const navigate = useNavigate()
  return (
    <nav className="bg-[#2e3192] relative z-20 px-4 ">
      <div className="flex py-3 md:px-2 items-center justify-between">
        <div className="flex">
          <div className=" md:w-46 px-2 justify-center items-center">
            <img
            onClick={()=>navigate('/')}
              className="w-20 md:w-40 object-cover"
              src="https://imgs.search.brave.com/qxP4z9-3av0kLFti5Lfb1y3jIIEk65opGan9wQl42fk/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9neG11YjJv/bC9wcm9kdWN0aW9u/L2ExMzI0Yjg5Yjhk/ODE4NzZlYjQ5MTM0/YTg5OTFmNTEyYWMw/NjIzNjEtNzc3eDE3/OS5wbmc"
              alt=""
            />
          </div>
          <div className="h-full hidden xl:flex">
            <form
              className="flex bg-white rounded"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <button className="flex h-full items-center text-lg relative  w-30 rounded-l py-2 px-3 text-left font-medium">
                  <i className="ri-map-pin-line text-gray-500"></i>All India{" "}
                  <span>
                    <i className="ri-arrow-down-s-line text-2xl text-emerald-500 absolute right-0 top-1"></i>
                  </span>
                </button>
              </div>
              <div className="">
                <input
                  className="border outline-none w-[380px] h-full py-2 px-1 text-lg border-gray-500"
                  type="text"
                  placeholder="Enter Product/Service to search"
                />
              </div>
              <div>
                <button className="flex justify-center gap-2 px-0.5 h-full items-center text-lg bg-emerald-500 text-white w-28 rounded-r py-2 text-left font-medium">
                  <i className="ri-search-line"></i>Search{" "}
                </button>
              </div>
            </form>
            <div>
              <button className="2xl:flex ml-10 hidden justify-center gap-2 px-2 py-1 h-full items-center text-[16px] bg-white text-[#2e3192] rounded text-left font-semibold">
                Get Best Price
              </button>
            </div>
          </div>
        </div>
        <div className="h-full hidden xl:flex gap-4 items-center">
          <div className="flex flex-col items-center">
            <i className="ri-shopping-bag-3-line text-2xl font-medium text-white"></i>
            <span className="text-white text-[18px] font-light">Shopping</span>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-store-line text-2xl font-medium text-white"></i>
            <span className="text-white text-[18px] font-light">Sell</span>
          </div>
          <div className="flex flex-col items-center relative group">
            <i className="ri-question-line text-2xl font-medium text-white"></i>
            <span className="text-white text-[18px] font-light">Help</span>

            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="w-72 rounded bg-stone-100 flex flex-col gap-4 p-4">
                <p className="cursor-pointer hover:text-black">Home</p>
                <p className="cursor-pointer hover:text-black">
                  Post Your Requirement
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <i className="ri-message-2-line text-2xl font-medium text-white"></i>
            <span className="text-white text-[18px] font-light">Message</span>
          </div>
          <div className="flex flex-col group items-center relative">
            <i className="ri-user-line text-2xl font-medium text-white"></i>
            <span className="text-white text-[18px] font-light">
              Signin <i className="ri-arrow-down-s-line"></i>
            </span>
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="w-72 rounded bg-stone-100 flex flex-col gap-4 p-4">
                <p className="cursor-pointer hover:text-black">Home</p>
                <p className="cursor-pointer hover:text-black">
                  Post Your Requirement
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-5 items-center xl:hidden">
          <i
            onClick={() => setshowMenu((p) => !p)}
            className={`${
              showMenu ? "ri-close-large-line" : "ri-menu-line"
            } transition-all duration-200 text-xl font-medium text-white`}
          ></i>
        </div>
      </div>

      {/* ------- for mobile version */}

      <div
        className={`bg-[#2e3192] absolute w-72 transition-all z-10 duration-200 ${
          showMenu ? "left-0" : "-left-1000"
        }`}
      >
        <div className="h-screen w-90 flex flex-col gap-4 justify-start px-2 py-1 ">
          <div className="flex gap-4 items-center">
            <i className="ri-shopping-bag-3-line hover:ri-shopping-bag-3-fill  text-xl font-medium text-white"></i>
            <span className="text-white text-[12px] font-light">Shopping</span>
          </div>
          <div className="flex gap-4 items-center">
            <i className="ri-store-line text-xl font-medium text-white"></i>
            <span className="text-white text-[12px] font-light">Sell</span>
          </div>
          <div className="flex gap-4 items-center">
            <i className="ri-question-line text-xl font-medium text-white"></i>
            <span className="text-white text-[12px] font-light">Help</span>
          </div>
          <div className="flex gap-4 items-center">
            <i className="ri-message-2-line text-xl font-medium text-white"></i>
            <span className="text-white text-[12px] font-light">Message</span>
          </div>
          <div className="flex gap-4 items-center">
            <i className="ri-user-line text-xl font-medium text-white"></i>
            <span className="text-white text-[12px] font-light">
              Signin <i className="ri-arrow-down-s-line"></i>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
