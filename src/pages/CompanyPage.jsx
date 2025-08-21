import React, { useState ,useEffect } from "react";
import CompanyHome from "./CompanyHome";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CompanyProduct from "./CompanyProduct";
import CompanyAbout from "./CompanyAbout";
import CompanyConatct from "./CompanyConatct";
import { fetchCompanyById } from "../slices/company.slice";
import { fetchlandingPageCategoriesforCompany } from "../slices/Category.slice";

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [productID, setproductID] = useState(null)
  const [productDisplay, setproductDisplay] = useState(false)
  const { id } = useParams();
  const tabs = [
    { label: "Home", value: "home" },
    { label: "Products & Services ", value: "product" },
    { label: "About ", value: "about" },
    { label: "Contact ", value: "contact" },
  ];
  const dispatch = useDispatch()
  const { company , loading } = useSelector((state) => state.companies);
  const { categories } = useSelector(
      (state) => state.category
    );
    
    useEffect(() => {
      dispatch(fetchCompanyById(id))
      dispatch(fetchlandingPageCategoriesforCompany(id))
    }, [])
    
    
  

  return (
    <div className="w-full  ">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full px-4 py-2 ">
          {loading?<CompanyLoading />:<><h1 className="text-lg flex flex-col lg:text-3xl font-medium">
            {company?.companyName}
          </h1>
          <div className="flex flex-col lg:flex-row gap-x-4 lg:items-center w-full">
            <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-map-pin-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">{company?.address}{company?.city&& ","+company?.city}</h1>
            </div>
            {company?.gstNumber && <div className="py-1 flex shrink-0 items-center gap-2">
              <i className="ri-verified-badge-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">GST - {company?.gstNumber}</h1>
            </div>}
            <div className="py-1 flex shrink-0 items-center gap-2">
              <div className="space-y-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <i key={idx} className="ri-star-fill"></i>
                ))}
                <i className="ri-star-half-fill"></i>
              </div>
              <h1 className="text-xs md:text-sm font-medium">
                3.7
                <a href="#" className="text-xs md:text-sm text-blue-600 underline">
                  (358)
                </a>
              </h1>
            </div>

            <div className="py-1 flex shrink-0 items-center gap-1">
              <i className="ri-phone-fill"></i>
              <h1 className="text-xs md:text-sm font-medium">59% Response Rate</h1>
            </div>
          </div></>}

          {/* ======================= tab buttons ======================= */}
          <div className="w-full flex flex-wrap">
            {tabs.map((tab, i) => (
              <div
                key={tab.value}
                className={`relative flex ${i === 1 ? "group" : ""}`}
              >
                <button
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
                    activeTab === tab.value
                      ? "border-blue-600 text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>

                {/* Hover content */}
                {i === 1 && (
                  <div className="absolute min-w-6xl top-10 flex-wrap gap-3 left-0 text-base font-medium text-gray-600 z-20 hidden group-hover:flex bg-white p-2 rounded shadow">
                   {categories?.slice(0,10)?.map((data,i)=> <div key={i} className="px-2 space-y-1 shrink-0">
                      <Link onClick={()=>{
                        setproductDisplay(true)
                        setproductID(data.slug)
                        setActiveTab('product')
                      }} to="#"><h1 className="text-lg font-medium text-primary">{data.name}</h1></Link>
                      {data?.items?.map((d , i)=><Link  key={i} to="#"><h1 onClick={()=>{
                        setproductDisplay(true)
                        setproductID(d.subCategory)
                        setActiveTab('product')
                      }} className="text-sm w-52 line-clamp-2 mt-2 font-medium text-zinc-800">{d.name}</h1></Link>)}

                    </div>)}
                    <button onClick={()=>{
                        setproductDisplay(true)
                        setActiveTab('product')}} className="underline px-4">View More</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



        {/* =========================== View phone number =========================== */}
        {/* <div className="shrink-0 px-2 py-4 flex flex-col items-center">
          <button className=" px-4 py-2 rounded text-sm font-medium border text-emerald-700 flex items-center">
            <i className="ri-phone-fill text-xl mr-2" />
            View Phone Number
          </button>
          <button className="border-2 px-7 py-2 rounded text-sm font-medium flex items-center text-white bg-emerald-700">
            <i className="ri-telegram-2-fill text-xl mr-2 " />
            Contact Supplier
          </button>
        </div> */}
      </div>

      <div className="mt-4 sm:mt-6 w-full sm:px-0">
        {activeTab === "home" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">Home</h2>
            <CompanyHome id={id} setId={(e)=>{setproductID(e)}} setTab={()=>setActiveTab('product')} showproducts={(e)=>setproductDisplay(e)} categoryData={categories} categoryloading={loading} company={company}/>
          </div>
        )}
        {activeTab === "product" && (
          <div className="md:px-6 relative px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">
              Product and services
            </h2>
            <CompanyProduct getId={productID} getProductDisplay={productDisplay} setTab={()=>setActiveTab('product')} setId={(e)=>{setproductID(e)}} showproducts={(e)=>setproductDisplay(e)} categoryData={categories} categoryloading={loading} />
          </div>
        )}
        {activeTab === "about" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">About</h2>
            <CompanyAbout company={company} companyloading={loading} />
            
          </div>
        )}
        {activeTab === "contact" && (
          <div className="md:px-6 px-2">
            <h2 className="text-base sm:text-lg font-bold mb-2">Contact</h2>
            <CompanyConatct />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;

function CompanyLoading (){
return <div className="animate-pulse w-full">
  {/* Company name */}
  <h1 className="text-lg flex flex-col lg:text-3xl font-medium">
    <div className="h-6 lg:h-8 bg-gray-300 rounded w-3/4"></div>
  </h1>

  {/* Info row */}
  <div className="flex flex-col lg:flex-row gap-x-4 lg:items-center w-full mt-2">
    
    {/* Location */}
    <div className="py-1 flex shrink-0 items-center gap-2">
      <i className="ri-map-pin-fill text-gray-400"></i>
      <div className="h-4 bg-gray-300 rounded w-40"></div>
    </div>

    {/* GST */}
    <div className="py-1 flex shrink-0 items-center gap-2">
      <i className="ri-verified-badge-fill text-gray-400"></i>
      <div className="h-4 bg-gray-300 rounded w-44"></div>
    </div>

    {/* Ratings */}
    <div className="py-1 flex shrink-0 items-center gap-2">
      <div className="flex gap-1 text-gray-300">
        {Array.from({ length: 5 }).map((_, idx) => (
          <i key={idx} className="ri-star-fill"></i>
        ))}
      </div>
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>

    {/* Response Rate */}
    <div className="py-1 flex shrink-0 items-center gap-1">
      <i className="ri-phone-fill text-gray-400"></i>
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </div>
  </div>
</div>

}
