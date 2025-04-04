import React from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Navbar = ({setToken}) => {
  const handleClick = ()=> {
    localStorage.setItem("token","");
    setToken("")
    toast.success("logged out successfully");
  }
  return (
    <div className="flex justify-between px-[2.5%] py-2 items-center">
      <img
        src={assets.logo}
        alt="Company logo"
        className="w-[max(12%,90px)]"
      />
      <button
      onClick={handleClick}
      className='bg-gray-600 py-2 px-5 sm:py-3 sm:px-8 rounded-full text-sm @sm:text-xs text-white cursor-pointer'>Logout</button>

    </div>
  );
};

export default Navbar;
