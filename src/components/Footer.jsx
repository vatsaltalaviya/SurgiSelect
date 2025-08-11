import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="w-full flex flex-col items-center  md:justify-center">
    
     
      <div className="w-full px-2 py-2 flex ">
        <span className="text-base lg:text-[14px] font-medium text-gray-500">
          Copyright @ {new Date().getFullYear()} Fuerte Healthcare pvt ltd. All rights reserved.
        </span>
    
      </div>
    </footer>
  );
};

export default Footer;
