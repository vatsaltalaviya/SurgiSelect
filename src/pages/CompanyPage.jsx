import React, { useState } from "react";

const CompanyPage = () => {
    const [activeTab, setActiveTab] = useState("home");
    const tabs = [
    { label: "Home", value: "home" },
    { label: "Products & Services ", value: "product" },
    { label: "About ", value: "about" },
    { label: "Contact ", value: "contact" },
  ];
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full lg:px-6 flex flex-col xl:flex-row lg:justify-between gap-2">
        <div className="w-full px-4 py-2">
          <h1 className="text-xl flex flex-col lg:text-3xl font-medium">
            Fuerte Healthcare Private Limited
          </h1>
          <div className="flex flex-col lg:flex-row gap-x-4 lg:items-center">
            <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-map-pin-fill"></i>
              <h1 className="text-sm font-medium">Chowk, Rajkot, Gujarat</h1>
            </div>
            <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-verified-badge-fill"></i>
              <h1 className="text-sm font-medium">GST - 24AAFCF5296B1ZS</h1>
            </div>
            <div className="py-1 flex flex-col lg:flex-row shrink-0 lg:items-center gap-2">
              <h3 className="space-x-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <i key={idx} className="ri-star-fill"></i>
                ))}
                <i className="ri-star-half-fill"></i>
                <span className="ml-2 font-medium text-gray-800">3.7</span>
                <a href="#" className="text-sm text-blue-600 underline ml-1">
                  (358)
                </a>
              </h3>
              <h3 className="space-x-1">
                <i className="ri-phone-fill text-xl mr-2"></i>59% Response Rate
              </h3>
            </div>
          </div>
          <div className="w-full">
            {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === tab.value
                ? "border-blue-600 text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
          </div>
        </div>
        <div className="w-full px-2 py-4 flex flex-col items-center">
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
      <div className="mt-4 sm:mt-6 px-2 w-full  sm:px-0">
        {activeTab === "home" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Home
            </h2>
            
          </div>
        )}
        {activeTab === "product" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Product and services
            </h2>
            
          </div>
        )}
        {activeTab === "about" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              About
            </h2>
            
          </div>
        )}
        {activeTab === "contact" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Contact
            </h2>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
