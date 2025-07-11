import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const companyInfo = [
  { label: "GST Registration Date", value: "01-07-2017" },
  { label: "Legal Status of Firm", value: "Proprietorship" },
  { label: "Nature of Business", value: "Trader - Wholesaler/Distributor" },
  { label: "Number of Employees", value: "11 To 25 People" },
  { label: "Annual Turnover", value: "5 - 25 Cr" },
  { label: "SurgiSelect Member Since", value: "Aug 2006" },
  { label: "GST", value: "07AAVPM9674P1ZB" },
  { label: "Import Export Code (IEC)", value: "05169*****" },
];

const TabSwitcher = ({images}) => {
  const [activeTab, setActiveTab] = useState("gallery");

  const tabs = [
    { label: "Product Gallery", value: "gallery" },
    { label: "Company Details", value: "company" },
  ];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
              activeTab === tab.value
                ? "border-pink-600 text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 sm:mt-6 px-2 sm:px-0">
        {activeTab === "gallery" && (
          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Product Photo
            </h2>
            <PhotoProvider>
              <div className="flex flex-col items-center gap-4 py-4">
                {images.map((img, i) => (
                  <PhotoView key={i} src={img}>
                    <img
                      src={img}
                      alt={`product-${i}`}
                      className="w-full max-w-md object-cover rounded cursor-zoom-in shadow"
                    />
                  </PhotoView>
                ))}
              </div>
            </PhotoProvider>
          </div>
        )}
        {activeTab === "company" && (
          <div>
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Company Information
            </h2>
            <div className="w-full px-4 py-6">
              <h2 className="text-xl font-semibold mb-4">About the Company</h2>

              {/* Grid for details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {companyInfo.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-base font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Company description */}
              <p className="text-gray-800 text-sm leading-relaxed">
                Our firm <strong>Cine Audo Viso Equipments</strong> started its
                operations in <strong>1999</strong> and since its inception, we
                have been indulged in the manufacturing and wholesaling of
                Sharpy Light, LED Moving Head Lights which are widely used in
                the events industry. From the year, we started operating we have
                been delivering a range of products installed with multiple
                features through which we were able to gain a reputation in the
                market.
                <br />
                The range which we deliver is excellent in terms of its
                usability, durability, and reliability. These appliances are the
                outcome of hard work and dedication of our team along with the
                use of materials which are superlatively excellent and are
                acquired from vendors who are certified.
               
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSwitcher;
