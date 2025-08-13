import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderByUserId } from "../slices/order.slice";
import Lottie from "lottie-react";
import NoOrder from "../assets/noOrder.json";

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

      {orders?.length === 0 ? (
        <div className="size-62 my-10">
          <Lottie animationData={NoOrder} loop={true} />
          <h1 className="text-3xl text-center">No Orders Yet !</h1>
        </div>
      ) : (
        <div className="w-full xl:px-32 space-y-2">
          {orderloading ? (
            <OrderCardSkeleton />
          ) : (
            Array.isArray(orders) &&
            orders?.map((order) => (
              <Link key={order._id} to={`/orders/${order._id}`}>
                {" "}
                <div className="w-full mb-2 bg-white flex flex-col lg:flex-row justify-between gap-x-4  px-2 py-2 border border-black/40 rounded">
                  <div className="flex xl:w-3xl noscrollbar overflow-x-auto gap-x-2">
                    <div className="relative shrink-0">
                      <PhotoProvider>
                        <PhotoView src={order?.items[0].logoImage}>
                          <img
                            src={order?.items[0].logoImage}
                            alt={`Image`}
                            className="size-24 lg:size-40 lg:p-5 rounded object-cover border border-black/10 cursor-zoom-in"
                          />
                        </PhotoView>
                      </PhotoProvider>
                      {order?.items.length > 1 && (
                        <span className="absolute bottom-2 text-center text-white  w-full text-xs lg:text-sm bg-black">
                          {order?.items.length} more items
                        </span>
                      )}
                    </div>
                    {order?.items.length > 1 ? (
                      `Surgi Select Basket ${order?.items.length} items`
                    ) : (
                      <h1 className="text-sm font-medium ">{order?.items[0].name}</h1>
                    )}
                  </div>

                  <div className="w-xs mt-4 flex flex-col lg:flex-row">
                    <div className="px-2 max-w-5xl flex  space-y-2">
                      <h3 className="text-sm lg:text-lg font-medium ">
                        ₹{order.totalAmount}
                      </h3>
                    </div>

                    <div className="px-2 max-w-xs space-y-1 font-medium">
                      <h1 className="text-sm">
                        Delivery on{" "}
                        {new Date(order.deliveryDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </h1>

                      <h1 className="text-sm">
                        Your Item has been {order.status}
                      </h1>
                      <h1 className="text-sm">
                        Total Items : {order.items.length}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;

const OrderCardSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full mb-2 bg-white flex flex-col lg:flex-row justify-between gap-x-4 px-2 py-2 border border-black/40 rounded animate-pulse"
        >
          {/* Image List Skeleton */}
          <div className="flex xl:w-3xl noscrollbar overflow-x-auto gap-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="size-24 lg:size-40 lg:p-5 rounded bg-gray-200 border border-black/10"
              />
            ))}
          </div>

          {/* Order Info Skeleton */}
          <div className="w-xs mt-4">
            <div className="px-2 max-w-5xl flex space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="px-2 max-w-xs space-y-1 mt-2">
              <div className="h-3 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-44 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
