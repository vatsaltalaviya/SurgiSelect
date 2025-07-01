import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const data = [
  { id: 1, label: "Door" },
  { id: 2, label: "mouse" },
  { id: 3, label: "Laptop" },
  { id: 4, label: "Phone Cover" },
  { id: 5, label: "Door mat" },
];
const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [query, setQuery] = useState(null);

  const user = useSelector((state) => state.user.user);

 
  const navigate = useNavigate();
  return (
    <nav
      className={`bg-[#2e3192] w-full ${
        showMenu ? "fixed top-0" : "relative"
      } z-20 px-4 `}
    >
      <div className="flex py-3 md:px-2 items-center justify-between">
        <div className="flex">
          <div className=" md:w-46 px-2 justify-center items-center">
            <img
              onClick={() => navigate("/")}
              className="w-20 md:w-32 object-cover"
              // src={logo}
              src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262201/mainlogo_rdbo0v.png"
              alt=""
            />
          </div>
          <div className="h-full hidden xl:flex">
            <form
              className="flex bg-white rounded"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <button className="flex justify-between h-full items-center text-lg relative  w-36 rounded-l py-2 px-3 text-left font-medium">
                  <i className="ri-map-pin-line text-gray-500"></i>
                  <span>All India</span>
                  <i className="ri-arrow-down-s-line text-2xl text-emerald-500 "></i>
                </button>
              </div>
              <div className="">
                <Autocomplete
                  disablePortal
                  freeSolo
                  id="free-solo-2-demo"
                  options={data}
                  getOptionLabel={(option) => option.label}
                  sx={{ width: 380, fontSize: 20, fontWeight: 500 }}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setQuery(newValue.label); // or setQuery(newValue.id) if needed
                    } else {
                      setQuery(null);
                    }
                  }}
                  onInputChange={(event, inputValue) => {
                    setQuery(inputValue); // For two-way binding
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter Product/Service to search"
                      className="border outline-none w-[380px] h-full py-2 px-1 text-lg border-gray-500"
                    />
                  )}
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
              {user?.name || "sign in"} <i className="ri-arrow-down-s-line"></i>
            </span>
            <div className="absolute top-2 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="w-72 rounded bg-stone-100 flex flex-col gap-4 p-4">
                <Link
                  to="/signup"
                  className="px-3 py-2 text-white bg-primary text-xl text-center rounded-xl"
                >
                  Sign UP
                </Link>
                <Link to="/">
                  <p className="cursor-pointer text-lg space-x-3 hover:text-black">
                    <i className="ri-home-9-fill text-xl" />
                    <span className="text-lg">Home</span>
                  </p>
                </Link>
                <Link to="/cart">
                  <p className="cursor-pointer space-x-3 hover:text-black">
                    <i className="ri-shopping-cart-fill text-xl" />
                    <span className="text-lg">Cart</span>
                  </p>
                </Link>
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
          <div className="flex w-full gap-4 items-center">
            <details className="appearance-none w-52 list-none cursor-pointer font-medium text-lg">
              <summary className="marker:content-none flex items-center gap-4">
                <i className="ri-user-line text-xl font-medium text-white"></i>
                <span className="text-white text-[12px] font-light flex items-center gap-1">
                  {user?.name || "sign in"} <i className="ri-arrow-down-s-line"></i>
                </span>
              </summary>

              <div className="w-full text-base font-medium text-gray-600">
                <div className="w-full rounded bg-stone-100 flex flex-col gap-4 p-4">
                  <Link
                  to="/signup"
                  className="px-3 py-2 text-white bg-primary text-sm text-center rounded"
                >
                  Sign UP
                </Link>
                <Link to="/">
                  <p className="cursor-pointer text-lg space-x-3 hover:text-black">
                    <i className="ri-home-9-fill text-lg" />
                    <span className="text-sm">Home</span>
                  </p>
                </Link>
                  <Link to="/cart">
                  <p className="cursor-pointer space-x-3 hover:text-black">
                    <i className="ri-shopping-cart-fill text-lg" />
                    <span className="text-sm">Cart</span>
                  </p>
                </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
