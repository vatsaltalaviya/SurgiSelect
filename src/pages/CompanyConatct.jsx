import React from 'react'

const CompanyConatct = () => {
  return (
    <div className='w-full px-2 py-2 flex flex-col lg:flex-row'>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
        <h1 className='text-sm text-primary font-medium'>Tell us what you need, and we'll help you get quotes</h1>
        <button className='px-4 py-2 text-white bg-emerald-900'>Submit Requirements</button>
      </div>
      <div className='w-full lg:w-1/2 px-2'>
 <div className="max-w-xl p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Reach Us</h2>

      <div className="flex items-start gap-2 mb-3">
        <i className="ri-map-pin-fill"></i>
        <div>
          <p>
            4th Floor Office No-405, 150 Feet Ring Road,
            The Spire Sheetal Park Chowk, Rajkot-360005, Gujarat, India
          </p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            className="text-blue-500 text-sm hover:underline"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <i className="ri-user-line"></i>
        <p>
          <span className="font-medium">Abhishek Kumar</span> (Owner)
        </p>
      </div>

      <div className="flex items-start gap-2">
        <i className="ri-phone-fill"></i>
        <div>
          <p>
            Call <span className="font-bold text-black">07942705856</span>
          </p>
          <p className="text-green-600 text-sm font-semibold">
            28% Call Response Rate
          </p>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default CompanyConatct
