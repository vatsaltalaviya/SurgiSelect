import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress } from "../slices/user.slice";

const UserProfile = () => {
    const userId = localStorage.getItem("user");
    const dispatch = useDispatch();
    const { address, loading, selectedAddress } = useSelector(
       (state) => state.user
     );

     useEffect(()=>{
        if(userId){
    dispatch(getUserAddress(userId));
        }
     },[userId,dispatch])


     
  return (
    <div className="w-full xl:min-h-[70vh] flex  justify-center px-2 py-4">
      <div className="border h-fit rounded-lg w-xl border-gray-400/35 ">
        <div className="w-full flex items-center justify-between px-2 py-2">
          <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
          <h4 className="text-xs font-medium text-gray-400">Joined 2/7/2025</h4>
        </div>
        <div className="w-full px-2 py-4">
          <h1 className="px-2 pt-1 text-xl font-medium">Test 123</h1>
          <h1 className="px-2 pt-1 text-sm font-medium">+91 9876543210</h1>
          <h1 className="px-2 py-1 text-sm font-medium">abc@gmail.com</h1>
        </div>
        <div className="w-full  py-4">
          <h1 className="px-2 pt-1 text-xl font-medium bg-gray-200">
            Address :-
          </h1>
        
          { loading ?<AddressLoading />:address?.map((item)=><div key={item._id} className="flex items-center px-3 py-2 mx-2 mt-1 rounded-lg bg-zinc-100 justify-between">
            <h1 className="px-2 text-sm font-medium ">
                {item.landmark} ,
              {item.address} ,{item.city} ,{item.state} ,{item.pincode}
            </h1>
            <i className="ri-delete-bin-6-line"></i>
          </div>)}
          
          
        </div>
        
        <div className="w-full px-2 py-2">
          <button className="px-4 py-1 bg-emerald-700 text-white text-sm font-medium rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

function AddressLoading(){
    return <div className="flex items-center px-3 py-2 mx-2 mt-1 rounded-lg bg-zinc-100 animate-pulse justify-between">
            <div className="px-2 py-3  text-sm font-medium bg-gray-200 w-lg rounded" />
            <div className="px-2 py-3  text-sm font-medium bg-gray-200 size-3 rounded" />
          </div>
}
