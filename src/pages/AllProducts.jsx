import React, { useEffect, useMemo, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link, useParams } from "react-router-dom";
import ProductAside from "../components/ProductAside";
import TabProductAside from "../components/TabProductAside";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemsBySearch,
  fetchItemsBySubCategory,
  resetItems,
} from "../slices/items.slice";
import { fetchAllCompanies } from "../slices/company.slice";
import { ClipLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { fetchlandingPageCategories } from "../slices/Category.slice";

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Rajkot",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Ludhiana",
  "Agra",
  "Nashik",
];

const sidebardata = [
  "Related Product",
  "Filter result",
  "Related Brand",
  "Business Type",
];

const AllProducts = () => {
  const { subcategoryid, name } = useParams();

  const dispatch = useDispatch();
  const cityScrollRef = useRef(null);

  const [subcatname, setSubcatname] = useState("");
  const [selectedproductId, setSelectedproductId] = useState("");
  const [showFilterforTab, setShowFilterforTab] = useState(false);
  const [ShowContactSupplier, setShowContactSupplier] = useState(false);

  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const { items, loading, subcategoryLoading, hasMore } = useSelector(
    (state) => state.items
  );
  const { subCategories } = useSelector((state) => state.category);
  const { company } = useSelector((state) => state.companies);

  // Toggle drawer state
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const openDrawerWith = (type) => {
    setDrawerContent(type);
    setIsOpen(true);
  };

  

  // Set subcategory name from ID
  const handleSubcategoryName = () => {
    const subcat = subCategories?.find(
      (subcat) => String(subcat?._id) === String(subcategoryid)
    );

    if (subcat) {
      setSubcatname(subcat.name);
    } else {
      console.warn("Subcategory not found for:", subcategoryid);
      setSubcatname("Unknown Subcategory");
    }
  };

  // Initial data fetch based on subcategory
  useEffect(() => {
    if (subcategoryid) {
      dispatch(fetchItemsBySubCategory(subcategoryid));
      dispatch(fetchAllCompanies());
      dispatch(fetchlandingPageCategories());
    }
  }, [subcategoryid]);

  // Set subcategory name when available
  useEffect(() => {
    if (subcategoryid && subCategories?.length > 0) {
      handleSubcategoryName();
    }
  }, [subcategoryid, subCategories]);

  // Reset items when `name` changes
  useEffect(() => {
    if (name) {
      dispatch(resetItems());
      setPage(1); // reset page
    }
  }, [name, dispatch]);

  // Scroll to top when `name` or `subcategoryid` changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [name, subcategoryid]);

  // Search items when `name` and `page` change
  useEffect(() => {
    if (name && page > 0) {
      dispatch(fetchItemsBySearch({ name, page }));
      dispatch(fetchAllCompanies());
    }
  }, [name, page, dispatch]);

  // Debounced load more handler
  const loadMore = useMemo(
    () =>
      debounce(() => {
        setPage((prev) => prev + 1);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      loadMore.cancel(); // cleanup
    };
  }, []);

  // Map item and company data
  const itemsObj = useMemo(() => {
    if (!items?.length || !company?.length) return [];

    return items.map((item) => {
      const matchedCompany = company.find((cat) => cat._id === item.companyId);
      return {
        itemId: item._id,
        company: matchedCompany,
        item: item,
      };
    });
  }, [items, company]);

  // Scroll cities horizontally
  const scroll = (dir) => {
    if (cityScrollRef.current) {
      cityScrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

 

  return (
    <div className="w-full p-1 bg-[#e8eaeb] space-y-1">
      {/* Title */}
      <div className="my-2 flex flex-wrap gap-2 items-baseline">
        <h1 className="text-xl sm:text-3xl font-medium">
          {name || subcatname}
        </h1>
        <h3 className="text-sm sm:text-xl font-medium">
          ({items?.length > 1000 ? "1000" : items?.length}
          {items?.length > 1000 && "+"} products available)
        </h3>
      </div>

      {/* Filter Row */}
      <div className="bg-white w-full flex-res lg:justify-between px-2 md:px-3 py-2 rounded space-y-4 lg:space-y-0">
        {/* Input + Near Me */}
        <form className="flex-res w-full xl:w-1/2 items-center gap-2">
          <div className="relative w-full max-w-md">
            <i className="ri-map-pin-fill text-primary text-[12px] absolute top-2 left-3" />
            <input
              placeholder="Enter City"
              type="text"
              className="w-full  border border-primary text-primary pl-10 pr-10 py-2 text-[12px] rounded outline-primary"
            />
            <button className="text-primary text-[12px] absolute top-2 right-3">
              <i className="ri-search-line" />
            </button>
          </div>

          <button className="whitespace-nowrap hidden md:block px-4 py-1 bg-blue-400/30 text-primary text-sm  font-semibold rounded-full  items-center gap-1">
            <i className="ri-focus-3-line" />
            near me
          </button>
        </form>

        {/* City List with Scroll */}
        <div className="relative w-full 2xl:w-7xl mt-1 overflow-hidden">
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => scroll("left")}
              className="bg-white hidden lg:block shadow px-2 py-1 z-10"
            >
              <i className="ri-arrow-left-wide-fill ttext-sm md:text-xl" />
            </button>

            {/* Scrollable list */}
            <ul
              ref={cityScrollRef}
              className="flex flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth noscrollbar w-full"
            >
              {cities.map((city, i) => (
                <Link key={i} to="#">
                  <li className="whitespace-nowrap px-4 py-1 bg-blue-400/30 text-primary text-sm  font-semibold rounded-full hover:bg-primary hover:text-white transition">
                    {city}
                  </li>
                </Link>
              ))}
            </ul>

            {/* Next */}
            <button
              onClick={() => scroll("right")}
              className="bg-white hidden lg:block shadow px-2 py-1  z-10"
            >
              <i className="ri-arrow-right-wide-fill text-sm " />
            </button>
          </div>
        </div>

        {/* for mobile */}
      </div>
      <div className="relative block lg:hidden w-full 2xl:w-7xl my-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <ul className="flex flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth noscrollbar w-full">
            {sidebardata.map((data, i) => (
              <button key={i} onClick={() => openDrawerWith(data)}>
                <li className="whitespace-nowrap px-4 py-1 bg-blue-400/10 text-primary text-sm  font-semibold rounded-full hover:bg-primary hover:text-white transition">
                  {data}
                </li>
              </button>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Button for display aside bar */}
      <div className="relative hidden  lg:block 2xl:hidden w-fit 2xl:w-7xl my-3 overflow-hidden">
        <button
          onClick={() => setshowFilterforTab((p) => !p)}
          className="flex items-center gap-2 px-2 py-1 text-xl border rounded font-semibold"
        >
          Filter
          <i className="ri-equalizer-line font-medium"></i>
        </button>
      </div>

      {/* =================================== main content ===================================================*/}
      <div className="w-full relative flex flex-col md:flex-row gap-2 items-start">
        {/* left side */}
        <ProductAside />

        <div className="relative">
          <TabProductAside show={showFilterforTab} />
        </div>

        <div className="flex flex-col space-y-3 w-full">
          {subcategoryid && subcategoryLoading ? (
            <div className="w-full h-screen flex flex-col items-center justify-center">
              <Loading />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={items?.length || 0}
              next={() => loadMore()}
              hasMore={hasMore}
              loader={
                loading ? (
                  <div className="w-full flex flex-col items-center justify-center">
                    <Loading />
                  </div>
                ) : null
              }
              scrollThreshold={0.95} // 95% scroll
            >
              {itemsObj?.map((product, i) => (
                <section
                  key={i}
                  className="w-full bg-white rounded shadow flex-col lg:flex-row flex mt-1 gap-2"
                >
                  <div className="flex flex-col md:flex-row w-full">
                    {/* Left - Image */}
                    <div className="md:w-[300px] md:h-[200px] p-2 flex-shrink-0">
                      <PhotoProvider>
                        <PhotoView src={product.item.logoImage}>
                          <img
                            src={product.item.logoImage}
                            alt={product.item.title}
                            className="w-full h-full object-contain cursor-zoom-in rounded"
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </div>

                    {/* =========================================== Right - Info ========================= */}

                    <div className="flex flex-col py-2 justify-between w-full">
                      <div className="w-full ">
                        <Link
                          to={`/productdetail/${product.item._id}`}
                          className="text-[16px]  font-semibold text-primary hover:text-red-500 "
                        >
                          <p className="text-wrap px-1.5">
                            {product.item.name}
                          </p>
                        </Link>

                        <div className="text-lg font-bold px-2 mt-1 text-zinc-800">
                          ₹ {product.item.sellingPrice}
                          <span className="text-sm  font-normal text-gray-600 ml-1">
                            /Piece
                          </span>
                          <button className="bg-white border mx-2 text-primary px-2 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-150">
                            Get Latest Price
                          </button>
                        </div>

                        <table className="text-sm  mt-2 text-gray-700">
                          <tbody>
                            <tr>
                              <td className="pr-2 px-2 md:w-32 font-medium text-black">
                                Colour:
                              </td>
                              <td>{product.item.color}</td>
                            </tr>
                            <tr>
                              <td className="pr-2 px-2 md:w-32 font-medium text-black">
                                Size:
                              </td>
                              <td>{product.item.size}</td>
                            </tr>
                            <tr>
                              <td className="pr-2 px-2 md:w-32 font-medium text-black">
                                Type:
                              </td>
                              <td>{product.item.type}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {product.item.quantity == 0 ? (
                        <span className="px-4 py-2 font-semibold bg-red-500 text-white w-fit my-4 rounded-lg">
                          Out Of Stock
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {/* ================================== company detail ====================================== */}
                  <div className="shrink-0 h-full xl:w-xs text-lg">
                    <div className="bg-[#f1f1f1] shrink-0 py-2 px-2">
                      <Link to={`/companyprofile/${product.item.companyId}`}>
                        <h1 className="text-sm  font-medium underline">
                          {product.company.name}
                        </h1>
                      </Link>
                      <h3>
                        <i className="ri-map-pin-fill text-sm  mr-2"></i>
                        <span className="text-sm ">
                          Chandni Chowk, New Delhi
                        </span>
                      </h3>
                      <h3 className="space-x-1">
                        <i className="ri-checkbox-circle-fill text-sm  mr-2"></i>
                        <span className="text-sm ">GST</span>
                        <i className="ri-verified-badge-fill text-sm  ml-0.5"></i>
                        <span className="text-amber-500 text-lg ">
                          <span className="text-sm ">TrustSEAL Verified</span>
                        </span>
                        <i className="ri-user-3-line"></i>
                        <span className="text-sm ">18 Yrs</span>
                      </h3>
                      <h3 className="space-x-1 text-sm">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <i key={idx} className="ri-star-fill"></i>
                        ))}
                        <i className="ri-star-half-fill"></i>
                        <span className="ml-2 font-medium text-gray-800">
                          3.7
                        </span>
                        <a
                          href="#"
                          className="text-sm text-blue-600 underline ml-1"
                        >
                          (358)
                        </a>
                      </h3>
                      <h3 className="space-x-1 text-sm">
                        <i className="ri-phone-fill  mr-2"></i>59% Response Rate
                      </h3>
                    </div>
                    <div className="w-full bg-[#f1f1f1] px-2 py-4 flex flex-col items-center">
                      <button
                        onClick={() => setSelectedproductId(product.item._id)}
                        className="text-nowrap px-4 py-2 rounded text-lg font-medium text-emerald-700 flex items-center"
                      >
                        <i className="ri-phone-fill text-lg mr-2" />
                        {selectedproductId == product.item._id
                          ? product.company.number
                          : "View Phone Number"}
                      </button>
                      <button onClick={()=>setShowContactSupplier(true)} className="border-2 text-nowrap px-4 py-2 rounded text-lg font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700">
                        <i className="ri-telegram-2-fill text-lg mr-2 " />
                        Contact Supplier
                      </button>
                    </div>
                  </div>
                  {ShowContactSupplier &&<ContactSuplier onClose={()=>setShowContactSupplier(false)} company={product.company} />}
                </section>
              ))}
            </InfiniteScroll>
          )}
        </div>

        {/* ====================================== Drawer =============================================== */}
        <div className="lg:hidden">
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="bottom"
            className="w-full px-2 py-2 lg:hidden"
          >
            <div className="min-h-[200px] max-h-[75vh] overflow-y-auto">
              {drawerContent === "Related Product" && (
                <div className="w-full">
                  <div className="bg-white rounded px-2 py-3 text-wrap">
                    <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium">
                      Related Category
                    </h1>

                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="space-x-1 py-1 border-y border-gray-400/30 flex items-center"
                      >
                        <div className="w-16">
                          <PhotoProvider>
                            <PhotoView src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg">
                              <img
                                src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg"
                                alt={`Image`}
                                className="max-w-full max-h-full object-contain cursor-zoom-in"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                        <div className="text-lg font-medium w-2/3 break-words">
                          <Link className="hover:underline">
                            Fingerprint Devices
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {drawerContent === "Filter result" && (
                <div className="w-full">
                  <div className="bg-white rounded px-2 py-1">
                    <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
                      Filter Result
                    </h1>
                    <form className="w-full">
                      <div className="py-2">
                        <input
                          className="form-checkbox h-5 w-5 mx-2 text-primary"
                          type="checkbox"
                          name=""
                          id=""
                        />
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          Your city
                        </Link>
                      </div>
                      <div className="py-2">
                        <input
                          className="form-checkbox h-5 w-5 mx-2 text-primary"
                          type="checkbox"
                          name=""
                          id=""
                        />
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          Video
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {drawerContent === "Related Brand" && (
                <div className="w-full">
                  <div className="bg-white rounded px-2 py-1 text-wrap">
                    <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
                      Related Brands
                    </h1>

                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="space-x-1 py-1 border-y border-gray-400/30 flex items-center"
                      >
                        <div className="w-1/3">
                          <PhotoProvider>
                            <PhotoView src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg">
                              <img
                                src="https://3.imimg.com/data3/PM/GF/GLADMIN-80324/fingerprint-device-125x125.jpg"
                                alt={`Image`}
                                className="max-w-full max-h-full object-contain cursor-zoom-in"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                        <div className="text-xl font-medium w-2/3 break-words">
                          <Link className="hover:underline ">
                            Fingerprint Devices
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {drawerContent === "Business Type" && (
                <div className="w-full">
                  <div className="bg-white rounded px-2 py-1">
                    <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
                      Business Type
                    </h1>
                    <div className="w-full">
                      <div className="py-1 px-2">
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          Menufacture
                        </Link>
                      </div>
                      <div className="py-1 px-2">
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          Retailer
                        </Link>
                      </div>
                      <div className="py-1 px-2">
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          WholeSeller/Distributer
                        </Link>
                      </div>
                      <div className="py-1 px-2">
                        <Link
                          className="text-xl font-medium hover:underline"
                          to="#"
                        >
                          Expoter
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Drawer>
        </div>

        {/* right side */}
        {/* <div className="w-92 hidden 2xl:block">
          <ProductAside />
          </div> */}

      </div>
    </div>
  );
};

export default AllProducts;

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

function Loading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="bg-white w-full h-full"><section
          key={i}
          className="w-full bg-white rounded shadow flex-col lg:flex-row flex mt-1 gap-2 animate-pulse"
        >
          {/* === Main Product Block === */}
          <div className="flex flex-col md:flex-row w-full">
            {/* Left - Image Skeleton */}
            <div className="md:w-[300px] md:h-[200px] p-2 flex-shrink-0">
              <div className="w-full h-full bg-gray-300 rounded object-contain" />
            </div>

            {/* Right - Product Info Skeleton */}
            <div className="flex flex-col py-2 justify-between w-full px-2">
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded" />
                <div className="h-6 w-1/2 bg-gray-300 rounded" />

                <div className="h-4 w-20 bg-gray-300 rounded mt-2" />

                <table className="text-sm mt-2 w-full">
                  <tbody className="space-y-2">
                    {["Colour", "Size", "Type"].map((label, idx) => (
                      <tr key={idx}>
                        <td className="pr-2 py-1 w-32 font-medium text-black">
                          <div className="h-4 w-3/4 bg-gray-300 rounded" />
                        </td>
                        <td>
                          <div className="h-4 w-1/2 bg-gray-300 rounded" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* === Company Detail Skeleton === */}
          <div className="shrink-0 h-full xl:w-xs text-lg">
            <div className="bg-[#f1f1f1] py-2 px-2 space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-2/3 bg-gray-300 rounded" />
              <div className="h-4 w-full bg-gray-300 rounded" />
              <div className="h-4 w-[80%] bg-gray-300 rounded" />
              <div className="h-4 w-[60%] bg-gray-300 rounded" />
            </div>
            <div className="w-full bg-[#f1f1f1] px-2 py-4 flex flex-col items-center gap-2">
              <div className="h-10 w-40 bg-gray-300 rounded" />
              <div className="h-10 w-40 bg-gray-300 rounded" />
            </div>
          </div>
        </section></div>
      ))}
    </>
  );
}
