import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {token,setToken,backendUrl} = useContext(ShopContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTimeout(() => {
        setShowPassword(false);
      }, 4000);
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/v1/users/login`,{email,password})
      if(response.status === 200){
        const token = response.data?.data?.token;
        setToken(token);
        toast.success("Logged in successfully");
        localStorage.setItem('token',token)
      }
      
    } catch (error) {
      toast.error(error.response?.data?.errors)
      if(error.response?.data?.errors === "User not found"){
          navigate('/sign-up')
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return  (
    <div className="sm:h-screen absolute sm:relative top-[13%] right-1 sm:right-0 sm:top-0 w-full flex md:flex-col justify-center items-center bg-[#fffefe]">
      <div className="border-2 border-gray-300 flex flex-col md:flex-row h-3/4 w-3/4 items-center bg-[#f9f8f7] shadow-md rounded-lg">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-center font-bold text-2xl mb-6">Login to your account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                placeholder="dancing.potato@hellomail.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#b37f5a]"
              />
            </label>
            <label className="flex flex-col relative">
              <span className="text-gray-700">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="SuperSecure123!"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#b37f5a]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 top-7 flex items-center"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-6 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5C7 5 3 8 3 12s4 7 9 7 9-3 9-7-4-7-9-7zm0 2a5 5 0 110 10 5 5 0 010-10z"
                    />
                  </svg>
                )}
              </button>
            </label>

            <a
              href="/forgot-password"
              className="text-sm text-red-600 hover:underline self-end"
            >
              Forgot Password?
            </a>
            <button className="bg-[#b37f5a] text-white rounded-lg py-2 hover:bg-[#6F4E37]">
              Login Now
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
              onClick={() => navigate('/sign-up')}
            >
              Join free today
            </a>
          </p>
          {/* <div className="mt-4 flex justify-center">
            <button className="flex items-center border border-gray-300 rounded-lg py-2 px-4 text-sm hover:bg-gray-100">
              <img src="" alt="Google Icon" className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </div> */}
        </div>

        <div className="sm:flex w-full md:w-1/2 h-full hidden p-8 text-center flex-col items-center justify-center bg-[#fee8db]">
          <img
            className="h-24  mb-4 relative bottom-16"
            src={assets.logo}
            alt="Quickpick Logo"
          />
          <h3 className="font-bold text-xl mb-2 relative bottom-14">WELCOME BACK!</h3>
          <p className="text-gray-700 relative bottom-12">
            You're just one step away from unlocking your perfect style with
            Quickpick! Sign in now to explore the latest trends, curated
            collections, and exclusive deals tailored just for you. Your fashion
            journey starts here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
