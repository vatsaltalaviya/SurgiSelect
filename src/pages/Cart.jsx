import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFormCart,
  fetchCartWithItemDetails,
  updateCartQuantity,
  updateFetchCart,
} from "../slices/Cart.slice";
import { ClipLoader } from "react-spinners";

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
    <div className="p-2 md:p-12 flex-res space-x-1 bg-gray-100">
      <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
        <h1 className="text-xl md:text-4xl font-medium">My Cart</h1>

        {/* cart part */}
        {cartloading ? (
          <div className="w-full h-screen flex items-center justify-center">
            {" "}
            <ClipLoader size={50} />
          </div>
        ) : (
          <>
            {cart?.items?.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-row lg:space-y-5 px-2 py-4 border-y-2 border-gray-500/35"
              >
                <div className="w-20 md:w-60 shrink-0">
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
                      <p className="text-sm md:text-xl font-medium line-clamp-4 lg:line-clamp-2">
                        {item.name}
                      </p>
                    </div>
                    <div className="w-full my-2">
    
                        <div className="flex gap-2">
                          <span className="text-sm lg:text-lg font-semibold px-2">
                            Sold by:
                          </span>
                          <span className="text-sm lg:text-lg font-medium">
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
                        <button onClick={()=>handleDelete(item.itemId)} className="text-lg font-semibold text-primary px-2">
                          {DeleteItemId == item.itemId ? <ClipLoader size={20} /> : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* price */}
                  <div className="w-60 py-2 px-4">
                    <h3 className="px-2 py-1 bg-red-500 text-white w-fit rounded">
                      <span>20</span>% off
                    </h3>
                    <h1 className="text-xl font-medium">
                      <span className="font-bold text-2xl px-2">₹</span>
                      {item.price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2 px-2">
              <h1 className="text-2xl font-medium">
                Subtotal (<span>{itemslength}</span> items) :
                <span className="font-bold text-2xl px-2">₹</span>
                {cart?.finalTotal}
              </h1>
              <div className="w-full block xl:hidden">
                <button className="w-fit px-10 py-2 text-xl font-medium bg-orange-400 text-white rounded">
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!cartloading && (
        <div className="bg-white hidden h-fit w-fit xl:block sticky top-0 p-2">
          <div className="flex justify-end px-2">
            <h1 className="text-2xl font-medium">
              Subtotal (<span>{itemslength}</span> items) :
              <span className="font-bold text-2xl px-2">₹</span>
              {cart?.finalTotal}
            </h1>
          </div>
          <div className="w-full">
            <button className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
