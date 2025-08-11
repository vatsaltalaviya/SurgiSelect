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
  const { loading, address=[], selectedAddress } = useSelector(
    (state) => state.user
  );

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
    if(addaddress){
      navigate("/order");
    }
  };
  return (
    <div className=" w-full flex flex-col lg:flex-row py-2 justify-center gap-4 ">
      {address.length != 0 && (
        <div className="lg:w-1/2 px-2 space-y-2 py-2">
          {address.length != 0 && loading ? (
            <div className="p-3 border rounded mb-2">
              <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded mb-2"></div>
            </div>
          ) : ( address.length!= 0 && Array.isArray(address) &&
            address?.map((add, i) => (
              <div
                key={i}
                className=" flex gap-2 border items-center h-fit rounded px-2 py-1"
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === i}
                  onChange={() => {
                    dispatch(setSelectedAddress(i));
                  }}
                />
                <h3 className="text-lg font-medium">
                  {add.landmark} {add.address} {add.state} {add.pincode}, India
                  <span className="border px-2 mx-2 rounded-full">
                    {add.addressType}
                  </span>
                </h3>
              </div>
            ))
          )}
          {address.length != 0 && (
            <button
              className="px-2 py-1 rounded-xl bg-primary text-white font-medium my-2"
              onClick={() => navigate("/order")}
            >
              Select
            </button>
          )}
        </div>
      )}
      <div className="bg-white px-5 relative border rounded py-2">
        <h1 className="w-full px-2 py-4 text-lg md:text-2xl font-medium">
          Add your new Address
        </h1>
        <form onSubmit={handlesubmit} className="w-full flex flex-col gap-2">
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
