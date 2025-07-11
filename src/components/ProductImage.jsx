import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ProductImage = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasManyImages = images.length > 5; // You can tweak this threshold

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:w-6xl mx-auto px-2">
      {/* Thumbnails */}
      <div
        className={`flex ${
          hasManyImages ? "md:max-h-[35vh]" : ""
        } overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:flex-col flex-row gap-2 md:w-20`}
      >
        {images.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`thumb-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`w-14 h-14 object-cover rounded cursor-pointer border-2 ${
              activeIndex === index
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border overflow-hidden border-gray-300 rounded flex items-center justify-center max-w-[350px] max-h-[50px] min-h-[350px]">
        <PhotoProvider>
          {images.map((item, i) => (
            <PhotoView key={i} src={item}>
              {i === activeIndex && (
                <img
                  src={item}
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
