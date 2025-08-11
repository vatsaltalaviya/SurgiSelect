import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductImage from "../components/ProductImage";
import { Link, useParams } from "react-router-dom";
import TabSwitcher from "../components/TabPart";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsById } from "../slices/items.slice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { AddtoCart } from "../slices/Cart.slice";
import { toast } from "react-toastify";
import { fetchAllCompanies } from "../slices/company.slice";

const ProductPage = () => {
  const [showContactNumber, setshowContactNumber] = useState(false)
  const [showContactpopup, setshowContactpopup] = useState(false)
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);

  const { items, loading } = useSelector((state) => state.items);
  const { cartloading } = useSelector((state) => state.cart);
  const userid = localStorage.getItem("user");
  

  useEffect(() => {
    dispatch(fetchItemsById(slug));
    dispatch(fetchAllCompanies());
    window.scrollTo(0,0)
  }, []);

  const updatedProduct = {
    ...items,
    images: [
      ...(items?.images || []).filter((img) => img !== items?.logoImage),
    ],
  };
  // console.log(updatedProduct);
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

  const handlesubmit = (e) => {
    e.preventDefault();
    const cartdata = {
      userId: userid ?? 1,
      itemId: updatedProduct._id,
      qty,
      price: updatedProduct?.price,
    };
    const localcartdata = {
      userId: userid ?? 1,
      itemId: updatedProduct._id,
      name: updatedProduct?.name,
      image: updatedProduct?.logoImage,
      qty,
      price: updatedProduct?.price,
    };
    if (!userid) {
      // Get existing cart from localStorage or start with empty array
      const existingCart = JSON.parse(localStorage.getItem("cart-data")) || [];

      // Add new item to the cart array
      existingCart.push(localcartdata);

      // Save updated cart back to localStorage
      localStorage.setItem("cart-data", JSON.stringify(existingCart));

      toast.success("Added to cart");
    } else {
      dispatch(AddtoCart(cartdata)).then(() => toast.success("Add to cart"));
    }
  };


  

  return (
    <div className="w-full px-2 pt-5 py-1">
            {console.log("Product page rendered")}
      {loading ? (
        <div className="w-full h-screen">
          <ProductLoading />
        </div>
      ) : (
        <>
          <div className="flex-res gap-2">
            <ProductImage images={updatedProduct?.images} />
            <div className="flex flex-col w-full">
              <div>
                {/* === product name and details ===== */}
                <h1 className="text-sm xl:text-xl font-medium text-Black w-full break-words whitespace-normal xl:line-clamp-3">
                  {updatedProduct?.name}
                </h1>
                <h1 className="text-sm xl:text-xl font-medium text-Black w-full py-2">
                  <span className="font-semibold">Price : ₹ </span>{" "}
                  {updatedProduct?.price}
                </h1>
                {updatedProduct?.quantity == 0 ?<span className="px-4 shrink-0 py-2 text-sm font-semibold bg-red-500 text-white w-fit my-4 rounded-lg">Out Of Stock</span>:''}
                <div className="w-full mt-4">
                  <form onSubmit={handlesubmit} className=" space-y-1">
                    <div className="w-full flex  items-center space-x-1 py-2">
                      <div className="flex items-center justify-center  border px-2 py-1 rounded gap-2">
                        <button
                        disabled={updatedProduct?.quantity == 0}
                          type="button"
                          onClick={() => setqty((p) => Math.max(p - 1, 1))}
                          className={`text-2xl font-semibold text-gray-600 hover:text-black ${updatedProduct?.quantity == 0?"cursor-not-allowed":""}`}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {qty}
                        </span>
                        <button
                        disabled={updatedProduct?.quantity == 0}
                          type="button"
                          onClick={() => setqty((p) => p + 1)}
                          className={`text-2xl font-semibold text-gray-600 hover:text-black ${updatedProduct?.quantity == 0?"cursor-not-allowed":""}`}
                        >
                          +
                        </button>
                      </div>
                      <div className="w-full flex items-center ">
                        <button
                        disabled={updatedProduct?.quantity == 0}
                        className={`px-3 w-52 py-2 rounded bg-[#2e3192] text-white font-medium ${updatedProduct?.quantity == 0?"cursor-not-allowed":""}`}>
                          {cartloading ? (
                            <BeatLoader color="white" size={5} />
                          ) : (
                            "Add to cart"
                          )}
                        </button>
                      </div>
                      
                          
                    </div>
                  </form>
                </div>
                <div className="w-full py-4">
                  
                  <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                    <span className="text-sm font-medium">Colour</span>
                    <span className="text-sm font-medium">
                      {updatedProduct?.color}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                    <span className="text-sm font-medium">Type</span>
                    <span className="text-sm font-medium">
                      {updatedProduct?.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 w-full odd:bg-gray-100">
                    <span className="text-sm font-medium">Size</span>
                    <span className="text-sm font-medium">
                      {updatedProduct?.size}
                    </span>
                  </div>

                  {/* =========== aditional Detail==================== */}
                  <div className="w-full mt-5">
                    <h2 className="text-[14px] font-medium">
                      {updatedProduct?.about}
                    </h2>

                    <h1 className="text-[14px] font-semibold">Features:</h1>
                    <ul className="list-disc mt-6 pl-5 space-y-2 text-gray-800">
                      {parsedFeatures?.map((feature, index) => (
                        <li
                          key={index}
                          className="ml-10 text-[13px] font-medium"
                        >
                          <strong>{feature.key}:</strong> {feature.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-sm lg:w-4xl py-1">
              <div className="bg-zinc-200 py-2 px-2 pb-3 rounded ">
                {updatedProduct?.companyData &&
                  typeof updatedProduct.companyData === "object" && (
                    <Link
                      to={`/companyprofile/${updatedProduct?.companyData._id}`}
                    >
                      <h1 className="text-sm font-medium underline">
                        {updatedProduct?.companyData.name}
                      </h1>
                    </Link>
                  )}
                <h3>
                  <i className="ri-map-pin-fill text-xl mr-2"></i>Chandni Chowk,
                  New Delhi
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
                  <i className="ri-phone-fill text-xl mr-2"></i>59% Response
                  Rate
                </h3>
              </div>
              <div className="w-full px-2 py-4 flex flex-col items-center">
                <button onClick={()=>setshowContactNumber(true)} className=" px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center">
                  <i className="ri-phone-fill text-xl mr-2" />
                  {showContactNumber ? updatedProduct?.companyData?.number:"View Phone Number"}
                </button>
                <button onClick={()=>setshowContactpopup(true)} className="border-2 px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700">
                  <i className="ri-telegram-2-fill text-xl mr-2 " />
                  Contact Supplier
                </button>
              </div>
            </div>
          </div>
          <TabSwitcher images={updatedProduct?.images} />
          {showContactpopup && <ContactSuplier onClose={()=>setshowContactpopup(false)} company={updatedProduct?.companyData} />}
        </>
      )}
    </div>
  );
};

export default ProductPage;

function ContactSuplier({onClose , company}) {
  const closeref = useRef()
  const close = (e)=>{
    if(e.target === closeref.current){
      onClose()
    }
  }

  
  return (
    <div ref={closeref} onClick={close} className="w-full h-screen bg-black/30 z-20 fixed top-0 left-0 flex lg:flex-row flex-col justify-center items-center">
      <div className="hidden w-full xl:block rounded-none xl:w-1/5 h-1/2 mx-2 bg-white lg:rounded-2xl relative p-2">
        <div className="w-full h-2/3 bg-amber-300 rounded-[8px] overflow-hidden">
          <img
            className="w-full aspect-3/2 h-full object-fill"
            src="https://images.unsplash.com/photo-1752481445093-ee346cf62c95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            alt=""
          />
        </div>
        <h1 className="font-medium text-lg">{company?.name}</h1>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Sold By:{" "}
          <p className="inline text-black">
            {company?.name}
          </p>
        </span>
      </div>
      <form action="" className="w-full xl:w-1/3 xl:h-1/2 pb-10 bg-white rounded-none xl:rounded-2xl relative">
        <div className="w-full flex justify-end px-2">
          <button onClick={()=>onClose()} type="button" className="p-2">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
          <div className="xl:hidden px-2">
            <h1 className="font-medium text-lg">{company?.name}</h1>
        <span className="text-sm font-medium text-gray-500 mt-2">
          Sold By:{" "}
          <p className="inline text-black">
            {company?.name}
          </p>
        </span>
          </div>
        <div className="flex items-center mt-10 flex-col w-full h-full space-y-4">
          <h1 className="text-lg font-medium px-2">
            Contact Seller and get details on your mobile quickly{" "}
          </h1>
          <div className="w-full flex gap-x-2 justify-center">
            <h1 className="text-xl font-medium">Mobile No</h1>
            <input
              type="number"
              className="border px-2 py-1 phone"
               pattern="^[0-9]"
              maxLength={13}
              placeholder="Enter your mobile no"
            />
          </div>
          <button className="text-xl font-medium px-6 py-2 bg-emerald-800 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function ProductLoading() {
  return (
    <div className="flex-res gap-2 w-full items-start animate-pulse">
      {/* === Product Image Skeleton === */}
      <div className="w-full max-w-[400px] aspect-square bg-gray-300 rounded" />

      {/* === Product Info Skeleton === */}
      <div className="flex flex-col w-full">
        <div className="space-y-3">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-5 w-1/2 bg-gray-300 rounded" />

          {/* Qty & Add to Cart Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-3 border px-3 py-2 rounded w-fit">
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <div className="h-5 w-5 bg-gray-300 rounded" />
            </div>
            <div className="w-52 h-10 bg-gray-400 rounded" />
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {["Colour", "Type", "Size"].map((label, idx) => (
              <React.Fragment key={idx}>
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </React.Fragment>
            ))}
          </div>

          {/* About + Features */}
          <div className="mt-6 space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <ul className="list-disc mt-2 space-y-1 pl-5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <li key={idx} className="h-3 w-3/4 bg-gray-300 rounded" />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* === Company Info Skeleton === */}
      <div className="w-full text-sm lg:w-4xl py-1">
        <div className="bg-zinc-200 py-2 px-2 pb-3 rounded space-y-3">
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
        </div>
        <div className="w-full px-2 py-4 flex flex-col items-center gap-2">
          <div className="w-40 h-10 bg-gray-300 rounded" />
          <div className="w-40 h-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
