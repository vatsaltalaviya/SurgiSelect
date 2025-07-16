import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Slider from "react-slick";

const CompanyAbout = ({company}) => {
  const image = [
    "https://5.imimg.com/data5/SELLER/Default/2024/4/410227417/DP/JJ/AN/199582225/untitled-1000x1000.png",
    "https://5.imimg.com/data5/SELLER/Default/2024/4/410227994/SL/HI/II/199582225/untitled-1000x1000.png",
    "https://5.imimg.com/data5/SELLER/Default/2024/4/410228646/ZD/XN/OR/199582225/untitled-1000x1000.png",
  ];
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full px-2 py-1">
      {/* <div className="w-full 2xl:max-w-5xl relative sm:px-1 px-2 mx-auto my-2">
        <Slider {...settings}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] max-w-[180px] w-full sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] border mx-2 lack/20 rounded shadow-sm text-center bg-white flex-shrink-0 p-2"
            >
              <img
                src="https://5.imimg.com/data5/SELLER/Default/2023/10/349738829/WT/QY/YV/199582225/lotus-prolus-7-6-x-15cm-mesh-lotus-prolene-mesh-500x500.jpg"
                alt="Lotus 3d Provisc Ipom Hernia Mesh"
                className="w-full h-24 sm:h-28 md:h-32 object-contain mb-2"
              />
              <h2 className="text-xs sm:text-sm font-medium text-blue-800 hover:underline line-clamp-2">
                Lotus 3d Provisc Ipom Hernia Mesh
              </h2>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                ₹ 16,999
                <span className="text-xs text-gray-500 ml-1">/Piece</span>
              </p>
            </div>
          ))}
        </Slider>
      </div> */}

      <div className="w-full px-2 mt-8">
        <h1 className="text-xl font-semibold">
          {company?.name}
        </h1>
        <p className="text-lg font-medium">Company Album</p>

        <PhotoProvider>
          <div className="flex flex-col xl:flex-row items-center gap-4 py-4">
            {image.map((img, i) => (
              <PhotoView key={i} src={img}>
                <img
                  src={img}
                  alt={`product-${i}`}
                  className="w-full max-w-md object-cover rounded cursor-zoom-in shadow"
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      </div>

      <div className="max-w-full mx-auto p-4 bg-white rounded shadow-sm">
  <h2 className="text-2xl font-semibold mb-6">Factsheet</h2>

  {/* Basic Information */}
  <h3 className="text-lg font-medium mb-3">Basic Information</h3>
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <tbody>
        {[
          ["Nature of Business", "NA"],
          [
            "Additional Business",
            <>
              Supplier of Services<br />
              Retail Business<br />
              Export
            </>
          ],
          ["Company CEO", "Abhishek Kumar"],
          ["Total Number of Employees", "26 to 50 People"],
          ["GST Registration Date", "31-10-2023"],
          ["Legal Status of Firm", "Limited Company"],
          ["Annual Turnover", "0 - 40 L"],
          [
            "GST Partner Name",
            <>
              Aditya Prakash<br />
              Mohit Ahuja<br />
              Abhishek Kumar
            </>
          ],
        ].map(([label, value], index) => (
          <tr key={index} className="align-top">
            <th className="py-2 pr-4 text-gray-600 font-medium w-64 ">
              {label}
            </th>
            <td className="py-2 text-gray-800 whitespace-nowrap">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Statutory Profile */}
  <h3 className="text-lg font-medium mt-6 mb-3">Statutory Profile</h3>
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <tbody>
        {[
          ["Import Export Code (IEC)", "AAFCF5296B"],
          ["GST No.", company?.gstNumber],
          ["CIN No.", company?.cinNumber],
        ].map(([label, value], index) => (
          <tr key={index} className="align-top">
            <th className="py-2 pr-4 text-gray-600 font-medium w-64 ">
              {label}
            </th>
            <td className="py-2 text-gray-800 whitespace-nowrap">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default CompanyAbout;
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-10 top-1/2 -right-1 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300  rounded-full shadow cursor-pointer"
      onClick={onClick}
    >
      <i className="ri-arrow-right-s-line text-xl" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-10 top-1/2 -left-1 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300  rounded-full shadow cursor-pointer"
      onClick={onClick}
    >
      <i className="ri-arrow-left-s-line text-xl" />
    </div>
  );
};
