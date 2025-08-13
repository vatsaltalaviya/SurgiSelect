import React, { useEffect, useState } from "react";

import { state, city } from "../assets/city";
import SearchableDropdown from "../components/SearchableDropdown";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAddress,
  deleteAddress,
  getUserAddress,
  setSelectedAddress,
  updateAddress,
} from "../slices/user.slice";
import { BeatLoader } from "react-spinners";

const states = state.map((state) => ({
  name: state.name,
  code: state.state_code,
}));

const Address = () => {
  const [formData, setFromData] = useState({
    fullName: "",
    email: "",
    number: "",
    state: "",
    pincode: "",
    city: "",
    landmark: "",
    address: "",
    addressType: "Home",
  });

  const [showform, setshowForm] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);

  const [cityarr, setcityarr] = useState("");

  const [updateId, setUpdateId] = useState("");
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    addressLoading,
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
    if (formData.state) setcityarr(getCitiesByStateName(formData.state, city));
  }, [formData.state]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      formData.fullName == "" ||
      formData.email == "" ||
      formData.number == "" ||
      formData.state == "" ||
      formData.pincode == "" ||
      formData.city == "" ||
      formData.landmark == "" ||
      formData.address == "" ||
      formData.addressType == ""
    ) {
      toast.warn("All fields are required");
      return;
    }
    if (formData.pincode.trim().length !== 6) {
      toast.warn("Pincode must be 6 digits");
      return;
    }

    const addressData = {
      userId,
      ...formData,
    };

    try {
      const addaddress = await dispatch(AddAddress(addressData));
      if (addaddress) {
        navigate("/order");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAddress = async (id) => {
    const res = await dispatch(deleteAddress(id)).unwrap();
    if (res) {
      toast.success(res);
      dispatch(getUserAddress(userId));
    }
  };
  const handleUpdateData = (selectedAddress, id) => {
    const updateData = {
      fullName: address[selectedAddress]?.fullName || "",
      email: address[selectedAddress]?.email || "",
      number: address[selectedAddress]?.number || "",
      state: address[selectedAddress]?.state || "",
      pincode: address[selectedAddress]?.pincode || "",
      city: address[selectedAddress]?.city || "",
      landmark: address[selectedAddress]?.landmark || "",
      address: address[selectedAddress]?.address || "",
      addressType: address[selectedAddress]?.addressType || "Home",
    };
    setFromData(updateData);
    setshowForm(true);
    setisUpdate(true);
    setUpdateId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      formData.fullName == "" ||
      formData.email == "" ||
      formData.number == "" ||
      formData.state == "" ||
      formData.pincode == "" ||
      formData.city == "" ||
      formData.landmark == "" ||
      formData.address == "" ||
      formData.addressType == ""
    ) {
      toast.warn("All fields are required");
      return;
    }
    if (formData.pincode.trim().length !== 6) {
      toast.warn("Pincode must be 6 digits");
      return;
    }

    const addressData = {
      userId,
      ...formData,
    };
    try {
      const addaddress = await dispatch(
        updateAddress({ id: updateId, addressData })
      );
      if (addaddress) {
        toast.success("Address updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full min-h-screen flex flex-col px-2 lg:px-32 py-2 gap-4 ">
      <div className="space-y-2 py-2">
        {addressLoading ? (
          <div className="w-full rounded mb-2">
            <AddressLoading />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {address?.length != 0 &&
              Array.isArray(address) &&
              address?.map((add, i) => (
                <div
                  key={i}
                  onClick={() => {
                    dispatch(setSelectedAddress(i));
                  }}
                  className={`${
                    selectedAddress === i
                      ? "bg-emerald-50 border-emerald-600 flex"
                      : ""
                  } flex focus:bg-amber-300 justify-between gap-2 border  h-fit rounded-lg px-2 py-1`}
                >
                  <div>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Name:
                      </span>
                      <span className="text-sm ">{add.fullName}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Email:
                      </span>
                      <span className="text-sm ">{add.email}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Phone no:
                      </span>
                      <span className="text-sm ">{add.number}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        LandMark:
                      </span>
                      <span className="text-sm ">{add.landmark}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Address:
                      </span>
                      <span className="text-sm ">{add.address}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        State:
                      </span>
                      <span className="text-sm ">{add.state}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Address Type:
                      </span>

                      <span className="text-sm ">{add.addressType}</span>
                    </p>
                    <p>
                      <span className="w-32 inline-block font-medium">
                        Pincode:
                      </span>
                      <span className="text-sm ">{add.pincode}</span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end ">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === i}
                      onChange={() => {
                        dispatch(setSelectedAddress(i));
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(add._id)}
                      >
                        <i className="ri-delete-bin-6-fill text-lg text-red-500"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateData(i, add._id)}
                      >
                        <i className="ri-file-edit-fill text-lg text-blue-500"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex w-full justify-center">
        <button
          onClick={() => {
            setshowForm(true);
            setisUpdate(false);
            setFromData({
              fullName: "",
              email: "",
              number: "",
              state: "",
              pincode: "",
              city: "",
              landmark: "",
              address: "",
              addressType: "Home",
            });
          }}
          className="w-52 px-2 py-2 text-lg text-white bg-primary font-medium rounded"
        >
          Add Your Address
        </button>
      </div>

      {showform && (
        <div className="bg-white px-5 relative border rounded py-2">
          <h1 className="w-full px-2 py-4 text-lg md:text-2xl font-medium">
            Add your new Address
          </h1>
          {isUpdate ? (
            <form
              onSubmit={handleUpdate}
              className="w-full flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  value={formData.fullName || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Email
                </span>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({ ...prev, email: e.target.value }))
                  }
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
                  value={formData.number || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const ismatched = /^[6-9]\d{0,9}$/.test(value);
                    if (ismatched || value === "") {
                      setFromData((prev) => ({ ...prev, number: value }));
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
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Address type
                </span>
                <select
                  value={formData.addressType || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      addressType: e.target.value,
                    }))
                  }
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
                  value={formData.landmark || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      landmark: e.target.value,
                    }))
                  }
                  placeholder="Enter LandMark"
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  State
                </span>
                <select
                  value={formData.state || ""}
                  onChange={(e) => {
                    setFromData((prev) => ({ ...prev, state: e.target.value }));
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
                <span className="w-52 text-sm md:text-lg font-semibold">
                  City
                </span>
                <SearchableDropdown
                  options={cityarr}
                  placeholder="Enter your locality"
                  className="border border-gray-300 rounded relative"
                  value={formData.city || ""}
                  onChange={(value) =>
                    setFromData((prev) => ({ ...prev, city: value.name }))
                  }
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
                  value={formData.pincode || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,6}$/.test(val)) {
                      setFromData((prev) => ({ ...prev, pincode: val }));
                    }
                  }}
                  className="border border-gray-300 phone rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>

              <div className="flex gap-4">
                <button className="px-2 py-1 text-lg rounded borde bg-yellow-400">
                  {addressLoading ? (
                    <BeatLoader size={5} color="white" />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-lg rounded border"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handlesubmit}
              className="w-full flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  value={formData.fullName || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Email
                </span>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({ ...prev, email: e.target.value }))
                  }
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
                  value={formData.number || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const ismatched = /^[6-9]\d{0,9}$/.test(value);
                    if (ismatched || value === "") {
                      setFromData((prev) => ({ ...prev, number: value }));
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
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  Address type
                </span>
                <select
                  value={formData.addressType || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      addressType: e.target.value,
                    }))
                  }
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
                  value={formData.landmark || ""}
                  onChange={(e) =>
                    setFromData((prev) => ({
                      ...prev,
                      landmark: e.target.value,
                    }))
                  }
                  placeholder="Enter LandMark"
                  className="border border-gray-300 rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="w-52 text-sm md:text-lg font-semibold">
                  State
                </span>
                <select
                  value={formData.state || ""}
                  onChange={(e) => {
                    setFromData((prev) => ({ ...prev, state: e.target.value }));
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
                <span className="w-52 text-sm md:text-lg font-semibold">
                  City
                </span>
                <SearchableDropdown
                  options={cityarr}
                  placeholder="Enter your locality"
                  className="border border-gray-300 rounded relative"
                  value={formData.city || ""}
                  onChange={(value) =>
                    setFromData((prev) => ({ ...prev, city: value.name }))
                  }
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
                  value={formData.pincode || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,6}$/.test(val)) {
                      setFromData((prev) => ({ ...prev, pincode: val }));
                    }
                  }}
                  className="border border-gray-300 phone rounded px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-full"
                />
              </div>
              <div className="flex gap-4">
                <button className="px-2 py-1 text-lg rounded borde bg-primary text-white">
                  {addressLoading ? (
                    <BeatLoader size={5} color="white" />
                  ) : (
                    "Add"
                  )}
                </button>
                <button
                  type="button"
                  className="px-2 py-1 text-lg rounded border"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;

function AddressLoading() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-2 animate-pulse duration-200">
      <div
        className={`flex  justify-between gap-2 border  h-32 rounded px-2 py-1`}
      >
        <div className="space-y-1.5">
          <div className="w-full flex gap-2">
            <div className="!w-32 py-3 font-medium bg-gray-300 rounded"></div>
            <div className="!w-40 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
          <div className="w-full flex gap-2">
            <div className="!w-28 py-3 font-medium bg-gray-300 rounded"></div>
            <div className="!w-36 ml-4 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
        </div>

        <div>
          <div className="w-full flex gap-2">
            <div className="size-5 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div
        className={`flex  justify-between gap-2 border  h-32 rounded px-2 py-1`}
      >
        <div className="space-y-1.5">
          <div className="w-full flex gap-2">
            <div className="!w-32 py-3 font-medium bg-gray-300 rounded"></div>
            <div className="!w-40 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
          <div className="w-full flex gap-2">
            <div className="!w-28 py-3 font-medium bg-gray-300 rounded"></div>
            <div className="!w-36 ml-4 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
        </div>

        <div>
          <div className="w-full flex gap-2">
            <div className="size-5 py-3 font-medium bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
