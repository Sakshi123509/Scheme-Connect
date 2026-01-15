import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Search } from "lucide-react";
import flag from "../../assets/images/flag.png";
import logo from "../../assets/images/dark-logo.jpg";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-linear-to-r from-orange-200 via-white mt-0 sticky top-0 z-50 bg-green-50">
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
          <img
            src={logo}
            className="w-16 h-16 rounded-full object-cover drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]"
            alt="logo"
          />

          <div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-yellow-400">
              SchemeConnect
            </div>
            <div className="text-xs text-gray-200">
              Government Schemes Portal
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="nav flex gap-5 colour-white font-medium cursor-pointer">
            <li
              className="
  relative 
  hover:text-amber-400 
  transition-all duration-300
  after:content-[''] after:absolute after:left-0 after:-bottom-1
  after:h-0.5 after:w-0 after:bg-amber-400
  after:transition-all after:duration-300
  hover:after:w-full text-lg
"
            >
              <Link to="/" className="hover:text-amber-400">
                Home
              </Link>
            </li>
            <li
              className="
  relative 
  hover:text-amber-400 
  transition-all duration-300
  after:content-[''] after:absolute after:left-0 after:-bottom-1
  after:h-0.5 after:w-0 after:bg-amber-400
  after:transition-all after:duration-300 text-lg
  hover:after:w-full
"
            >
              <Link to="/schemes" className="hover:text-amber-400">
                Schemes
              </Link>
            </li>
            <li
              className="
  relative 
  hover:text-amber-400 
  transition-all duration-300
  after:content-[''] after:absolute after:left-0 after:-bottom-1
  after:h-0.5 after:w-0 after:bg-amber-400 text-lg
  after:transition-all after:duration-300
  hover:after:w-full
"
            >
              <Link to="/about" className="hover:text-amber-400">
                About
              </Link>
            </li>
            <li
              className="
  relative 
  hover:text-amber-400 
  transition-all duration-300
  after:content-[''] after:absolute after:left-0 after:-bottom-1
  after:h-0.5 after:w-0 after:bg-amber-400  text-lg
  after:transition-all after:duration-300
  hover:after:w-full
"
            >
              <Link to="/Blogs" className="hover:text-amber-400">
                Blogs
              </Link>
            </li>
            <li
              className="
  relative 
  hover:text-amber-400 
  transition-all duration-300
  after:content-[''] after:absolute after:left-0 after:-bottom-1
  after:h-0.5 after:w-0 after:bg-amber-400 text-lg
  after:transition-all after:duration-300
  hover:after:w-full
"
            >
              <Link to="/contact" className="hover:text-amber-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <Search size={20} className="text-white mr-4 cursor-pointer" />

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="
      bg-[#F4D03F]
        nav-logout
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
            <button
              onClick={() => navigate("/login")}
              className="
        nav-login 
        cursor-pointer  
        bg-amber-700   
        text-white 
        rounded-full  
        px-6 
        py-0.5
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
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
