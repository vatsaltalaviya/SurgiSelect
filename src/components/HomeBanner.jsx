import React from 'react'

const HomeBanner = () => {
  return (
    <div className='w-full py-4 px-2 lg:py-10 bg-gray-100'>
      <img className='hidden lg:block rounded-lg mx-auto' src="https://utils.imimg.com/imsrchui/imgs/Investor-banner.webp" alt="" />
   
        <div className="w-full flex items-center justify-center lg:hidden">
            <form
              className=" rounded flex flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
          
              <div className="w-full flex">
                <input
                  className="border outline-none rounded-l w-full py-2 px-3 text-sm border-gray-500"
                  type="text"
                  placeholder="Enter Product/Service to search"
                />
              </div>
              <div>
                <button className="mx-auto flex justify-center gap-2 px-2.5 h-full items-center text-sm bg-emerald-500 text-white w rounded-r py-2 text-left font-medium">
                  <i className="ri-search-line"></i>
                </button>
              </div>
            </form>
           
          </div>
    </div>
  )
}

export default HomeBanner
