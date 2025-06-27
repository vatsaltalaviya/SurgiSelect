import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Link } from 'react-router-dom'

const TabProductAside = ({show}) => {
    console.log(show);
    
  return (
    <aside
           className={`fixed left-0 h-full z-50 bg-white shadow-md transition-transform duration-300 transform ${
    show ? 'translate-x-0' : '-translate-x-full'
  } w-[300px] overflow-y-auto noscrollbar`}
        >
          {/* related Category */}
          <div className="bg-white rounded px-2 py-1 text-wrap">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Related Category
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
                  <Link className="hover:underline ">Fingerprint Devices</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Filter result */}
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
                <Link className="text-xl font-medium hover:underline" to="#">
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
                <Link className="text-xl font-medium hover:underline" to="#">
                  Video
                </Link>
              </div>
            </form>
          </div>

          {/* related Brand */}
          <div className="bg-white rounded px-2 py-1 text-wrap">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Related Brands form
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
                  <Link className="hover:underline ">Fingerprint Devices</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Business Type */}
          <div className="bg-white rounded px-2 py-1">
            <h1 className="text-xl bg-gray-400/30 px-2 py-1 font-medium ">
              Business Type
            </h1>
            <div className="w-full">
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Menufacture
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Retailer
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  WholeSeller/Distributer
                </Link>
              </div>
              <div className="py-1 px-2">
                <Link className="text-xl font-medium hover:underline" to="#">
                  Expoter
                </Link>
              </div>
            </div>
          </div>
        </aside>
  )
}

export default TabProductAside
