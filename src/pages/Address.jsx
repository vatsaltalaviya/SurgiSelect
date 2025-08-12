import React, { useEffect, useState } from "react";

import { state, city } from "../assets/city";
import SearchableDropdown from "../components/SearchableDropdown";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddress,
  getUserAddress,
  setSelectedAddress,
} from "../slices/user.slice";
import { BeatLoader } from "react-spinners";

const states = state.map((state) => ({
  name: state.name,
  code: state.state_code,
}));

const Address = () => {
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [statecode, setstatecode] = useState("");
  const [cityarr, setcityarr] = useState("");
  const [Address, setaddress] = useState("");
  const [addtype, setaddtype] = useState("Home");
  const [City, setCity] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setpincode] = useState("");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    address = [],
    selectedAddress,
  } = useSelector((state) => state.user);

  function getCitiesByStateName(statecode, city) {
    if (!statecode || !Array.isArray(city)) return [];

    return city
      .filter((c) => c.state_name?.toLowerCase() == statecode.toLowerCase())
      .map((c) => ({
        name: c.name,
      }));
  }
  useEffect(() => {
    dispatch(getUserAddress(userId));
  }, [userId]);
  useEffect(() => {
    if (statecode) setcityarr(getCitiesByStateName(statecode, city));
  }, [statecode]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      statecode === "" ||
      City === "" ||
      address === "" ||
      addtype === "" ||
      pincode === ""
    ) {
      toast.warn("All fields are required");
      return;
    }
    if (pincode.trim().length !== 6) {
      toast.warn("Pincode must be 6 digits");
      return;
    }

    const addressData = {
      userId,
      state: statecode,
      city: City,
      landmark,
      address: Address,
      addressType: addtype,
      pincode,
    };
    const addaddress = await dispatch(AddAddress(addressData));
    if (addaddress) {
      navigate("/order");
    }
  };
  return (
    <div className=" w-full flex flex-col px-2 lg:px-32  py-2 justify-center gap-4 ">
      <table>
        <tbody>
          {address.length != 0 && (
            <div className="  grid grid-cols-1 lg:grid-cols-2 gap-2 space-y-2 py-2">
              {address.length != 0 && loading ? (
                <div className="p-3 border rounded mb-2">
                  <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded mb-2"></div>
                </div>
              ) : (
                address.length != 0 &&
                Array.isArray(address) &&
                address?.map((add, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      dispatch(setSelectedAddress(i));
                    }}
                    className={`${selectedAddress ===i ?"bg-emerald-50 border-emerald-600 flex":""} flex focus:bg-amber-300 justify-between gap-2 border  h-fit rounded px-2 py-1`}
                  >
                    <div>
                      <tr>
                      <td className="w-32 font-medium">Email:</td>
                      <td>{add.email}</td>
                    </tr>
                      <tr>
                      <td className="w-32 font-medium">Phone no:</td>
                      <td>{add.number}</td>
                    </tr>
                      <tr>
                      <td className="w-32 font-medium">LandMark:</td>
                      <td>{add.landmark}</td>
                    </tr>
                    <tr>
                      <td className="w-32 font-medium">Address:</td>
                      <td>{add.address}</td>
                    </tr>
                    <tr>
                      <td className="w-32 font-medium">State:</td>
                      <td>{add.state}</td>
                    </tr>
                    <tr>
                      <td className="w-32 font-medium">Address Type:</td>

                      <td>{add.addressType}</td>
                    </tr>
                    <tr>
                      <td className="w-32 font-medium">PinCode:</td>
                      <td>{add.pincode}</td>
                    </tr>
                    </div>

                    <div>
                      <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === i}
                      onChange={() => {
                        dispatch(setSelectedAddress(i));
                      }}
                    />
                    </div>
                  </div>
                ))
              )}
              
            </div>
          )}
        </tbody>
      </table>
      {address.length != 0 && (
                <button
                  className="px-2 w-32 py-1 rounded-xl bg-primary text-white font-medium my-2"
                  onClick={() => navigate("/order")}
                >
                  Select
                </button>
              )}
      <div className="bg-white px-5 relative border rounded py-2">
        <h1 className="w-full px-2 py-4 text-lg md:text-2xl font-medium">
          Add your new Address
        </h1>
        <form onSubmit={handlesubmit} className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Email
            </span>
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Phone no
            </span>
            <input
              type="text"
              placeholder="Enter Your Phone No"
              value={phone}
              onChange={(e) => {
                  const value = e.target.value
                  const ismatched = /^[6-9]\d{0,9}$/.test(value);
                  if (ismatched || value === ""){
                    setphone(value);
                  }
                }}
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Address
            </span>
            <input
              type="text"
              placeholder="Enter Address"
              value={Address}
              onChange={(e) => setaddress(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Address type
            </span>
            <select
              value={addtype}
              onChange={(e) => setaddtype(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Land Mark
            </span>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setlandmark(e.target.value)}
              placeholder="Enter LandMark"
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">State</span>
            <select
              onChange={(e) => {
                setstatecode(e.target.value);
              }}
              className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            >
              <option>Enter state </option>
              {states.map((st) => (
                <option key={st.name} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">City</span>
            <SearchableDropdown
              options={cityarr}
              placeholder="Enter your locality"
              className="border border-gray-300 rounded relative"
              value={City}
              onChange={(value) => setCity(value.name)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-52 text-sm md:text-lg font-semibold">
              Pincode
            </span>
            <input
              type="text" // Use text to control exact input length
              inputMode="numeric" // Opens number keyboard on mobile
              pattern="\d*" // Only digits
              placeholder="Enter your pincode"
              value={pincode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,6}$/.test(val)) {
                  setpincode(val);
                }
              }}
              className="border border-gray-300 phone rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
            />
          </div>

          <div className="flex gap-4">
            <button className="px-2 py-1 text-lg rounded borde bg-yellow-400">
              {loading ? <BeatLoader size={5} color="white" /> : "Continue"}
            </button>
            <button type="button" className="px-2 py-1 text-lg rounded border">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
