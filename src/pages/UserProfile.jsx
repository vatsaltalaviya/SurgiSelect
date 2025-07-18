import React from 'react'

const UserProfile = () => {
  return (
    <div className='w-full xl:min-h-[70vh] flex  justify-center px-2 py-4'>
      <div className='border h-fit rounded-lg w-xl border-gray-400/35 '>
            <div className='w-full flex items-center justify-between px-2 py-2'>
                <h2 className='text-xl font-semibold text-gray-900'>Your Profile</h2>
                <h4 className='text-xs font-medium text-gray-400'>Joined 2/7/2025</h4>
            </div>
            <div className='w-full flex items-center px-2 py-4'>
                <img className='w-26 h-26 object-cover rounded-full' src="https://images.unsplash.com/photo-1530404805506-c03b57ae586f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZlZXNpb25hbCUyMHBob3RvfGVufDB8fDB8fHww" alt="profile picture"/>
                <div>
                    <h1 className='px-2 pt-1 text-xl font-medium'>Test 123</h1>
                <h1 className='px-2 pt-1 text-sm font-medium'>+91 9876543210</h1>
                <h1 className='px-2 py-1 text-sm font-medium'>abc@gmail.com</h1>
                </div>
            </div>
            <div className='w-full  py-4'>
                <h1 className='px-2 pt-1 text-xl font-medium bg-gray-200'>Address :-</h1>
                <div className='flex items-center px-3 py-2 mx-2 mt-1 rounded-lg bg-zinc-100 justify-between'>
                    <h1 className='px-2 py-2  text-sm font-medium '>F-204 RCK Park Nr. Purusharth School Gandhi Gram Rajkot 360001</h1>
                    <i class="ri-delete-bin-6-line"></i>
                </div>
                <div className='flex items-center px-3 py-2 mx-2 mt-1 rounded-lg bg-zinc-100 justify-between'>
                    <h1 className='px-2 py-2  text-sm font-medium '>F-204 RCK Park Nr. Purusharth School Gandhi Gram Rajkot 360001</h1>
                    <i class="ri-delete-bin-6-line"></i>
                </div>
                
            </div>
            <div className='w-full px-2 py-2'>
                <button className='px-4 py-1 bg-emerald-700 text-white text-sm font-medium rounded'>Edit Profile</button>
            </div>
      </div>
    </div>
  )
}

export default UserProfile
