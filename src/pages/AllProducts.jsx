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
  const { subcategoryid } = useParams();
  const { name } = useParams();

  // console.log(name);

  const [showFilterforTab, setshowFilterforTab] = useState(false);
  const [subcatname, setsubcatname] = useState("");

  const [page, setPage] = useState(1);
  const cityScrollRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const openDrawerWith = (type) => {
    setDrawerContent(type);
    setIsOpen(true);
  };

  const dispatch = useDispatch();
  const { items, loading, subcategoryLoading, hasMore } = useSelector(
    (state) => state.items
  );
  const { subCategories } = useSelector((state) => state.category);
  const { company } = useSelector((state) => state.companies);

  function handlesubcategoryname() {
    const subcat = subCategories?.find(
      (subcat) => String(subcat?._id) == String(subcategoryid)
    );

    if (subcat) {
      setsubcatname(subcat.name);
    } else {
      console.warn("Subcategory not found for:", subcategoryid);
      setsubcatname("Unknown Subcategory");
    }
  }

  useEffect(() => {
    if (subcategoryid) {
      dispatch(fetchItemsBySubCategory(subcategoryid));
      dispatch(fetchAllCompanies());
      dispatch(fetchlandingPageCategories());
    }
  }, [subcategoryid]);

  useEffect(() => {
    if (subcategoryid && subCategories?.length > 0) {
      handlesubcategoryname();
    }
  }, [subcategoryid, subCategories]);

  useEffect(() => {
    if (name) {
      dispatch(resetItems());
      setPage(1); // move page reset here
    }
  }, [name, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [name, subcategoryid]);

  useEffect(() => {
    if (name && page > 0) {
      dispatch(fetchItemsBySearch({ name, page }));
      dispatch(fetchAllCompanies());
    }
  }, [name, page, dispatch]);

  const loadMore = useMemo(
    () =>
      debounce(() => {
        setPage((prev) => prev + 1);
      }, 300),
    []
  ); // runs at most every 300ms

  useEffect(() => {
    return () => {
      loadMore.cancel();
    };
  }, []);

  const itemsObj = useMemo(() => {
    if (!items?.length || !company?.length) return [];

    return items?.map((item) => {
      const matchedCompany = company?.find((cat) => cat._id === item.companyId);

      return {
        itemId: item._id,
        companyName: matchedCompany?.name || "Unknown",
        item: item,
        // subCategories: item.subCategories?.slice(0, 9),
      };
    });
  }, [items, company]);

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
          (1000+ products available)
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
            <div className="w-full h-screen flex items-center justify-center">
              <ClipLoader size={50} />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={items?.length || 0}
              next={() => loadMore()}
              hasMore={hasMore}
              loader={
                loading ? (
                  <div className="w-full h-24 flex items-center justify-center">
                    <ClipLoader size={50} />
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
                      </div>
                    
                  </div>

                  {/* ================================== company detail ====================================== */}
                    <div className="shrink-0 h-full xl:w-xs text-lg">
                      <div className="bg-[#f1f1f1] shrink-0 py-2 px-2">
                        <Link to="#">
                          <h1 className="text-sm  font-medium underline">
                            {product.companyName}
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
                          <i className="ri-phone-fill  mr-2"></i>59% Response
                          Rate
                        </h3>
                      </div>
                      <div className="w-full bg-[#f1f1f1] px-2 py-4 flex flex-col items-center">
                        <button className="text-nowrap px-4 py-2 rounded text-lg font-medium text-emerald-700 flex items-center">
                          <i className="ri-phone-fill text-lg mr-2" />
                          View Phone Number
                        </button>
                        <button className="border-2 text-nowrap px-4 py-2 rounded text-lg font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700">
                          <i className="ri-telegram-2-fill text-lg mr-2 " />
                          Contact Supplier
                        </button>
                      </div>
                    </div>
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
