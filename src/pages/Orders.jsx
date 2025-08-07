import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderByUserId } from "../slices/order.slice";

const Orders = () => {
  const userId = localStorage.getItem("user");
  const dispatch = useDispatch();
  const { orders, orderloading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrderByUserId({ id: userId }));
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-y-2 items-center py-2 px-4 bg-gray-100">
      <div className="flex py-3 lg:py-8 lg:pl-10 justify-start w-full">
        <h1 className="text-2xl font-semibold">My Orders</h1>
      </div>

      <div className="w-full space-y-2">
        {orderloading
        ? <OrderCardSkeleton />
        : Array.isArray(orders) &&
          orders?.map((order) => (
            <Link key={order._id} to={`/orders/${order._id}`}>
              {" "}
              <div className="w-full mb-2 bg-white flex flex-col lg:flex-row justify-between gap-x-4  px-2 py-2 border border-black/40 rounded">
                <div className="flex xl:w-3xl noscrollbar overflow-x-auto gap-x-2">
                  {order?.items.map((item) => (
                    <PhotoProvider key={item.itemId}>
                      <PhotoView src={item.image}>
                        <img
                        
                          src={item.image}
                          alt={`Image`}
                          className="size-24 lg:size-40 lg:p-5 rounded object-cover border border-black/10 cursor-zoom-in"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  ))}
                </div>

                <div className="w-xs mt-4">
                    <div className="px-2 max-w-5xl flex  space-y-2">
                  <h3 className="text-sm lg:text-lg  ">₹{order.totalAmount}</h3>
                </div>

                <div className="px-2 max-w-xs space-y-1">
                  <h1 className="text-sm">Delivary on Jun 08</h1>
                  <h1 className="text-sm">Your Item has been {order.status}</h1>
                  <h1 className="text-sm">Total Items : {order.items.length}</h1>
                </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Orders;

const OrderCardSkeleton = () => {
  return (
    <>
      {[1, 1, 1].map((_, index) => (
        <div
          key={index}
          className="lg:w-5xl w-full flex flex-col gap-x-4 lg:flex-row px-2 py-2 border border-black/40 rounded animate-pulse mb-4"
        >
          
            <div className="size-24 lg:size-40 lg:p-5 bg-gray-300 rounded" />
          

          <div className="px-2 max-w-xs space-y-2 mt-2 lg:mt-0">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </>
  );
};



