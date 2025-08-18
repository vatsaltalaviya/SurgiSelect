import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Link } from 'react-router-dom'

const ProductAside = ({brands}) => {
  return (
    <aside
          className="space-y-1 xl:w-[16em] hidden shrink-0 2xl:block sticky top-4 self-start max-h-[80vh] overflow-y-auto pr-2 noscrollbar"
        >
          

          {/* related Brand */}
          <div className="bg-white rounded px-2 py-1 max-h-[50vh] overflow-auto noscrollbar text-wrap">
            <h1 className="text-xs bg-gray-400/30 px-2 py-1 font-medium ">
              Related Brands
            </h1>

            {brands?.map((item) => (
              <div
                key={item._id}
                className="space-x-3 py-1 h-15 border-y border-gray-400/30 flex items-center"
              >
                <div className="w-[3em]">
                  <PhotoProvider>
                    <PhotoView src={item.image}>
                      <img
                        src={item.image}
                        alt={`Image`}
                        className="max-w-full max-h-full object-contain cursor-zoom-in"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>
                <div className="text-xs font-medium w-2/3 break-words">
                  <Link className="hover:underline ">{item.name}</Link>
                </div>
              </div>
            ))}
          </div>
        </aside>
  )
}

export default ProductAside
