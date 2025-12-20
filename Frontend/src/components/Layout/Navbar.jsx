// src/components/Layout/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Search } from "lucide-react";
import flag from "../../assets/flag.png";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will be replaced with AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="bg-linear-to-r from-orange-200 via-white mt-0 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 py-1">
          <div className="flex justify-between items-center text-xs">
            <div className="flex  gap-2 items-center">
              <img src={flag} className="w-4 h-5" alt="" />
              <div className="text-gray-700 font-medium">
                भारत सरकार | Government of India
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-700 font-bold hover:text-blue-600"
              >
                हिंदी
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 font-bold hover:text-blue-600"
              >
                English
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="
  w-full 
  absolute 
  top-4 
  px-3 
  py-4 
  flex 
  items-center 
  justify-between
  bg-transparent
  text-white
"
      >
        <div className="flex items-center gap-4">
          <img src={logo} className="w-100% h-10 py-1 px-4" alt="" />
          <h2 className="logo text-2xl text-yellow-400 font-bold tracking-wide">
            Scheme-India
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="nav flex gap-5 colour-white font-medium cursor-pointer">
            <li className="hover:text-amber-400 hover:scale-110 transition-all duration-200">
              Home
            </li>
            <li className="hover:text-amber-400 hover:scale-110 transition-all duration-200">
              About
            </li>
            <li className="hover:text-amber-400 hover:scale-110 transition-all duration-200">
              Schemes
            </li>
            <li className="hover:text-amber-400 hover:scale-110 transition-all duration-200">
              Blog
            </li>
            <li className=" hover:text-amber-400">Contact</li>
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="
      bg-yellow-600
      text-white 
      rounded-full 
      px-5 
      py-2 
      font-medium 
      flex 
      items-center 
      gap-2 
      transition-all 
      duration-300 
      hover:bg-yellow-500
      hover:scale-110 
      hover:shadow-lg 
      active:scale-95
    "
            >
              Logout
              <LogOut size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {/* Login Button */}
              <button
                onClick={() => navigate("/login")}
                className="nav-login cursor-pointer  bg-amber-700   text-white rounded-full  px-6 py-0.5
        font-medium 
        flex 
        items-center 
        gap-2 
        transition-all 
        duration-300 
        hover:bg-amber-600 
        hover:scale-110 
        hover:shadow-lg 
        active:scale-95
      "
              >
                Login
                <User size={18} />
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
