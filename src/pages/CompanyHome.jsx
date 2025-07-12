import React, { useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import balance from "../assets/balance.png";
import building from "../assets/building.png";
import employee from "../assets/employee.png";
import report from "../assets/report.png";
import savemoney from "../assets/save-money.png";
import save from "../assets/save.png";
import transport from "../assets/transport.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemByCompanyForHomePage } from "../slices/items.slice";

const CompanyHome = ({id,categoryData,categoryloading}) => {
  const dispatch = useDispatch()
  const { Companyitems, loading } = useSelector((state) => state.items);
  const sliderData = useMemo(()=>{
    return Companyitems?.map((data)=>({
      image:data.logoImage,
      title:data.name,
      id:data._id
    }))
  },[Companyitems])

  const companyInfo = [
    {
      img: savemoney,
      title: "Nature of Business",
      subtitle:"NA"
    },
    {
      img: balance,
      title: "Legal Status of Firm",
      subtitle:"Limited Company"
    },
    {
      img: report,
      title: "Annual Turnover",
      subtitle:"0-40L"
    },
    {
      img: building,
      title: "GST Registration Date",
      subtitle:"31-10-2023"
    },
    {
      img: employee,
      title: "Total Number of Employees",
      subtitle:"26 to 50 People"
    },
    {
      img: transport,
      title: "Import Export Code (IEC)",
      subtitle:"AAFCF5296B"
    },
    {
      img: save,
      title: "GST Number",
      subtitle:"24AAFCF5296B1ZS"
    },
   
  ];
  const products = [
  {
    title: "Surgical Mesh",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/349654925/MF/FR/XA/199582225/lotus-pro-visc-3d-composite-dual-sided-mesh-jpg-webp-250x250.webp",
    details: [
      "Lotus 3d Provisc Ipom Hernia Mesh",
      "Lotus 3d Provisc Mesh, 10cm x 15cm",
      "Prolene Non Absorbable Synthetic Surgical Mesh",
    ],
    link: "/surgical-mesh",
  },
  {
    title: "Surgical Instruments",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358375716/VA/GE/VG/199582225/covidien-parietex-mesh-umbilical-hernia-250x250.jpg",
    details: [
      "20cm Parietex Optimized Composite Hernia Mesh",
      "Covidien Absorbatack Fixation Device",
      "Absorbable Tacker, Fixation Device",
    ],
    link: "/surgical-instruments",
  },
  {
    title: "Absorbable Sutures",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/4/410061715/BO/TG/WY/199582225/covidien-gl-223-braided-absorbable-suture-250x250.png",
    details: [
      "Covidien GL-223 Braided Absorbable Suture",
      "Lotus LNW 2347-910 Absorbable Suture",
      "Lotus LNW 2317-910 Absorbable Suture",
    ],
    link: "/absorbable-sutures",
  },
  {
    title: "Surgical Mesh",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/349654925/MF/FR/XA/199582225/lotus-pro-visc-3d-composite-dual-sided-mesh-jpg-webp-250x250.webp",
    details: [
      "Lotus 3d Provisc Ipom Hernia Mesh",
      "Lotus 3d Provisc Mesh, 10cm x 15cm",
      "Prolene Non Absorbable Synthetic Surgical Mesh",
    ],
    link: "/surgical-mesh",
  },
  {
    title: "Surgical Instruments",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/11/358375716/VA/GE/VG/199582225/covidien-parietex-mesh-umbilical-hernia-250x250.jpg",
    details: [
      "20cm Parietex Optimized Composite Hernia Mesh",
      "Covidien Absorbatack Fixation Device",
      "Absorbable Tacker, Fixation Device",
    ],
    link: "/surgical-instruments",
  },
  {
    title: "Absorbable Sutures",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/4/410061715/BO/TG/WY/199582225/covidien-gl-223-braided-absorbable-suture-250x250.png",
    details: [
      "Covidien GL-223 Braided Absorbable Suture",
      "Lotus LNW 2347-910 Absorbable Suture",
      "Lotus LNW 2317-910 Absorbable Suture",
    ],
    link: "/absorbable-sutures",
  },
  {
    title: "Absorbable Sutures",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/4/410061715/BO/TG/WY/199582225/covidien-gl-223-braided-absorbable-suture-250x250.png",
    details: [
      "Covidien GL-223 Braided Absorbable Suture",
      "Lotus LNW 2347-910 Absorbable Suture",
      "Lotus LNW 2317-910 Absorbable Suture",
    ],
    link: "/absorbable-sutures",
  },
  // Add more products here...
];
  const sliderRef = useRef();

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
     autoplay: true,
    slidesToShow: 3, // default for desktop
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    beforeChange: (oldIndex, newIndex) => {
      const slides = document.querySelectorAll(".slick-slide");
      slides.forEach((slide) => {
        if (slide.classList.contains("slick-active")) {
          slide.removeAttribute("inert");
        } else {
          slide.setAttribute("inert", "");
        }
      });
    },
    responsive: [
      {
        breakpoint: 1024, // below 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // below 640px (mobile)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
   dispatch(fetchItemByCompanyForHomePage(id))
  }, []);

  console.log("from home",categoryData);
  

  useEffect(() => {
    // Initial inert application
    const slides = document.querySelectorAll(".slick-slide");
    slides.forEach((slide) => {
      if (!slide.classList.contains("slick-active")) {
        slide.setAttribute("inert", "");
      }
    });
  }, []);

  return (
    <div className="w-full md:px-2 py-2">
      {loading ?<SliderLoading />:<div className="min-w-[350px] lg:px-2 py-2">
        <Slider ref={sliderRef} {...settings}>
          {sliderData.map((data, i) => (
            <div
              key={i}
              className="w-full max-w-[400px] sm:max-w-[450px] mx-auto h-[250px] sm:h-[280px] md:h-[300px] relative overflow-hidden"
            >
              <img
                className="w-full h-full object-contain"
                src={data.image}
                alt={data.title}
              />
              <div className="w-full h-36 absolute tansform translate-y-26 bottom-10 lg:bottom-3 hover:bottom-20 transition-all duration-300 bg-black/55 px-2 py-1 text-white">
                <h1 className="text-sm lg:text-lg font-medium text-center hover:underline cursor-pointer line-clamp-1">
                  {data.title}
                </h1>
                <button className="mx-auto hidden px-4 lg:block w-fit bg-white rounded text-emerald-800 font-medium text-lg my-8 lg:mt-8">
                  Get Best Quote
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>}

      <div className="w-full md:px-2 py-2">
        <h1 className="text-2xl font-medium text-center py-2">About Us</h1>
        <p className="text-xs md:text-lg font-medium md:text-center">
          Fuerte Healthcare Private Limited - Wholesale Trader of surgical mesh,
          surgical instruments & absorbable sutures since 2023 in Rajkot,
          Gujarat.
        </p>

        <div className="flex flex-wrap w-full md:gap-x-6 lg:justify-center py-6">

          {companyInfo.map((d,i)=><div key={i} className="flex items-center gap-2 py-2 justify-center md:px-2">
            <img className="w-10 md:w-16 h-10 md:h-16 rounded" src={d.img} alt="" />
            <div className="px-2">
              <h1 className="text-sm md:text-lg font-semibold">{d.title}</h1>
              <p className="text-xs md:text-sm font-medium">{d.subtitle}</p>
            </div>
          </div>)}
        
        </div>

      </div>

    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Products <span className="font-normal">&</span> Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryData && categoryData?.map((product, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-md text-center bg-white hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-contain mb-4"
            />
            <h3 className="text-blue-900 text-lg font-bold mb-2">
              {product.name}
            </h3>
            <ul className="text-sm text-gray-700 mb-3 space-y-1">
              {product.items.slice(0,4).map((line, i) => (
                <li key={i} className="hover:font-medium cursor-pointer line-clamp-1">{line.name}</li>
              ))}
            </ul>
            <a
              href={product.link}
              className="text-green-600 font-semibold text-sm inline-flex items-center hover:underline"
            >
              View Details
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default CompanyHome;

function SliderLoading(){
  return <div className="min-w-[350px] lg:px-2 py-2 animate-pulse">
  <div className="flex overflow-x-auto gap-4 px-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="w-full max-w-[400px] sm:max-w-[450px] mx-auto h-[250px] sm:h-[280px] md:h-[300px] relative overflow-hidden rounded bg-gray-200"
      >
        <div className="w-full h-full bg-gray-300"></div>
        <div className="absolute bottom-10 lg:bottom-3 w-full px-2 py-1">
          <div className="h-5 bg-gray-400 w-3/4 mx-auto rounded mb-3"></div>
          <div className="h-10 bg-gray-300 w-1/2 mx-auto rounded hidden lg:block"></div>
        </div>
      </div>
    ))}
  </div>
</div>

}
