import React from "react";
import ProductImage from "../components/ProductImage";
import { Link } from "react-router-dom";
import TabSwitcher from "../components/TabPart";

const ProductPage = () => {
  return (
    <div className="w-full px-2 py-1">
      <div className="flex-res gap-2">
        <ProductImage />
        <div className="flex flex-col w-full px-2">
          <div>
            <span className="font-medium">
              IndiaMART \ Street, Flood and Commercial Lights \ Party Light \ DJ
              LED Lights
            </span>
          </div>
          <div>
            {/* === product name and details ===== */}
            <h1 className="text-3xl font-medium py-1">
              LED Stan 2-WAY BLINDER LIGHT
            </h1>
            <div className="w-full">
              <form className=" space-y-3">
                <div className="w-full flex flex-col justify-center items-center md:flex-row gap-2">
                  <input
                    type="number"
                    className="border rounded w-full lg:w-sm px-2 py-2"
                    placeholder="Enter Quantity"
                  />
                  <select
                    className="border rounded w-full lg:w-52 px-2 py-2"
                    name=""
                    id=""
                  >
                    <option value="">Piece</option>
                  </select>
                </div>
                <div className="w-full flex items-center justify-center">
                  <button className="px-3 py-2 rounded bg-[#2e3192] text-white font-medium text-2xl">
                    Submit Requirement
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full py-4">
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Color</span>
                <span className="text-lg font-medium">RGBW</span>
              </div>

              {/* =========== aditional Detail==================== */}
              <div className="w-full py-1">
                <h2 className="text-lg font-medium">
                  With the valuable assistance of creative team of our
                  professionals, we are offering a broad range of S205 Profile
                  Blinder Storbe.
                </h2>

                <h1 className="text-xl font-medium">Features:</h1>
                <ul className="list-disc pl-5 space-y-2 text-gray-800">
                  <li className="ml-10 text-base font-medium">
                    Require less maintenance
                  </li>
                  <li className="ml-10 text-base font-medium">
                    Easy to operate
                  </li>
                  <li className="ml-10 text-base font-medium">Rugged design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-lg lg:w-4xl py-1">
          <div className="bg-zinc-200 py-2 px-2 pb-3 rounded ">
            <Link to="#">
              <h1 className="text-lg font-medium underline">
                Cine Audo Viso Equipments
              </h1>
            </Link>
            <h3>
              <i className="ri-map-pin-fill text-xl mr-2"></i>Chandni Chowk, New
              Delhi
            </h3>
            <h3 className="space-x-1">
              <i className="ri-checkbox-circle-fill text-xl mr-2"></i>GST
              <i className="ri-verified-badge-fill text-xl ml-0.5"></i>
              <span className="text-amber-500">TrustSEAL Verified</span>
              <i className="ri-user-3-line"></i>18 Yrs
            </h3>
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
          <div className="w-full px-2 py-4 flex flex-col items-center">
                <button className=" px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center"><i className="ri-phone-fill text-4xl mr-2" />View Phone Number</button>
                <button className="border-2 px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700"><i className="ri-telegram-2-fill text-4xl mr-2 "/>Contact Supplier</button>
          </div>
        </div>
      </div>

      <TabSwitcher />
    </div>
  );
};

export default ProductPage;
