import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks1 = [
    "About Us",
    "Join Sales",
    "Success Stories",
    "Shipping & Delivery Policy",
    "Returns & Cancellation Policy",
    "Press Section",
    "Advertise with Us",
    "Investor Section",
  ];
  const footerLinks2 = [
    "Help",
    "Feedback",
    "Complaints",
    "Customer Care",
    "Jobs & Careers",
    "Contact Us",
  ];
  const suppliersToolKit = [
    "Sell on SurgiSelect",
    "Latest BuyLead",
    "Learning Centre",
    "Ship With SurgiSelect",
  ];

  const buyersToolKit = [
    "Post Your Requirement",
    "Products You Buy",
    "Search Products & Suppliers",
  ];

  const accountingSolutions = [
    "Accounting Software",
    "Tally on Mobile",
    "GST e-Invoice",
  ];

  return (
    <div className="w-full flex flex-col items-center md:px-20 md:justify-center">
      <div className="w-full md:w-[70vw] px-2 py-2 flex flex-col lg:flex-row md:justify-between bg-gray-100">
        <span className="text-blue-600 text-xl md:text-3xl font-medium">
          We Are Here To Help You
        </span>
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
          <div className="flex items-center gap-2">
            <span className="text-black text-sm md:text-xl font-medium">GO Mobile:</span>
            <img
              className="w-4 md:w-8"
              src="https://cdn-icons-png.freepik.com/256/546/546060.png?ga=GA1.1.1175547896.1749882111&semt=ais_hybrid"
              alt=""
            />
            <img
              className="w-4 md:w-8"
              src="https://cdn-icons-png.freepik.com/256/1240/1240939.png?ga=GA1.1.1175547896.1749882111&semt=ais_hybrid"
              alt=""
            />
            <img
              className="w-4 md:w-8"
              src="https://cdn-icons-png.freepik.com/256/16010/16010515.png?ga=GA1.1.1175547896.1749882111&semt=ais_hybrid"
              alt=""
            />
          </div>
          <div className="flex  items-center gap-2">
            <span className="text-black text-sm md:text-xl font-medium">
              Follow As On:
            </span>
            <i className="text-xl md:text-3xl ri-instagram-fill"></i>
            <i className="text-xl md:text-3xl ri-facebook-box-fill"></i>
            <i className="text-xl md:text-3xl ri-linkedin-box-fill"></i>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[70vw] px-2 py-2 flex flex-col lg:flex-row gap-2">
        <ul className="list-none py-1">
          {footerLinks1.map((i, id) => (
            <li
              key={id}
              className="text-lg font-medium text-gray-500 hover:text-primary"
            >
              <Link to="#">{i}</Link>
            </li>
          ))}
        </ul>
        <ul className="list-none py-1">
          {footerLinks2.map((i, id) => (
            <li
              key={id}
              className="text-lg font-medium text-gray-500 hover:text-primary"
            >
              <Link to="#">{i}</Link>
            </li>
          ))}
        </ul>
        <div className="xl:ml-32">
          <ul className="list-none py-1">
            {suppliersToolKit.map((i, id) => (
              <li
                key={id}
                className="text-lg font-medium text-gray-500 hover:text-primary first:text-black"
              >
                <Link to="#">{i}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:ml-32">
          <ul className="list-none py-1">
            {buyersToolKit.map((i, id) => (
              <li
                key={id}
                className="text-lg font-medium text-gray-500 hover:text-primary first:text-black"
              >
                <Link to="#">{i}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:ml-32">
          <ul className="list-none py-1">
            {accountingSolutions.map((i, id) => (
              <li
                key={id}
                className="text-lg font-medium text-gray-500 hover:text-primary first:text-black"
              >
                <Link to="#">{i}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-[70vw] px-2 py-2 flex flex-col lg:flex-row md:justify-between">
        <span className="text-base lg:text-lg font-medium text-gray-500">
          Copyright © 1996-2025 SurgiSelect InterMESH Ltd. All rights reserved.
        </span>
        <span className="text-lg font-medium text-gray-500">
          <Link to='#' className="hover:text-primary hover:underline">Terms of use</Link>
          -<Link to='#' className="hover:text-primary hover:underline">Private Policy</Link>
          -<Link to='#' className="hover:text-primary hover:underline">Link to Us</Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
