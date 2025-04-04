import React from "react";
import logo from "../assets/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = React.useState(false);
  const { setShowSearch, getCartCount, setToken, setCartItem, token} = React.useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleClick = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
  }

  return (
    <div className="flex justify-between items-center sm:py-2 font-medium">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="sm:w-[163px] sm:h-[103px] w-[115px] h-[95px] object-contain"
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "text-[#da9a5a]" : "text-gray-700"
            } flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
          }
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `${
              isActive ? "text-[#da9a5a]" : "text-gray-700"
            } flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
          }
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${
              isActive ? "text-[#da9a5a]" : "text-gray-700"
            } flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
          }
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive ? "text-[#da9a5a]" : "text-gray-700"
            } flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
          }
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `${
              isActive ? "text-[#da9a5a]" : "text-gray-700"
            } flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
          }
        >
          <p>ORDERS </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        { token && <a onClick={handleClick} href="">
          <p
            className={({ isActive }) =>
              `${
                isActive ? "text-[#da9a5a]" : "text-gray-700"
              }flex flex-col items-center gap-1 hover:text-[#da9a5a] transition-colors duration-300`
            }
          >
            LOGOUT
          </p>
        </a>}
        <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
      </ul>
      <div className="flex justify-center items-center gap-6">
        {location.pathname.includes("collection") && (
          <img
            className="w-5 object-contain cursor-pointer"
            src={assets.search_icon}
            alt="search icon"
            onClick={() => setShowSearch(true)}
          />
        )}
        {/* <NavLink
          className="text-md sm:block hidden font-normal shadow-lg  text-gray-800 border hover:border-gray-950 border-gray-400 p-[8px] rounded-3xl"
          to="/admin-login"
        >
          Admin Login
        </NavLink> */}
        <div className="flex gap-2 relative">
          <img
            className="w-5 object-contain cursor-pointer"
            src={assets.profile_icon}
            alt="profile icon"
            onClick={() => navigate("/login")}
          />
        </div>
        <Link to="/cart" className="relative cursor-pointer">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] -bottom-[8px] w-4 rounded-full bg-black text-white text-center leading-4 aspect-square text-[9px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => {
            setToggle(!toggle);
          }}
          src={assets.menu_icon}
          className="w-6 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-trnsform ease-in-out delay-75 duration-700 ${
          toggle ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center p-4 gap-4">
            <img
              onClick={() => {
                setToggle(!toggle);
              }}
              src={assets.dropdown_icon}
              className="rotate-180 h-4 cursor-pointer"
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => {
              setToggle(!toggle);
            }}
            to="/"
            className="text-black py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => {
              setToggle(!toggle);
            }}
            to="/collection"
            className="text-black py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => {
              setToggle(!toggle);
            }}
            to="/about"
            className="text-black py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => {
              setToggle(!toggle);
            }}
            to="/contact"
            className="text-black py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => {
              setToggle(!toggle);
            }}
            to="/order"
            className="text-black py-2 pl-6 border"
          >
            ORDERS
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
