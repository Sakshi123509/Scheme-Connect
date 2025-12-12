// src/components/Layout/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Search } from "lucide-react";
import flag from "../../assets/flag.png";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will be replaced with AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-linear-to-r from-orange-200 via-white bg-green-50">
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

      {/* Main Navbar - myScheme Style */}
      <nav className="shadow-md bg-white top-0 z-50 flex items-center justify-between px-6 py-2 md:py-4">
        <div className="flex items-center gap-4">
          <img src={logo} className="w-100% h-10 py-1 px-4" alt="" />
          <h2 className="font-bold text-2xl font-">SchemeIndia</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-5 ">
            <li>Home</li>
            <li>About</li>
            <li>Schemes</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout}>
              Logout <LogOut className="inline-block ml-1" size={16} />
              SignUp{" "}
            </button>
          ) : (
            <button
              className="bg-amber-800 text-white rounded-full px-3 cursor-pointer hover:bg-amber-600 py-1"
              onClick={() => navigate("/login")}
              class
            >
              Login <User className="inline-block ml-1 border bg-amber-800" size={16} />
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
