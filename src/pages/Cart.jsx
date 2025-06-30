import React, { useState } from "react";

const Cart = () => {
  const [Qty, setQty] = useState(1);
  return (
    <div className="p-2 md:p-12 flex-res space-x-1 bg-gray-100">
      <div className="w-full p-4 bg-white space-y-2 shadow-2xl">
        <h1 className="text-xl md:text-4xl font-medium">My Cart</h1>

        {/* cart part */}

        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full flex flex-row lg:space-y-5 px-2 py-4 border-y-2 border-gray-500/35">
            <div className="w-20 md:w-60 shrink-0">
              <img
                className="w-full h-full object-contain"
                src="https://m.media-amazon.com/images/I/81thDpmpITL._SX679_.jpg"
                alt=""
              />
            </div>
            {/* main content  */}

            <div className="w-full flex flex-col lg:flex-row items-start  justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="w-full flex flex-col justify-between px-4">
                <div className="w-full">
                  <p className="text-sm md:text-xl text-justify  font-medium line-clamp-4 lg:line-clamp-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus atque repellat illo similique inventore ea
                    distinctio accusamus aperiam earum quisquam est officia
                    alias asperiores deleniti ullam itaque fuga, quae officiis
                    porro sunt esse numquam excepturi libero laborum. Cumque
                    nisi quisquam expedita exercitationem minima praesentium
                    saepe inventore. A porro possimus accusantium?
                  </p>
                </div>
                <div className="w-full my-2">
                  <p>
                    <span className="text-sm lg:text-lg font-semibold px-2">
                      Type:
                    </span>
                    <span className="text-sm lg:text-lg font-medium">
                      i phone
                    </span>
                  </p>
                  <p>
                    <span className="text-sm lg:text-lg font-semibold px-2">
                      Size:
                    </span>
                    <span className="text-sm lg:text-lg font-medium">
                      Regular
                    </span>
                  </p>
                  <p>
                    <span className="text-sm lg:text-lg font-semibold px-2">
                      Colour:
                    </span>
                    <span className="text-sm lg:text-lg font-medium">grey</span>
                  </p>
                </div>
                <div className="w-full flex items-center space-x-3 py-2">
                  <div className="flex items-center border px-2 py-1 rounded gap-2">
                    <button
                      onClick={() => setQty((p) => p - 1)}
                      className="text-2xl font-semibold text-gray-600 hover:text-black"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {Qty}
                    </span>
                    <button
                      onClick={() => setQty((p) => p + 1)}
                      className="text-2xl font-semibold text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                  <div className="space-x-2">
                    <button className="text-lg font-semibold text-primary px-2">
                      Delete
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
                  <span className="font-bold text-2xl px-2">₹</span>1,21,900.00
                </h1>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-2xl font-medium">
            Subtotal (<span>2</span> items) :{" "}
            <span className="font-bold text-2xl px-2">₹</span>1,21,900.00{" "}
          </h1>
          <div className="w-full block xl:hidden">
            <button className="w-fit px-10 py-2 text-xl font-medium bg-orange-400 text-white rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white hidden h-fit w-fit xl:block sticky top-0 p-2">
        <div className="flex justify-end px-2">
          <h1 className="text-2xl font-medium">
            Subtotal (<span>2</span> items) :{" "}
            <span className="font-bold text-2xl px-2">₹</span>1,21,900.00{" "}
          </h1>
        </div>
        <div className="w-full">
          <button className="w-full px-3 py-2 text-xl font-medium bg-orange-400 text-white rounded">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
