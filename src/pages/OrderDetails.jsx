import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../slices/order.slice";

const OrderDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const { orders, orderloading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrderById(id));
    }, [])  
  
  return (
    <div className="min-h-screen bg-gray-100 py-2 px-4">
      <div className="flex py-3 lg:py-4 lg:pl-10 justify-start w-full">
        <h1 className="text-2xl font-semibold">Order Details</h1>
      </div>

      {orderloading?<OrderModelSkeleton />:<div className="w-full flex flex-col lg:flex-row gap-4 items-start">
        <div className="lg:w-1/2 w-full space-y-2">
          <h1 className="lg:text-xl my-1.5">Total Items {orders?.items?.length}</h1>

          {orders?.items?.map((item,i)=><div key={item.item._id} className=" w-full bg-white flex flex-col lg:flex-row justify-between gap-x-4  px-2 py-2 border border-black/40 rounded-lg">
            <div className="flex noscrollbar overflow-x-auto gap-x-2">
              <PhotoProvider>
                <PhotoView src={item.item.logoImage}>
                  <img
                    src={item.item.logoImage}
                    alt={`Image`}
                    className="size-24 lg:size-36 lg:p-5 rounded-sm object-cover border border-black/10 cursor-zoom-in"
                  />
                </PhotoView>
              </PhotoProvider>

              <div className="px-2 max-w-2xl">
                <h3 className="text-sm lg:text-lg font-medium line-clamp-2 ">
                  {item.item.name}
                </h3>
                <h3 className="text-sm text-gray-700">{item.item.size}, {item.item.color}</h3>
                <h3 className="text-sm lg:text-lg  ">₹{item.item.sellingPrice}</h3>
              </div>
            </div>

            <div className=" lg:max-w-36 text-left space-y-1 mt-2">
              <h1 className="text-sm">Delivary on Jun 08</h1>
              <h1 className="text-sm">Your Item has been Delivered</h1>
            </div>
          </div>)}


        </div>

        <div className="w-full lg:w-1/2 ">
          <h1 className="lg:text-2xl my-1 ">Order Summary</h1>
            <div className="bg-white px-2 py-2 rounded">
              <h1 className="text-lg font-medium">Address</h1>
              <hr />
              <table className="w-full ">
                <tbody>
                  <tr>
                    <td className="font-medium">State</td>
                    <td className="text-right text-sm py-1">{orders?.State}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">City</td>
                    <td className="text-right text-sm py-1">{orders?.city}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Address</td>
                    <td className="text-right text-sm py-1">{orders?.orderAddress}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">LandMark</td>
                    <td className="text-right text-sm py-1">{orders?.LandMark}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Pincode</td>
                    <td className="text-right text-sm py-1">{orders?.pincode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white px-2 py-2 rounded">
              <h1 className="text-lg font-medium">Amount</h1>
              <hr />
              <div className="grid grid-cols-2">
                <span className="text-sm font-medium">Payment Method :</span>
                <span className="text-right">{orders?.paymentMethod}</span>
                <span className="text-sm font-medium">Total Amount :</span>
                <span className="text-right">₹{orders?.totalAmount}</span>
              </div>
            </div>
        </div>
      </div>}
    </div>
  );
};

export default OrderDetails;

const OrderModelSkeleton = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-start animate-pulse">
      {/* Left Side - Items */}
      <div className="lg:w-1/2 w-full space-y-3">
        <div className="h-6 w-40 bg-gray-300 rounded" />

        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-white flex flex-col lg:flex-row justify-between gap-x-4 px-2 py-2 border border-black/40 rounded-lg"
          >
            <div className="flex noscrollbar overflow-x-auto gap-x-2">
              <div className="size-24 lg:size-36 lg:p-5 bg-gray-300 rounded-sm border border-black/10" />

              <div className="px-2 max-w-2xl space-y-2">
                <div className="h-5 lg:h-6 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-5 bg-gray-300 rounded w-1/3" />
              </div>
            </div>

            <div className="max-w-xs space-y-2 mt-2">
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Summary */}
      <div className="w-full lg:w-1/2 space-y-3">
        <div className="h-7 w-48 bg-gray-300 rounded" />

        {/* Address */}
        <div className="bg-white px-2 py-2 rounded space-y-2">
          <div className="h-5 bg-gray-300 rounded w-32" />
          <hr />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <div className="h-4 bg-gray-300 rounded w-24" />
              <div className="h-4 bg-gray-300 rounded w-32" />
            </div>
          ))}
        </div>

        {/* Amount */}
        <div className="bg-white px-2 py-2 rounded space-y-2">
          <div className="h-5 bg-gray-300 rounded w-32" />
          <hr />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-full text-right" />
          </div>
        </div>
      </div>
    </div>
  );
};


