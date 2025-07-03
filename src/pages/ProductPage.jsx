import React, { useEffect, useState } from "react";
import ProductImage from "../components/ProductImage";
import { Link, useParams } from "react-router-dom";
import TabSwitcher from "../components/TabPart";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsById } from "../slices/items.slice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { AddtoCart } from "../slices/Cart.slice";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1)
  

  const { items, loading } = useSelector((state) => state.items);
  const { cartloading } = useSelector((state) => state.cart);
  const { company } = useSelector((state) => state.companies);
   const userid = localStorage.getItem("user");
  useEffect(() => {
    dispatch(fetchItemsById(id));
  }, []);

  const updatedProduct = {
    ...items,
    images: [
      ...(items?.images || []).filter((img) => img !== items?.logoImage),
    ],
  };
  const parsedFeatures = updatedProduct?.feature
    ?.split(";") // Split by ;
    .map((str) => str.trim()) // Trim each piece
    .filter(Boolean) // Remove empty strings
    .map((str) => {
      const [key, ...rest] = str.split(":");
      return {
        key: key.trim(),
        value: rest.join(":").trim(), // in case value also contains ':'
      };
    });


    const handlesubmit = (e) =>{
      e.preventDefault();
      const cartdata = {
        userId:userid,
        itemId:id,
        qty,
        price:updatedProduct?.price,
      }
      
      dispatch(AddtoCart(cartdata)).then(()=>toast.success("Add to cart"))
      
    }


  return (
    <div className="w-full px-2 py-1">
      {loading ?<div className="w-full h-screen flex items-center justify-center"><ClipLoader size={50} /></div>:<>
      <div className="flex-res gap-2">
        <ProductImage images={updatedProduct?.images} />
        <div className="flex flex-col w-full px-2">
          <div>
            {/* === product name and details ===== */}
            <h1 className="text-lg xl:text-3xl font-medium text-Black w-full break-words whitespace-normal xl:line-clamp-3">
              {updatedProduct?.name}
            </h1>
            <div className="w-full mt-4">
              <form onSubmit={handlesubmit} className=" space-y-3">
                <div className="w-full flex items-center space-x-3 py-2">
                  <div className="flex items-center border px-2 py-1 rounded gap-2">
                    <button type="button"
                      onClick={() => setqty((p) => Math.max(p - 1, 1))}
                      className="text-2xl font-semibold text-gray-600 hover:text-black"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {qty}
                    </span>
                    <button type="button"
                      onClick={() => setqty((p) => p + 1)}
                      className="text-2xl font-semibold text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-center">
                  <button className="px-3 w-full py-2 rounded bg-[#2e3192] text-white font-medium md:text-2xl">
                    {cartloading ? <BeatLoader color="white" size={5} />:"Add to cart"}
                    
                  </button>
                </div>
                </div>
                
              </form>
            </div>
            <div className="w-full py-4">
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Colour</span>
                <span className="text-lg font-medium">
                  {updatedProduct?.color}
                </span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Type</span>
                <span className="text-lg font-medium">
                  {updatedProduct?.type}
                </span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">Size</span>
                <span className="text-lg font-medium">
                  {updatedProduct?.size}
                </span>
              </div>
              <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                <span className="text-lg font-medium">price</span>
                <span className="text-lg font-medium">
                  {updatedProduct?.price}
                </span>
              </div>

              {/* =========== aditional Detail==================== */}
              <div className="w-full mt-5">
                <h2 className="text-lg font-medium">{updatedProduct?.about}</h2>

                <h1 className="text-xl font-medium">Features:</h1>
                <ul className="list-disc mt-6 pl-5 space-y-2 text-gray-800">
                  {parsedFeatures?.map((feature, index) => (
                    <li key={index} className="ml-10 text-base font-medium">
                      <strong>{feature.key}:</strong> {feature.value}
                    </li>
                  ))}
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
            <button className=" px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center">
              <i className="ri-phone-fill text-4xl mr-2" />
              View Phone Number
            </button>
            <button className="border-2 px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700">
              <i className="ri-telegram-2-fill text-4xl mr-2 " />
              Contact Supplier
            </button>
          </div>
        </div>
      </div>
      <TabSwitcher images={updatedProduct?.images} />
      </>}
      
    </div>
  );
};

export default ProductPage;
