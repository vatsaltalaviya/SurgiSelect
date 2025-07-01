import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, sendOTP, verifyOTP } from "../slices/user.slice";
import axios from "axios";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyOTP, setshowVerifyOTP] = useState(false);
  const navigate = useNavigate();

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [number, setnumber] = useState('')
  const [otp, setotp] = useState('')

 

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleSendOTP = async(e) => {
    e.preventDefault();
    if (!name || !email || !pass || !number) {
      toast.warn("Please fill all fields");
    }
    console.log(email);
    dispatch(sendOTP(email)).then(()=>setshowVerifyOTP(true))
 
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!otp) {
      toast.warn("Please fill otp");
    }
    const userData = {
      name,
      email,
      password:pass,
      number
    }
    dispatch(verifyOTP({ email, otp })).then(()=>dispatch(registerUser(userData))).then(()=> navigate('/'))
  }

  return (
    <div className="flex justify-center items-center h-screen w-full text-black bg-gray-100">
      <div className="bg-white flex shadow-lg rounded-4xl p-2 xl:p-10  gap-3 w-fit">
        <div className="w-xs xl:w-sm h-full lg:block  hidden shrink-0">
          <img
            className="w-full object-cover shadow-2xl rounded-3xl"
            src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262397/log3_crvus2.png"
            alt=""
          />
        </div>
        {showVerifyOTP ? (
          <form
            onSubmit={handleSubmit}
            className="px-5  xl:w-xl shrink-0 py-1 mt-2"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <img
                className="w-32 object-contain"
                src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262395/logo3_xmt7zu.png"
                alt=""
              />
              <h1 className="font-semibold text-xl">Verify your OTP</h1>
            </div>

            <div className="w-full py-2">
              <input
                type="number"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                autoComplete="off"
                className="w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 rounded-md p-4 text-lg"
              />
            
            </div>

            {/* Submit Button */}
            <div className="py-2">
              <button
                type="submit"
                className="w-full text-primary border hover:text-white hover:bg-primary transition-all duration-300 rounded-lg px-3 py-3 font-medium text-lg md:text-2xl"
              >
                {loading ? <BeatLoader size={5} />
               :"Verify OTP"}
              </button>
            </div>

            {/* Register Link */}
            <div className="py-2">
              <p className="text-xs md:text-lg font-medium">
                Already have an Account?
                <Link
                  to="/signup"
                  className="text-primary  font-medium underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSendOTP}
            className="px-5  xl:w-xl shrink-0 py-1 mt-2"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <img
                className="w-32 object-contain"
                src="https://res.cloudinary.com/dbpleky0i/image/upload/v1751262395/logo3_xmt7zu.png"
                alt=""
              />
              <h1 className="font-semibold text-xl">Create your Account</h1>
            </div>
            <div className="w-full py-2">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 rounded-md p-4 text-lg"
              />
             
            </div>
            {/* Email Field */}
            <div className="w-full py-2">
              <input
                type="number"
                placeholder="Enter your Phone no"
                minLength={10}
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                className="w-full phone appearance-none focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 rounded-md p-4 text-lg"
              />
              
            </div>
            {/* Email Field */}
            <div className="w-full py-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full appearance-none focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 rounded-md p-4 text-lg"
              />
             
            </div>

            {/* Password Field */}
            <div className="w-full relative py-2">
              <input
                type={showPassword ? "text" : "password"}
                minLength={6}
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-4 text-lg"
              />
              <i
                onClick={() => setShowPassword((p) => !p)}
                className={`${
                  showPassword ? "ri-eye-off-fill" : "ri-eye-fill"
                } text-xl absolute right-2 top-1/2 transform -translate-y-1/2`}
              />
              
            </div>

            {/* Forgot Password */}
            <div className="py-2">
              <Link
                to="#"
                className="text-primary text-sm font-medium underline"
              >
                Forget Your Password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="py-2">
              <button
                type="submit"
                className="w-full text-primary border hover:text-white hover:bg-primary transition-all duration-300 rounded-lg px-3 py-3 font-medium text-lg md:text-2xl"
              >
                {loading ?<BeatLoader size={7} />
                :"Send OTP"}
              </button>
            </div>

            {/* Register Link */}
            <div className="py-2">
              <p className="text-xs md:text-lg font-medium">
                Already have an Account?
                <Link
                  to="/signup"
                  className="text-primary  font-medium underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
