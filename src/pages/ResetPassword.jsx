import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getemailforreset, resetpassword } from "../slices/user.slice";
import { BeatLoader } from "react-spinners";

const ResetPassword = () => {
  const [newPassword, setnewPassword] = useState("");
  const [confirmnewPassword, setconfirmnewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { email } = useSelector((state) => state.user);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmnewPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmnewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if(newPassword == confirmnewPassword){
      try {
      const result = await dispatch(resetpassword({ email, newPassword })).unwrap();
      if (result) {
        toast.success("Password reset successfully");
        dispatch(getemailforreset(null));
        navigate("/signin");
        
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err || "Enter valid OTP");``
    }
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
            <h1 className="font-semibold text-xl">Reset password</h1>
          </div>
          {/* Email Field */}
          <div className="w-full relative py-2">
            <input
              type={ "text" }
              minLength={6}
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2 lg:p-4 text-lg"
            />
            {/* <i
              onClick={() => setShowPassword((p) => !p)}
              className={`${
                showPassword ? "ri-eye-off-fill" : "ri-eye-fill"
              } text-xl absolute right-2 top-1/2 transform -translate-y-1/2`}
            /> */}
          </div>
          <div className="w-full relative py-2">
            <input
              type={showPassword ? "text" : "password"}
              minLength={6}
              value={confirmnewPassword}
              onChange={(e) => setconfirmnewPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-2 lg:p-4 text-lg"
            />
            <i
              onClick={() => setShowPassword((p) => !p)}
              className={`${
                showPassword ? "ri-eye-off-fill" : "ri-eye-fill"
              } text-xl absolute right-2 top-1/2 transform -translate-y-1/2`}
            />
          </div>

          {/* Submit Button */}
          <div className="py-2">
            <button
              type="submit"
              className="w-full text-primary border hover:text-white hover:bg-primary transition-all duration-300 rounded-lg px-3 py-3 font-medium text-lg md:text-2xl"
            >
              {loading ? <BeatLoader size={5} /> : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
