import React, { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Computer Hardware & Peripherals",
    items: [
      {
        title: "Computer Parts",
        image: "https://img.freepik.com/free-photo/computer-mainboard-electronic-circuit-with-processor-close-up_1387-642.jpg",
        count: 1200,
      },
      {
        title: "Antminer",
        image: "https://img.freepik.com/free-photo/black-digital-crypto-currency-bitcoin-miner_53876-144621.jpg",
        count: 522,
      },
      {
        title: "Motherboard",
        image: "https://img.freepik.com/free-photo/closeup-electronic-circuit-board-background_53876-96803.jpg",
        count: 16887,
      },
      {
        title: "Laptop Parts",
        image: "https://img.freepik.com/free-photo/top-view-laptop-parts-with-copy-space_23-2148774064.jpg",
        count: 3436,
      },
      {
        title: "Laptop Panel",
        image: "https://img.freepik.com/free-photo/opened-modern-laptop-isolated-white-background_93675-134599.jpg",
        count: 370,
      },
    ],
  },
  {
    title: "Motherboard",
    items: [
      { title: "Motherboard", image: "https://via.placeholder.com/100", count: 16887 },
      { title: "LED TV Motherboard", image: "https://via.placeholder.com/100", count: 4319 },
      { title: "Laptop Motherboard", image: "https://via.placeholder.com/100", count: 2949 },
      { title: "Computer Motherboard", image: "https://via.placeholder.com/100", count: 7228 },
      { title: "Motherboard Scrap", image: "https://via.placeholder.com/100", count: 612 },
      { title: "Television Motherboard", image: "https://via.placeholder.com/100", count: 3676 },
      { title: "Industrial Motherboard", image: "https://via.placeholder.com/100", count: 242 },
    ],
  },
];

const CategoryDetail = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleViewMore = (sectionIndex) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex],
    }));
  };

  return (
    <div className="bg-gray-100 px-4 py-6 lg:px-16">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-3">
        IndiaMART &gt; Consumer Electronics &gt;{" "}
        <span className="text-black font-medium">Computer Hardware & Peripherals</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 underline">
        Keyboard, Mouse, Graphics Card, Computer Hardware & Peripherals
      </h1>

      {sections.map((section, idx) => {
        const isExpanded = expandedSections[idx] || false;
        const itemsToShow = isExpanded ? section.items : section.items.slice(0, 6);

        return (
          <div key={idx} className="bg-white p-4 mb-1 shadow-sm">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {itemsToShow.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-gray-50 p-3 rounded hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 aspect-square object-cover mb-2"
                  />
                  <Link
                    to="#"
                    className="text-sm font-medium underline text-blue-900 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  <span className="text-xs text-gray-600 mt-1">({item.count})</span>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {section.items.length > 6 && (
              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded"
                  onClick={() => toggleViewMore(idx)}
                >
                  {isExpanded ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryDetail;
