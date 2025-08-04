import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
// import { verifyOTP } from "../slices/user.slice";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const { loading ,email } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const fullOtp = otp.join("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullOtp) {
      toast.warn("Please fill OTP");
      return;
    }
    // try {
    //     const result = await dispatch(verifyOTP({ email, fullOtp })).unwrap();
    //     if(result){
    //       toast.success("OTP verified successfully");
    //           navigate('/resetpassword')
    //     }
    //   } catch (err) {
    //     console.log("Error:", err);
    //     toast.error(err || "Enter valid OTP");
    //   }
  };
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (!e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // This is your final 6-digit OTP
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
            <h1 className="font-semibold text-xl">Verify OTP</h1>
          </div>
          {/* Email Field */}
          <label className="text-lg py-2 font-medium" htmlFor="">
            OTP Send to your email check your email
          </label>
          <div className="w-full py-2 flex  justify-center items-center gap-3 mt-6">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-xl text-center border-2 border-gray-500 rounded-xl outline-none focus:border-gray-900"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="py-2">
            <button
              type="submit"
              className="w-full text-primary border hover:text-white hover:bg-primary transition-all duration-300 rounded-lg px-3 py-3 font-medium text-lg md:text-2xl"
            >
              {loading ? <BeatLoader size={5} /> : "Verify OTP"}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
