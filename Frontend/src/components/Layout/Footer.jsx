import logo from "../../assets/images/dark-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-200 text-sm py-10">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-25 px-6">
        {/* Logo and Info */}
        <div>
          <div className="flex content-around gap-3 mb-3">
            <img
              src={logo}
              alt="SchemeConnect Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <h3 className="font-semibold text-lg">Scheme<span className="font-semibold text-amber-500">Connect</span></h3>
          </div>
          <p className="text-gray-300 text-justify">© 2025 SchemeConnect</p>
          <p className="mt-2 text-gray-300 text-xs">
            <span className="font-semibold">Powered by Digital India</span>
            <br />
            Digital India Corporation (DIC)
            <br />
            Ministry of Electronics & IT (MeitY)
            <br />
            Government of India®
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer"> {">"} About Us</li>
            <li className="hover:text-white cursor-pointer">
              {" "}
              {">"} Contact Us
            </li>
            <li className="hover:text-white cursor-pointer">
              {" "}
              {">"} Dashboard
            </li>
            <li className="hover:text-white cursor-pointer"> {">"} FAQs</li>
            <li className="hover:text-white cursor-pointer">
              {" "}
              {">"} Disclaimer
            </li>
            <li className="hover:text-white cursor-pointer">
              {">"} Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-bold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li className="hover:text-white cursor-pointer">DigiLocker</li>
            <li className="hover:text-white cursor-pointer">UMANG</li>
            <li className="hover:text-white cursor-pointer">MyGov</li>
            <li className="hover:text-white cursor-pointer">India.gov.in</li>
            <li className="hover:text-white cursor-pointer">Data.gov.in</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-2">Get in Touch</h3>
          <p className="text-gray-300 text-xs">
            4th Floor, NeGD, Electronics Niketan,
            <br />
            6 CGO Complex, Lodhi Road,
            <br />
            New Delhi – 110003, India
          </p>
          <p className="mt-2 text-gray-300 text-xs">
            support@schemeconnect.gov.in
            <br />
            +91-11-24303714 (9:00 AM to 5:30 PM)
          </p>
        </div>
      </div>
      <footer className="text-center text-gray-300 py-4 border-t border-gray-600 mt-8">
        © 2025 SchemeConnect. All rights reserved.
      </footer>
    </footer>
  );
};

export default Footer;
