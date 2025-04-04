import React, { useState } from "react";
import { assets } from "../assets/assets";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f0e6]">
      {/* Header Section */}
      <div className="text-center mb-6 relative bottom-16">
        <img
          src={assets.logo}
          alt="Admin Logo"
          className="h-20 mx-auto w-40 mb-0"
        />
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 relative bottom-16">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
          Admin Panel
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your credentials to access your account.
        </p>
        <form className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88662b]"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88662b]"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 5a7 7 0 100 14 7 7 0 000-14zM12 9a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ad8237] text-white py-2 rounded-lg hover:bg-[#725524] transition"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Forgot your password?{" "}
          <span className="text-red-600 cursor-pointer hover:underline">
            Reset Password
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;