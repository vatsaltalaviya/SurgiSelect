import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
// import { getemailforreset, sendforgetOTP } from "../slices/user.slice";

const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your Email");
      return;
    }
    try {
      const result = await dispatch(sendforgetOTP(email)).unwrap();
     if(result){
       toast.success(result);
      dispatch(getemailforreset(email));
      navigate("/verifyotp");
     }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="lg:flex justify-center items-center h-screen w-full text-black bg-white lg:bg-gray-100">
      <div className="bg-white flex justify-center lg:shadow-lg lg:rounded-4xl p-2 xl:p-10  gap-3 ">
        <div className="w-xs xl:w-sm xl:block  hidden shrink-0">
          <img
            className="w-full object-cover shadow-2xl rounded-3xl"
            src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262397/log3_crvus2.png"
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="xl:px-5 w-full xl:w-xl shrink-0 px-2 py-1 mt-2"
        >
          <div className="flex flex-col items-center gap-2 mb-4">
            <img
              className="w-32 object-contain"
              src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262395/logo3_xmt7zu.png"
              alt=""
            />
            <h1 className="font-semibold text-xl">Forget password ?</h1>
          </div>
          {/* Email Field */}
          <div className="w-full py-2">
            <label className="text-lg py-2 font-medium" htmlFor="">
              Enter email to reset password
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 rounded-md p-2 lg:p-4 text-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="py-2">
            <button
              type="submit"
              className="w-full text-primary border hover:text-white hover:bg-primary transition-all duration-300 rounded-lg px-3 py-3 font-medium text-lg md:text-2xl"
            >
              {loading ? <BeatLoader size={5} /> : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
