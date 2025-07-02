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
  const [subcatname, setsubcatname] = useState('');

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
    const { subCategories } = useSelector(
      (state) => state.category
    );
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
    <div className="w-full p-1 md:p-4 bg-gray-100 space-y-1">
      {/* Title */}
      <div className="my-4 flex flex-wrap gap-2 items-baseline">
        <h1 className="text-3xl sm:text-5xl font-medium">
          {name || subcatname}
        </h1>
        <h3 className="text-lg sm:text-xl font-medium">
          (1000+ products available)
        </h3>
      </div>

      {/* Filter Row */}
      <div className="bg-white w-full flex-res lg:justify-between px-2 md:px-5 py-4 rounded space-y-4 lg:space-y-0">
        {/* Input + Near Me */}
        <form className="flex-res w-full xl:w-1/2 items-center gap-2">
          <div className="relative w-full max-w-md">
            <i className="ri-map-pin-fill text-primary text-sm md:text-xl absolute top-2 left-3" />
            <input
              placeholder="Enter City"
              type="text"
              className="w-full  border border-primary text-primary pl-10 pr-10 py-2 text-sm md:text-xl rounded outline-primary"
            />
            <button className="text-primary text-sm md:text-xl absolute top-2 right-3">
              <i className="ri-search-line" />
            </button>
          </div>

          <button className="whitespace-nowrap hidden md:block px-4 py-1 bg-blue-400/30 text-primary text-sm md:text-xl font-semibold rounded-full  items-center gap-1">
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
                  <li className="whitespace-nowrap px-4 py-1 bg-blue-400/30 text-primary text-sm md:text-xl font-semibold rounded-full hover:bg-primary hover:text-white transition">
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
              <i className="ri-arrow-right-wide-fill text-sm md:text-xl" />
            </button>
          </div>
        </div>

        {/* for mobile */}
      </div>
      <div className="relative block xl:hidden w-full 2xl:w-7xl my-3 overflow-hidden">
        <div className="flex items-center gap-2">
          <ul className="flex flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth noscrollbar w-full">
            {sidebardata.map((data, i) => (
              <button key={i} onClick={() => openDrawerWith(data)}>
                <li className="whitespace-nowrap px-4 py-1 bg-blue-400/10 text-primary text-sm md:text-xl font-semibold rounded-full hover:bg-primary hover:text-white transition">
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
          className="flex items-center gap-2 px-2 py-1 text-3xl border rounded font-semibold"
        >
          Filter
          <i className="ri-equalizer-line font-medium"></i>
        </button>
      </div>

      {/* main content */}
      <div className="w-full relative flex flex-col md:flex-row gap-2 items-start">
        {/* left side */}
        <ProductAside />

        <div className="relative">
          <TabProductAside show={showFilterforTab} />
        </div>

        <div className="flex flex-col gap-2 w-full flex-grow">
          <InfiniteScroll
            dataLength={items?.length || 0}
            next={() => loadMore()}
            hasMore={hasMore}
            loader={
              !subcategoryLoading && loading ? (
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
                className="w-full lg:flex-1 bg-white p-4 rounded shadow flex-col lg:flex-row flex gap-4"
              >
                {/* Left - Image */}
                <div className="md:w-[350px] md:h-[250px]  flex-shrink-0">
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

                {/* Right - Info */}
                <div className="flex flex-col 2xl:flex-row w-full">
                  <div className="flex flex-col justify-between w-full">
                    <div className="w-full xl:w-2xl">
                      <Link
                        to={`/productdetail/${product.item._id}`}
                        className="text-lg xl:text-2xl font-semibold text-primary hover:text-red-500 "
                      >
                        <p className="text-wrap xl:w-full text-justify px-1.5">
                          {product.item.name}
                        </p>
                      </Link>

                      <div className="text-lg lg:text-xl font-bold mt-1 text-zinc-800">
                        ₹ {product.item.sellingPrice}
                        <span className="text-sm lg:text-xl font-normal text-gray-600 ml-1">
                          /Piece
                        </span>
                        <button className="bg-white border mx-2 text-primary px-4 py-2 rounded-full text-sm lg:text-xl hover:bg-primary hover:text-white transition-all duration-150">
                          Get Latest Price
                        </button>
                      </div>

                      <table className="text-sm lg:text-lg mt-2 text-gray-700">
                        <tbody>
                          <tr>
                            <td className="pr-2 md:w-52 font-medium text-black">
                              Colour:
                            </td>
                            <td>{product.item.color}</td>
                          </tr>
                          <tr>
                            <td className="pr-2 md:w-52 font-medium text-black">
                              Size:
                            </td>
                            <td>{product.item.size}</td>
                          </tr>
                          <tr>
                            <td className="pr-2 md:w-52 font-medium text-black">
                              Type:
                            </td>
                            <td>{product.item.type}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="w-full h-full text-lg py-1">
                    <div className="bg-zinc-200 py-2 px-2 pb-3 rounded ">
                      <Link to="#">
                        <h1 className="text-sm lg:text-lg font-medium underline">
                          {product.companyName}
                        </h1>
                      </Link>
                      <h3>
                        <i className="ri-map-pin-fill text-sm lg:text-lg mr-2"></i>
                        <span className="text-sm lg:text-lg">
                          {" "}
                          Chandni Chowk, New Delhi
                        </span>
                      </h3>
                      <h3 className="space-x-1">
                        <i className="ri-checkbox-circle-fill text-sm lg:text-lg mr-2"></i>
                        <span className="text-sm lg:text-lg">GST</span>
                        <i className="ri-verified-badge-fill text-sm lg:text-lg ml-0.5"></i>
                        <span className="text-amber-500 text-lg lg:text-xl">
                          <span className="text-sm lg:text-lg">
                            TrustSEAL Verified
                          </span>
                        </span>
                        <i className="ri-user-3-line"></i>
                        <span className="text-sm lg:text-xl">18 Yrs</span>
                      </h3>
                      <h3 className="space-x-1">
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
                      <h3 className="space-x-1">
                        <i className="ri-phone-fill text-xl mr-2"></i>59%
                        Response Rate
                      </h3>
                    </div>
                    <div className="w-full bg-zinc-200 px-2 py-4 flex flex-col items-center">
                      <button className=" px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center">
                        <i className="ri-phone-fill text-lg lg:text-4xl mr-2" />
                        View Phone Number
                      </button>
                      <button className="border-2 px-4 py-2 rounded text-xl font-medium text-emerald-700 flex items-center hover:text-white hover:bg-emerald-700">
                        <i className="ri-telegram-2-fill text-lg lg:text-4xl mr-2 " />
                        Contact Supplier
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </InfiniteScroll>
        </div>
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
                  <div className="bg-white rounded px-2 py-1 text-wrap">
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
                <div>Showing filters here...</div>
              )}
              {drawerContent === "Related Brand" && (
                <div>Showing brands related...</div>
              )}
              {drawerContent === "Business Type" && (
                <div>Showing business types...</div>
              )}
            </div>
          </Drawer>
        </div>

        {/* right side */}
      </div>
    </div>
  );
};

export default AllProducts;
