import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Search, Shield } from "lucide-react";
import { authAPI } from "../../services/api";
import flag from "../../assets/images/flag.png";
import logo from "../../assets/images/icon.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loadUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-orange-200 via-white mt-0 sticky top-0 z-50 bg-green-50">
        <div className="max-w-7xl mx-auto px-5 py-1">
          <div className="flex justify-between items-center text-xs">
            <div className="flex gap-2 items-center">
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

      {/* Main Navbar */}
      <nav className="w-full sticky top-4 z-50 bg-white px-3 py-2 flex items-center justify-between text-white mt-2 shadow-xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            className="w-16 h-16 rounded-full object-cover drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]"
            alt="logo"
          />
          <div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
              SchemeConnect
            </div>
            <div className="text-xs text-gray-500">
              Government Schemes Portal
            </div>
          </div>
        </Link>

        {/* Center Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="nav flex gap-5 font-medium cursor-pointer">
            <li className="relative text-black hover:text-amber-400 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg">
              <Link to="/">Home</Link>
            </li>
            <li className="relative text-black hover:text-amber-400 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg">
              <Link to="/schemes">Schemes</Link>
            </li>
            <li className="relative text-black hover:text-amber-400 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg">
              <Link to="/about">About</Link>
            </li>
            <li className="relative text-black hover:text-amber-400 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="relative text-black hover:text-amber-400 transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full text-lg">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {/* User Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Profile Link */}
              <Link
                to="/profile"
                className="text-gray-700 hover:text-amber-600 transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <User size={20} />
                <span className="hidden md:inline">
                  {user ? user.name : "Profile"}
                </span>
              </Link>

              {/* Admin Panel Link (Only if admin) */}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-4 py-2 font-medium flex items-center gap-2 transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <Shield size={18} />
                  <span className="hidden md:inline">Admin</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-5 py-2 font-medium flex items-center gap-2 transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <span className="hidden md:inline">Logout</span>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-amber-700 text-white rounded-full px-6 py-2 font-medium flex items-center gap-2 transition-all duration-300 hover:bg-amber-600 hover:scale-105 hover:shadow-lg active:scale-95"
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
