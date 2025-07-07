import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoriesbyCategoryId } from "../slices/Category.slice";
import { ClipLoader } from "react-spinners";

const categories = [
  {
    title: "Computer Hardware & Peripherals",
    image:
      "https://img.freepik.com/free-photo/circuit-board-close-up_23-2150705177.jpg",
    items: [
      "Computer Parts",
      "Computer Accessories",
      "Computer Input Devices",
      "Computer Mouse",
      "Computer Keyboard",
    ],
  },
  {
    title: "Home Appliances & Kitchen Appliances",
    image:
      "https://img.freepik.com/free-photo/home-appliances-white_23-2149361082.jpg",
    items: [
      "Home Appliances",
      "Kitchen Appliance",
      "Washing Machine for Home",
      "Mixer Grinder",
      "Electric Irons",
    ],
  },
  {
    title: "Indoor Lights & Lighting Accessories",
    image:
      "https://img.freepik.com/free-photo/close-up-led-lamps-blue_23-2147812284.jpg",
    items: [
      "LED Lights",
      "LED Bulb",
      "Tube Light",
      "Panel Light",
      "LED Tube Light",
    ],
  },
  {
    title: "Mobile Phone & Accessories",
    image:
      "https://img.freepik.com/free-photo/modern-smartphones-assortment_23-2149309640.jpg",
    items: [
      "Mobile Phone Accessories",
      "Mobile Phones",
      "Earphones",
      "Telephone Instruments",
      "Mobile Phone Charger",
    ],
  },
  {
    title: "Domestic Fans, AC & Coolers",
    image:
      "https://img.freepik.com/free-photo/modern-fan-ceiling_23-2149655483.jpg",
    items: [
      "Electric Fans",
      "Ceiling Fans",
      "Air Conditioner",
      "Air Coolers",
      "Table Fan",
    ],
  },
  {
    title: "Office Automation Products & Devices",
    image:
      "https://img.freepik.com/free-photo/side-view-printer-desk-office_23-2149628827.jpg",
    items: [
      "Multifunction Printer",
      "Xerox Machines",
      "Printers for Home",
      "Epson Printers",
      "Projector",
    ],
  },
  {
    title: "Decorative Light, Lamp & Lamp Shades",
    image:
      "https://img.freepik.com/free-photo/close-up-luxury-lamp_23-2148492434.jpg",
    items: [
      "Decorative Light",
      "Lamps",
      "Wall Light",
      "String Light",
      "Table Lamps",
    ],
  },
  {
    title: "Street, Flood and Commercial Lights",
    image:
      "https://img.freepik.com/free-photo/laser-light-show-performance-stage-night_23-2149371511.jpg",
    items: [
      "Street Lights",
      "LED Street Light",
      "Flood Lights",
      "Spot Lights",
      "LED Floodlight",
    ],
  },
  {
    title: "Heater, Thermostat & Heating Devices",
    image:
      "https://img.freepik.com/free-photo/modern-electric-heater-home_23-2149363124.jpg",
    items: [
      "Water Heater & Geyser",
      "Heater & Heating Components",
      "Electric Water Heater",
      "Electric Geyser",
      "Industrial Heaters",
    ],
  },
];

const Industry = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { subCategories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchSubCategoriesbyCategoryId(id));
  }, []);

  return (
    <div className="w-full bg-gray-100 py-8 px-4 lg:px-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Consumer Electronics
      </h1>
      {loading ? (
       <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white gap-2 md:gap-0">
            {subCategories?.map((category, idx) => (
              <div
                key={idx}
                className=" p-4 shadow-sm border-y border-gray-200/20 hover:bg-blue-100/20 transition"
              >
                <div className="flex items-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-40 h-40 object-cover rounded mb-3"
                  />
                  <ul className=" list-inside space-y-1 text-sm text-gray-700 mx-2">
                    <li>
                      <Link to="#" className="hover:text-blue-600 font-medium">
                        {category.name}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Industry;

export function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white gap-2 md:gap-0">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="p-4 shadow-sm border-y border-gray-200/20 hover:bg-blue-100/20 transition"
            >
              <div className="flex items-center">
                {/* Image skeleton */}
                <div className="w-40 h-40 bg-gray-300 rounded mb-3 animate-pulse" />

                {/* Text skeleton */}
                <ul className="list-inside space-y-2 text-sm text-gray-700 mx-2 w-full">
                  <li className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></li>
                 
                </ul>
              </div>
            </div>
          ))}
        </div>
  );
}

