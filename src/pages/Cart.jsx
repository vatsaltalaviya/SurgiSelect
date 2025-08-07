import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFormCart,
  fetchCartWithItemDetails,
  setCartItemCount,
  updateCartQuantity,
  updateFetchCart,
} from "../slices/Cart.slice";
import { Link, useNavigate } from "react-router-dom";
import { fetchMultipleItemsById } from "../slices/items.slice";
import Lottie from "lottie-react";
import NoOrder from "../assets/noOrder.json";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        items: action.payload,
        finalTotal: action.payload.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        ),
      };

    case "INCREMENT":
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.payload.itemId
            ? {
                ...item,
                qty:
                  action.type === "INCREMENT"
                    ? item.qty + 1
                    : Math.max(item.qty - 1, 1),
              }
            : item
        ),
        finalTotal: state.items.reduce((sum, item) => {
          const updatedQty =
            item.itemId === action.payload.itemId
              ? action.type === "INCREMENT"
                ? item.qty + 1
                : Math.max(item.qty - 1, 1)
              : item.qty;
          return sum + item.price * updatedQty;
        }, 0),
      };

    case "DELETE":
      const filtered = state.items.filter(
        (item) => item.itemId !== action.payload
      );
      return {
        items: filtered,
        finalTotal: filtered.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        ),
      };

    default:
      return state;
  }
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, cartloading } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("user");

  

  const debounceTimers = useRef({});

  // Properly check for valid user
  const isLoggedIn = !!userId && userId !== "null" && userId !== "undefined";

  const localCart = useMemo(() => {
  const raw = localStorage.getItem("cart-data");
  try {
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}, []);


  useEffect(() => {
    if (userId) {
      dispatch(fetchCartWithItemDetails(userId));
    } else {
      dispatch(fetchMultipleItemsById(localCart));
    }
  }, [dispatch, userId]);

  const navigate = useNavigate();

  const handleQtyChange = (itemId, actionType) => {
    const item = localCartState.items.find((i) => i.itemId === itemId);
    if (!item) return;

    const newQty =
      actionType === "INCREMENT" ? item.qty + 1 : Math.max(item.qty - 1, 1);

    // Update local UI immediately
    dispatchCartAction({ type: actionType, payload: { itemId } });

    // Clear previous debounce timer
    if (debounceTimers.current[itemId]) {
      clearTimeout(debounceTimers.current[itemId]);
    }

    // Set new debounce timer
    debounceTimers.current[itemId] = setTimeout(() => {
      dispatch(
        updateCartQuantity({
          userId,
          itemId,
          qty: newQty,
          price: item.price,
        })
      );
    }, 1500); 
  };


  const handleDelete = (itemId) => {
    dispatchCartAction({ type: "DELETE", payload: itemId });

    dispatch(deleteItemFormCart(itemId)).then(() =>
      dispatch(updateFetchCart(userId))
    );
    dispatch(setCartItemCount(localCartState.items.length));
  };

  const [localCartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    finalTotal: 0,
  });
  


  useEffect(() => {
    if (isLoggedIn && cart?.items?.length > 0) {
      dispatchCartAction({ type: "SET_CART", payload: cart.items });
    } else if (!isLoggedIn && localCart?.length > 0) {
      dispatchCartAction({ type: "SET_CART", payload: localCart });
    }
  }, [cart, localCart, isLoggedIn]);

  const cartData = localCartState;
  const itemslength = cartData?.items?.length;

    useEffect(()=>{
    dispatch(setCartItemCount(itemslength))
  },[localCartState, dispatch, itemslength])

  return (
    <div className="p-2 md:p-4 flex-res min-h-screen space-x-1 bg-gray-100">
      <div className="w-full p-4 bg-white min-h-32 h-fit space-y-2 shadow-2xl">
        <div className="flex justify-between px-2 py-1">
          <h1 className="text-xl font-medium">Shoping Cart</h1>
          <h1 className="text-xl font-medium">{itemslength} Item</h1>
        </div>

        {/* cart part */}
        {cartloading  ? (
          <div className="w-full h-screen">
            <Loading />
          </div>
        ) : (cartData?.items?.length === 0 ? <div className="w-full flex justify-center ">
        <div className="size-62 my-10"><Lottie animationData={NoOrder} loop={true} />
        <h1 className="text-3xl text-center">No Cart Items!</h1></div>
      </div>:
          <>
            {cartData?.items?.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-row lg:space-y-5 px-2 py-4 border-t-2 border-gray-500/35"
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
                        <Link to={`/companyprofile/${item.companyId}`}>
                          <span className="text-sm text-primary cursor-pointer font-medium">
                            {item.companyName}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="w-full flex items-center space-x-3 py-2">
                      <div className="flex items-center border px-2 py-1 rounded gap-2">
                        <button
                          onClick={() =>
                            handleQtyChange(item.itemId, "DECREMENT")
                          }
                          className="text-2xl font-semibold text-gray-600 hover:text-black"
                        >
                          -
                        </button>
                        <span className="text-lg flex items-center justify-center font-medium w-8 text-center">
                          {item.qty ?? 1}
                        </span>
                        <button
                          onClick={() =>
                            handleQtyChange(item.itemId, "INCREMENT")
                          }
                          className="text-2xl font-semibold text-gray-600 hover:text-black"
                        >
                          +
                        </button>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleDelete(item.itemId)}
                          className="text-lg cursor-pointer font-semibold text-primary px-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* price */}
                  <div className="lg:w-60 py-2 px-4">
                    <h1 className="text-xl text-right font-medium">
                      <span className="font-bold text-2xl px-2">₹</span>
                      {item.price}
                    </h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col xl:hidden gap-2 px-2">
              <h1 className="text-xl font-medium">
                Subtotal (<span>{itemslength}</span> items) :
                <span className="font-bold text-2xl px-2">₹</span>
                {localCartState?.finalTotal || 0}
              </h1>
              <div className="w-full block xl:hidden">
                <button
                  onClick={() => navigate(isLoggedIn ? "/order" : "/signup")}
                  className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!cartloading && (
        <div className="bg-white hidden h-fit w-xl xl:block sticky top-0 p-2">
          <div className="px-2">
            <h1 className="text-lg font-medium">Order Summary</h1>
            <div className="w-full px-2">
              <table className="w-full">
                <tbody>
                  <tr className="py-2">
                    <td className="w-full text-sm font-semibold">
                      Total Items ({itemslength}):
                    </td>
                    <td className="w-full text-sm font-medium text-right">
                      {localCartState?.finalTotal}
                    </td>
                  </tr>
                  <tr className="py-2">
                    <td className="w-full text-sm font-semibold">Total:</td>
                    <td className="w-full text-sm font-medium text-right">
                      {localCartState?.finalTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={() => navigate(isLoggedIn ? "/order" : "/signup")}
              className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

function Loading() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
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
    </>
  );
}
