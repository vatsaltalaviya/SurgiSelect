import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const productImages = [
  {
    type: "image",
    url: "https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg",
  },
  {
    type: "image",
    url: "https://img.freepik.com/premium-photo/close-up-flowers_81048-21360.jpg",
  },
  {
    type: "image",
    url: "https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg",
  },
  {
    type: "image",
    url: "https://img.freepik.com/free-photo/group-elephants-big-green-tree-wilderness_181624-16897.jpg",
  },
  {
    type: "image",
    url: "https://img.freepik.com/premium-vector/deer-forest-river_1139419-4.jpg",
  },


];

const ProductImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasManyImages = productImages.length > 5; // You can tweak this threshold

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto px-2">
      {/* Thumbnails */}
      <div
        className={`flex ${
          hasManyImages ? "md:max-h-[35vh]" : ""
        } overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:flex-col flex-row gap-2 md:w-20`}
      >
        {productImages.map((item, index) => (
          <img
            key={index}
            src={item.url}
            alt={`thumb-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
              activeIndex === index
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border border-gray-300 rounded flex items-center justify-center max-h-[450px] min-h-[300px]">
        <PhotoProvider>
          {productImages.map((item, i) => (
            <PhotoView key={i} src={item.url}>
              {i === activeIndex && (
                <img
                  src={item.url}
                  alt={`Image-${i}`}
                  className="max-w-full max-h-[450px] object-contain cursor-zoom-in"
                />
              )}
            </PhotoView>
          ))}
        </PhotoProvider>
      </div>
    </div>
  );

};

export default ProductImage;
