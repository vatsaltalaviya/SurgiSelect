import React, { useState } from "react";
import CompanyHome from "./CompanyHome";
import { Link } from "react-router-dom";
import CompanyProduct from "./CompanyProduct";
import CompanyAbout from "./CompanyAbout";
import CompanyConatct from "./CompanyConatct";

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = [
    { label: "Home", value: "home" },
    { label: "Products & Services ", value: "product" },
    { label: "About ", value: "about" },
    { label: "Contact ", value: "contact" },
  ];
  return (
    <div className="w-full ">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full px-4 py-2 ">
          <h1 className="text-sm flex flex-col lg:text-3xl font-medium">
            Fuerte Healthcare Private Limited
          </h1>
          <div className="flex flex-col lg:flex-row gap-x-4 lg:items-center w-full">
            <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-map-pin-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">Chowk, Rajkot, Gujarat</h1>
            </div>
            <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-verified-badge-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">GST - 24AAFCF5296B1ZS</h1>
            </div>
            <div className="py-1 flex shrink-0 items-center gap-2">
              <div className="space-y-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <i key={idx} className="ri-star-fill"></i>
                ))}
                <i className="ri-star-half-fill"></i>
              </div>
              <h1 className="text-xs md:text-sm font-medium">
                3.7
                <a href="#" className="text-xs md:text-sm text-blue-600 underline">
                  (358)
                </a>
              </h1>
            </div>

            <div className="py-1 flex shrink-0 items-center gap-1">
              <i className="ri-phone-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">59% Response Rate</h1>
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            {tabs.map((tab, i) => (
              <div
                key={tab.value}
                className={`relative flex ${i === 1 ? "group" : ""}`}
              >
                <button
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
                    activeTab === tab.value
                      ? "border-blue-600 text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>

                {/* Hover content */}
                {i === 1 && (
                  <div className="absolute min-w-6xl top-10 flex-wrap gap-3 left-0 text-base font-medium text-gray-600 z-20 hidden group-hover:flex bg-white p-2 rounded shadow">
                   {[...Array(6)].map((_,i)=> <div key={i} className="px-2 space-y-1 shrink-0">
                      <Link to="#"><h1 className="text-lg font-medium text-primary">Surgical Mesh</h1></Link>
                      {[...Array(6)].map((_ , i)=><Link key={i} to="#"><h1 className="text-sm mt-2 font-medium text-zinc-800">Lotus 3d Provisc Ipom Hernia Mesh</h1></Link>)}

                    </div>)}
                    
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 px-2 py-4 flex flex-col items-center">
          <button className=" px-4 py-2 rounded text-sm font-medium border text-emerald-700 flex items-center">
            <i className="ri-phone-fill text-xl mr-2" />
            View Phone Number
          </button>
          <button className="border-2 px-7 py-2 rounded text-sm font-medium flex items-center text-white bg-emerald-700">
            <i className="ri-telegram-2-fill text-xl mr-2 " />
            Contact Supplier
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 w-full sm:px-0">
        {activeTab === "home" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">Home</h2>
            <CompanyHome />
          </div>
        )}
        {activeTab === "product" && (
          <div className="md:px-6 relative px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Product and services
            </h2>
            <CompanyProduct />
          </div>
        )}
        {activeTab === "about" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">About</h2>
            <CompanyAbout/>
            
          </div>
        )}
        {activeTab === "contact" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">Contact</h2>
            <CompanyConatct />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
