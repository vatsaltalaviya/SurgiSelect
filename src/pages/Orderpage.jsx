import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserAddress } from "../slices/user.slice";
import { BeatLoader, ClipLoader } from "react-spinners";
import { fetchCartWithItemDetails } from "../slices/Cart.slice";
import { addOrder } from "../slices/order.slice";
import axios from "axios";
import { toast } from "react-toastify";

const banks = [
  // Public Sector
  "State Bank of India",
  "Bank of Baroda",
  "Punjab National Bank",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "Bank of Maharashtra",
  "Punjab & Sind Bank",
  // Private Sector
  "Axis Bank",
  "Bandhan Bank",
  "CSB Bank",
  "City Union Bank",
  "DCB Bank",
  "Dhanlaxmi Bank",
  "Federal Bank",
  "HDFC Bank",
  "ICICI Bank",
  "IDBI Bank",
  "IDFC First Bank",
  "IndusInd Bank",
  "Jammu & Kashmir Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "Kotak Mahindra Bank",
  "Nainital Bank",
  "RBL Bank",
  "South Indian Bank",
  "Tamilnad Mercantile Bank",
  "Yes Bank",
];

const Orderpage = () => {
  const [showAddCard, setshowAddCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // ✅ Correct spelling

  const userId = localStorage.getItem("user");
  const userName = localStorage.getItem("username");
  const userNumber = localStorage.getItem("usernumber");
  const userEmail = localStorage.getItem("useremail");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { address, loading, selectedAddress } = useSelector(
    (state) => state.user
  );
  const { orderloading } = useSelector((state) => state.order);
  const bgref = useRef(null);
  const closePopUp = (e) => {
    if (bgref.current === e.target) {
      setshowAddCard(false);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => currentYear + i);

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartWithItemDetails(userId));
      dispatch(getUserAddress(userId));
    }
  }, [userId]);

  const items = useMemo(() => {
    return (
      cart?.items?.map((item) => ({
        item: item.itemId,
        quantity: item.qty,
      })) || []
    );
  }, [cart?.items]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if(!address[selectedAddress]?.city||!address[selectedAddress]?.landmark||!address[selectedAddress]?.address||!address[selectedAddress]?.state||!address[selectedAddress]?.city||!address[selectedAddress]?.pincode){
      toast.error("Please Add Address");
      navigate("/address");
      return;
    }
    const orderData = {
      userId,
      userNumber,
      userEmail,
      userName,
      items,
      status: "Confirmed",
      orderId: "NA",
      deliveryStatus: "Dispatched",
      isOrderCancelled: false,
      totalAmount: cart.finalTotal,
      paymentMethod,
      city: address[selectedAddress]?.city,
      LandMark: address[selectedAddress]?.landmark,
      orderAddress: address[selectedAddress]?.address,
      State: address[selectedAddress]?.state,
      Locality: address[selectedAddress]?.city,
      pincode: address[selectedAddress]?.pincode,
    };
    try {
      const orderres = await dispatch(addOrder(orderData)).unwrap();
      if (orderres) {
        toast.success("Your order Palce Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("fail to Order");
    }
  };

  

  return (
    <>
      <div className="p-2 md:p-12 bg-gray-100">
        <form
          onSubmit={handlesubmit}
          className="w-full flex-res space-x-1  border-gray-300 rounded px-2 py-1"
        >
          {loading ? (
            <div className="w-full h-screen">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-full space-y-1">
                <div className="w-full p-4 bg-white shadow-2xl">
                  {address && address.length != 0 ? (
                    <div className="space-y-2">
                      <h1 className="text-lg md:text-lg font-semibold">
                        Delivering to {userName}
                      </h1>
                      <h3 className="text-lg font-medium">
                        {address[selectedAddress]?.landmark}{" "}
                        {address[selectedAddress]?.address}{" "}
                        {address[selectedAddress]?.pincode}{" "}
                        {address[selectedAddress]?.state} , India
                      </h3>
                      <Link
                        type="button"
                        to="/address"
                        className="text-primary hover:underline"
                      >
                        Change address
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <h1 className="text-lg md:text-lg font-semibold">
                        Add Address
                      </h1>

                      <Link
                        to="/address"
                        className="text-primary hover:underline"
                      >
                        Add address
                      </Link>
                    </div>
                  )}
                </div>
                <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
                  <h1 className="text-lg md:text-lg font-semibold">
                    Payment method
                  </h1>

                  <div className="py-2">
                    <h1 className="text-lg font-semibold">
                      Your available balance
                    </h1>
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                      {/* Plus Icon */}
                      <div className="flex">
                        <i className="ri-add-line text-2xl text-gray-300"></i>

                        {/* Input */}
                        <input
                          type="text"
                          placeholder="Enter Code"
                          className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </div>

                      {/* Apply Button */}
                      <button
                        type="button"
                        className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="py-2 border-t-2 border-gray-300">
                    <h1 className="text-sm  font-semibold">
                      Another payment method
                    </h1>

                    <div className=" px-6 py-3">
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="creditCard"
                          checked={paymentMethod == "creditCard"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="items-start w-5 h-5"
                        />
                        <h2 className="text-sm font-medium">
                          Credit or debit card
                        </h2>
                      </div>
                      <div className="flex flex-col items-start gap-2 py-2">
                        <img
                          className="w-sm h-9"
                          name="payment"
                          src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751276424/Screenshot_2025-06-30_150905_zl4nhu.png"
                          alt=""
                        />
                        <button
                          type="button"
                          onClick={() => setshowAddCard(true)}
                          className="text-primary text-sm hover:underline"
                        >
                          Add your Card
                        </button>
                      </div>
                    </div>

                    <div className=" px-6 py-3">
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          className="items-start w-5 h-5"
                          value="netBanking"
                          checked={paymentMethod == "netBanking"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <h2 className="text-sm font-medium">Net banking</h2>
                      </div>
                      <div className="flex flex-col item-center gap-2 py-2">
                        <select
                          id="bank"
                          name="bank"
                          className="w-52 px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            -- Choose bank --
                          </option>
                          {banks.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className=" px-6 py-3">
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="UPI"
                          checked={paymentMethod == "UPI"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="items-start w-5 h-5"
                        />
                        <h2 className="text-sm font-medium">Other UPI Apps</h2>
                      </div>
                      <div className="flex flex-col item-center gap-2 py-2">
                        <div className="flex flex-col lg:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Enter UPI ID"
                            className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                          />
                          <button
                            type="button"
                            className="border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition"
                          >
                            Verify
                          </button>
                        </div>
                        <span className="text-sm py-2 text-gray-500 font-medium">
                          The UPI ID is in the format of name/phone
                          number@bankname
                        </span>
                      </div>
                    </div>

                    <div className=" px-6 py-3">
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="EMI"
                          checked={paymentMethod == "EMI"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="items-start w-5 h-5"
                        />
                        <h2 className="text-sm font-medium">EMI</h2>
                      </div>
                      <div className="flex flex-col items-start gap-2 py-2">
                        <img
                          className="w-sm h-9"
                          name="payment"
                          value="EMI"
                          src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751276424/Screenshot_2025-06-30_150905_zl4nhu.png"
                          alt=""
                        />
                        <button
                          type="button"
                          onClick={() => setshowAddCard(true)}
                          className="text-primary text-sm hover:underline"
                        >
                          Add your Card
                        </button>
                      </div>
                    </div>
                    <div className=" px-6 py-3">
                      <div className="w-full flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          checked={paymentMethod == "COD"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="items-start w-5 h-5"
                        />
                        <h2 className="text-sm font-medium">
                          Cash On Delivary
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white h-fit w-full md:w-xl mt-2 lg:mt-0  sticky top-0 p-2">
                <div className=" justify-end px-2">
                  <table>
                    <tbody>
                      <tr className="py-2">
                        <td className="w-full text-lg font-semibold">
                          Items ({cart?.items?.length}) :
                        </td>
                        <td className="w-full text-lg font-medium text-right">
                          {cart.finalTotal}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <td className="w-full text-lg font-semibold">
                          Delivary:
                        </td>
                        <td className="w-full text-lg font-medium text-right">
                          40
                        </td>
                      </tr>

                      <tr className="py-2">
                        <td className="w-full text-lg font-semibold">Total:</td>
                        <td className="w-full text-lg font-medium text-right">
                          {cart.finalTotal}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <td className="w-full text-lg font-semibold">
                          Promotion Applied:
                        </td>
                        <td className="w-full text-lg font-medium text-right">
                          -40
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full px-3 py-2 text-lg font-medium bg-orange-400 text-white rounded"
                  >
                    {orderloading ? (
                      <BeatLoader size={10} color="white" />
                    ) : (
                      " Place Order"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      {showAddCard && (
        <div
          ref={bgref}
          onClick={closePopUp}
          className="h-screen w-full flex items-center justify-center fixed top-0 bg-black/50"
        >
          <div className="bg-white px-5 py-2">
            <h1 className="w-full px-2 py-4 text-lg md:text-2xl font-medium">
              Add your new Credit card or Debit Card
            </h1>
            <form className="w-full flex flex-col gap-2">
              <div className="flex flex-col lg:flex-row gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Card Number
                </span>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex  flex-col lg:flex-row gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Nick name
                </span>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex  flex-col lg:flex-row gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Expire date{" "}
                </span>
                <select
                  name="expiryMonth"
                  id="expiryMonth"
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => {
                    const month = String(i + 1).padStart(2, "0");
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>

                {/* Year Select */}
                <select
                  name="expiryYear"
                  id="expiryYear"
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">YYYY</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button className="px-2 py-1 text-lg rounded borde bg-yellow-400">
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => setshowAddCard(false)}
                  className="px-2 py-1 text-lg rounded border"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Orderpage;

function Loading() {
  return (
    <div className="w-full flex-res space-x-1 border-gray-300 rounded px-2 py-1 animate-pulse">
      {/* Left Section Skeleton */}
      <div className="w-full space-y-3">
        {/* Address Card */}
        <div className="p-4 bg-white shadow-2xl space-y-3 rounded">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-4 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
        </div>

        {/* Payment Method Card */}
        <div className="p-4 bg-white shadow-2xl space-y-4 rounded">
          <div className="h-5 w-1/3 bg-gray-300 rounded" />
          {/* Promo code input */}
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="h-10 w-full lg:w-1/2 bg-gray-300 rounded" />
            <div className="h-10 w-24 bg-gray-300 rounded" />
          </div>
          {/* Payment Options */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2 pt-4 border-t border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </div>
              <div className="h-6 w-32 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section Summary */}
      <div className="bg-white h-fit w-full md:w-xl mt-2 lg:mt-0 sticky top-0 p-2 rounded shadow-xl space-y-3">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="h-10 w-full bg-gray-300 rounded mt-4" />
      </div>
    </div>
  );
}
