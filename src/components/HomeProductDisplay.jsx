import React from "react";
import { Link } from "react-router-dom";

const HomeProductDisplay = () => {
  const Arr = Array.from({ length: 9 });

  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      {Array.from({length:3}).map((_,i)=>(<div key={i} className="w-[95vw] border-blue-600 border-t-4 border-x-0 py-4 px-5">
        <Link to="#">
          <h1 className="text-xl md:text-3xl inline hover:underline hover:text-blue-900 font-semibold">
            Building Construction Material & Equipment
          </h1>
        </Link>
        <div className="flex-res  justify-center mt-5">
          {/* ========== left side ================ */}
          <div className="hidden shrink-0 2xl:flex w-sm h-[55vh] relative">
            <img
              className="w-full h-full object-cover"
              src="https://img.freepik.com/free-photo/high-angle-measuring-tools-still-life_23-2150440970.jpg"
              alt="Construction tools"
            />

            <div className="absolute inset-0 bg-zinc-900/40 flex flex-col justify-end px-10 py-4 space-y-3">
              <h3 className="font-medium text-white text-xl hover:underline cursor-pointer">
                Prefabricated Houses
              </h3>
              <h3 className="font-medium text-white text-xl hover:underline cursor-pointer">
                Scaffolding Planks & Plates
              </h3>
              <h3 className="font-medium text-white text-xl hover:underline cursor-pointer">
                Construction Machines
              </h3>
              <h3 className="font-medium text-white text-xl hover:underline cursor-pointer">
                Crushing Machines & Plants
              </h3>
              <button className="mt-3 w-28 px-4 py-3 bg-emerald-600 text-white text-lg rounded font-medium hover:bg-emerald-700 transition">
                View All
              </button>
            </div>
          </div>

          {/* ================= right side =============== */}
          <div className=" w-full relative lg:px-4">
            {/* <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(400px,1fr))] gap-4"> */}
            <div className="flex flex-row lg:flex-wrap flex-nowrap gap-1 xl:overflow-hidden overflow-x-scroll">
              {Arr.map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 md:w-[30em] w-full rounded flex flex-row gap-4 md:justify-center items-center border border-gray-500 p-1.5 md:p-2 py-5"
                >
                  <div className="w-26 md:w-1/3">
                    <img
                      className="w-full object-fill"
                      src="https://3.imimg.com/data3/RS/UH/GLADMIN-5385/brick-making-machines-125x125.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-fit space-y-14">
                   {Array.from({length:4}).map((_,i)=>( <Link to="#" key={i} className="">
                      <h1 className="font-bold sm:bg-gray-100 py-0.5 lg:bg-white md:leading-9 text-[16px] md:text-xl hover:underline">
                        Brick Making Machines
                      </h1>
                    </Link>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>))}
    </div>
  );
};

export default HomeProductDisplay;
