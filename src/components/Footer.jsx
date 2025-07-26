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
    <footer className="w-full flex flex-col items-center  md:justify-center">
    
     
      <div className="w-full px-2 py-2 flex ">
        <span className="text-base lg:text-[14px] font-medium text-gray-500">
          Copyright © 1996-2025 SurgiSelect InterMESH Ltd. All rights reserved.
        </span>
        {/* <span className="text-[14px] font-medium text-gray-500">
          <Link to='#' className="hover:text-primary hover:underline">Terms of use</Link>
          -<Link to='#' className="hover:text-primary hover:underline">Private Policy</Link>
          -<Link to='#' className="hover:text-primary hover:underline">Link to Us</Link>
        </span> */}
      </div>
    </footer>
  );
};

export default Footer;
