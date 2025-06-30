import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  const bgref = useRef(null);
  const closePopUp = (e) => {
    if (bgref.current === e.target) {    
      setshowAddCard(false);
    }
  }
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => currentYear + i);
  return (
    <>
      <div className="p-2 md:p-12 flex-res space-x-1  bg-gray-100">
        <div className="w-full space-y-1">
          <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
            <h1 className="text-lg md:text-xl font-semibold">
              Delivering to Vatsal Talaviya
            </h1>
            <h3 className="text-lg font-medium">
              226, 16/7 bhojrajpara, GONDAL, GUJARAT, 360311, India
            </h3>
            <Link to="/changeAdd" className="text-primary hover:underline">
              Change address
            </Link>
          </div>
          <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
            <h1 className="text-lg md:text-xl font-semibold">Payment method</h1>
            <form className="w-full border-2 border-gray-300 rounded px-2 py-1">
              <div className="py-2">
                <h1 className="text-lg md:text-xl font-semibold">
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
                <h1 className="text-lg md:text-xl font-semibold">UPI</h1>

                <div className=" px-6 py-3">
                  <div className="w-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      className="items-start w-5 h-5"
                    />
                    <h2 className="text-xl font-medium">Amazon Pay</h2>
                    <img
                      className="w-10 h-9"
                      name="payment"
                      src="https://cdn.iconscout.com/icon/free/png-512/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp&w=512"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="py-2 border-t-2 border-gray-300">
                <h1 className="text-lg md:text-xl font-semibold">
                  Another payment method
                </h1>

                <div className=" px-6 py-3">
                  <div className="w-full items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value='creditCard'
                      className="items-start w-5 h-5"
                    />
                    <h2 className="text-xl font-medium">
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
                    <button type="button" onClick={()=>setshowAddCard(true)} className="text-primary hover:underline">
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
                       value='netBanking'
                    />
                    <h2 className="text-xl font-medium">Net banking</h2>
                  </div>
                  <div className="flex flex-col item-center gap-2 py-2">
                    <select
                      id="bank"
                      name="bank"
                      className="w-52 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      className="items-start w-5 h-5"
                    />
                    <h2 className="text-xl font-medium">Other UPI Apps</h2>
                  </div>
                  <div className="flex flex-col item-center gap-2 py-2">
                    <div className="flex flex-col lg:flex-row gap-2">
                      {" "}
                      <input
                        type="text"
                        placeholder="Enter UPI ID"
                         value='UPI'
                        className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        className="border border-gray-400 rounded-full px-4 py-1 text-lg hover:bg-gray-100 transition"
                      >
                        Verify
                      </button>
                    </div>
                    <span className="text-lg py-2 text-gray-500 font-medium">
                      The UPI ID is in the format of name/phone number@bankname
                    </span>
                  </div>
                </div>

                <div className=" px-6 py-3">
                  <div className="w-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      className="items-start w-5 h-5"
                    />
                    <h2 className="text-xl font-medium">EMI</h2>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-2">
                    <img
                      className="w-sm h-9"
                      name="payment"
                       value='EMI'
                      src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751276424/Screenshot_2025-06-30_150905_zl4nhu.png"
                      alt=""
                    />
                    <button type="button" onClick={()=>setshowAddCard(true)} className="text-primary hover:underline">
                      Add your Card
                    </button>
                  </div>
                </div>
                <div className=" px-6 py-3">
                  <div className="w-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                       value='cashOnDelivary'
                      className="items-start w-5 h-5"
                    />
                    <h2 className="text-xl font-medium">Cash On Delivary</h2>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white h-fit w-full md:w-xl  sticky top-0 p-2">
          <div className=" justify-end px-2">
          
            <table>
                <tr className="py-2">
                    <td className="w-full text-lg font-semibold">Items (2):</td>
                    <td className="w-full text-lg font-medium text-right">73520</td>
                </tr>
                <tr className="py-2">
                    <td className="w-full text-lg font-semibold">Delivary:</td>
                    <td className="w-full text-lg font-medium text-right">40</td>
                </tr>
                <tr className="py-2">
                    <td className="w-full text-lg font-semibold">Market Fee:</td>
                    <td className="w-full text-lg font-medium text-right">5</td>
                </tr>
                <tr className="py-2">
                    <td className="w-full text-lg font-semibold">Total:</td>
                    <td className="w-full text-lg font-medium text-right">73520</td>
                </tr>
                <tr className="py-2">
                    <td className="w-full text-lg font-semibold">Promotion Applied:</td>
                    <td className="w-full text-lg font-medium text-right">-40</td>
                </tr>
            </table>
          </div>
          <div className="w-full">
            <button className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>


     {showAddCard && <div ref={bgref} onClick={closePopUp} className="h-screen w-full flex items-center justify-center fixed top-0 bg-black/50">
        <div className="bg-white px-5 py-2">
          <h1 className="w-full px-2 py-4 text-lg md:text-2xl font-medium">
            Add your new Credit card or Debit Card
          </h1>
          <form className="w-full flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-2">
              <span className="w-52 text-sm md:text-lg font-semibold">Card Number</span>
              <input
                type="text"
                placeholder="Card Number"
                className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
              />
            </div>
            <div className="flex  flex-col lg:flex-row gap-2">
              <span className="w-52 text-sm md:text-lg font-semibold">Nick name</span>
              <input
                type="text"
                placeholder="Enter name"
                className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
              />
            </div>
            <div className="flex  flex-col lg:flex-row gap-2">
              <span className="w-52 text-sm md:text-lg font-semibold">Expire date </span>
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
             <button className="px-2 py-1 text-lg rounded borde bg-yellow-400">Continue</button>
             <button type="button" onClick={()=>setshowAddCard(false)} className="px-2 py-1 text-lg rounded border">Cancel</button>
            </div>
          </form>
        </div>
      </div>}
    </>
  );
};

export default Orderpage;
