import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFormCart,
  fetchCartWithItemDetails,
  updateCartQuantity,
  updateFetchCart,
} from "../slices/Cart.slice";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, cartloading } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("user");

  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [DeleteItemId, setDeleteItemId] = useState(null);
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartWithItemDetails(userId));
    }
  }, [dispatch, userId]);

  const navigate = useNavigate();


const handleQtyChange = (itemId, action, currentQty ,  price) => {
  const newQty = action === "inc" ? currentQty + 1 : Math.max(currentQty - 1, 0);
  if (newQty === currentQty) return;
   setUpdatingItemId(itemId); // start loading for this item only

  const QtyData = {
    userId,
    itemId,
    qty:newQty,
    price
  }

  dispatch(updateCartQuantity(QtyData))
    .then(() => {
      dispatch(updateFetchCart(userId)); // refresh cart
    }).finally(() => {
      setUpdatingItemId(null); // stop loading after update
    });
};


const handleDelete = (itemId)=>{
  setDeleteItemId(itemId)
  dispatch(deleteItemFormCart(itemId)).then(() => {
      dispatch(updateFetchCart(userId)); // refresh cart
    }).finally(() => {
      setDeleteItemId(null) // stop loading after update
    });
}



  // console.log(cart);

  const itemslength = cart?.items?.length;

  return (
    <div className="p-2 md:p-4 flex-res space-x-1 bg-gray-100">
      <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
        <h1 className="text-xl font-medium">My Cart</h1>

        {/* cart part */}
        {cartloading ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (
          <>
            {cart?.items?.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-row lg:space-y-5 px-2 py-4 border-y-2 border-gray-500/35"
              >
                <div className="w-20 md:w-36 shrink-0">
                  <img
                    className="w-full h-full object-contain"
                    src={item.image}
                    alt=""
                  />
                </div>
                {/* main content  */}

                <div className="w-full flex flex-col lg:flex-row items-start  justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="w-full flex flex-col justify-between px-4">
                    <div className="w-full">
                      <p className="text-sm md:text-lg leading-6 font-medium line-clamp-4 lg:line-clamp-2">
                        {item.name}
                      </p>
                    </div>
                    <div className="w-full my-2">
    
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold px-2">
                            Sold by:
                          </span>
                          <span className="text-sm text-primary cursor-pointer font-medium">
                            {item.companyName}
                          </span>
                        </div>
                       
                    </div>
                    <div className="w-full flex items-center space-x-3 py-2">
                      <div className="flex items-center border px-2 py-1 rounded gap-2">
                        <button
                          onClick={() => handleQtyChange(item.itemId, "dec", item.qty ?? 1,item.price)}
                          className="text-2xl font-semibold text-gray-600 hover:text-black"
                        >
                          -
                        </button>
                        <span className="text-lg flex items-center justify-center font-medium w-8 text-center">
                           {updatingItemId === item.itemId ? <ClipLoader size={20} /> : item.qty ?? 1}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.itemId, "inc", item.qty ?? 1 ,item.price)}
                          className="text-2xl font-semibold text-gray-600 hover:text-black"
                        >
                          +
                        </button>
                      </div>
                      <div className="space-x-2">
                        <button onClick={()=>handleDelete(item.itemId)} className="text-lg cursor-pointer font-semibold text-primary px-2">
                          {DeleteItemId == item.itemId ? <ClipLoader size={20} /> : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* price */}
                  <div className="w-60 py-2 px-4">
                    {/* <h3 className="px-2 py-1 bg-red-500 text-white w-fit rounded">
                      <span>20</span>% off
                    </h3> */}
                    <h1 className="text-xl text-right font-medium">
                      <span className="font-bold text-2xl px-2">₹</span>
                      {item.price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2 px-2">
              <h1 className="text-xl font-medium">
                Subtotal (<span>{itemslength}</span> items) :
                <span className="font-bold text-2xl px-2">₹</span>
                {cart?.finalTotal}
              </h1>
              <div className="w-full block xl:hidden">
                <button onClick={()=>navigate('/order')} className="w-fit px-10 py-2 text-xl font-medium bg-orange-400 text-white rounded">
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!cartloading && (
        <div className="bg-white hidden h-fit w-sm xl:block sticky top-0 p-2">
          <div className="flex justify-end px-2">
            <h1 className="text-xl font-medium">
              Subtotal (<span>{itemslength}</span> items) :
              <span className="font-bold text-2xl px-2">₹</span>
              {cart?.finalTotal}
            </h1>
          </div>
          <div className="w-full">
            <button onClick={()=>navigate('/order')} className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

function Loading(){
  return (<>{Array.from({ length: 2 }).map((_, index) => (
  <div
    key={index}
    className="w-full flex flex-row lg:space-y-5 px-2 py-4 border-y-2 border-gray-500/35 animate-pulse"
  >
    {/* === Image Skeleton === */}
    <div className="w-20 md:w-36 shrink-0">
      <div className="w-full h-full aspect-square bg-gray-300 rounded" />
    </div>

    {/* === Main Content Skeleton === */}
    <div className="w-full flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full flex flex-col justify-between px-4">
        {/* Product Name */}
        <div className="h-4 w-4/5 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-4" />

        {/* Sold By */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center border px-2 py-1 rounded gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
          </div>
          <div className="w-20 h-6 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="w-60 py-2 px-4">
        <div className="h-6 w-24 ml-auto bg-gray-300 rounded" />
      </div>
    </div>
  </div>
))}
</>)
}
