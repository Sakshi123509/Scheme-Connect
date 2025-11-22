import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div>
      <div className="navbar flex justify-between items-center p-2 bg-gray-100">
        <div className="top text-black font-semibold font-serif m-1">
          Government of India | भारत सरकार
        </div>
        <button>English</button>
      </div>

      <div className="middle flex justify-center p-3">
        <img src={logo} alt="Logo" className="h-20" />
      </div>
    </div>
  );
};

export default Navbar;
