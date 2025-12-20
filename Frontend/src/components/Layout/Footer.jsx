// src/components/Layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/flag.png" alt="Flag" className="h-12 w-12" />
              <div>
                <h3 className="text-xl font-bold">योजना पोर्टल</h3>
                <p className="text-sm text-blue-200">भारत सरकार</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              सभी सरकारी योजनाओं की जानकारी एक जगह। आसान, सुरक्षित और विश्वसनीय।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition">
                  होम
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-blue-200 hover:text-white transition">
                  योजनाएं
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition">
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-blue-200 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4">योजना श्रेणियां</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/schemes?category=women" className="text-blue-200 hover:text-white transition">
                  👩 महिला योजनाएं
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=student" className="text-blue-200 hover:text-white transition">
                  🎓 छात्र योजनाएं
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=farmer" className="text-blue-200 hover:text-white transition">
                  🌾 किसान योजनाएं
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=citizen" className="text-blue-200 hover:text-white transition">
                  🏛️ नागरिक योजनाएं
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">संपर्क जानकारी</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-300 mt-1 flex shrink-0" />
                <span className="text-blue-200 text-sm">
                  नई दिल्ली, भारत
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-300 flex shrink-0" />
                <span className="text-blue-200 text-sm">1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-300 flex shrink-0" />
                <span className="text-blue-200 text-sm">support@yojana.gov.in</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">हमसे जुड़ें</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-300 hover:text-white transition">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white transition">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white transition">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-blue-300 hover:text-white transition">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm text-center md:text-left">
              © 2024 भारत सरकार | सभी अधिकार सुरक्षित
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-blue-200 hover:text-white text-sm transition">
                गोपनीयता नीति
              </Link>
              <Link to="/terms" className="text-blue-200 hover:text-white text-sm transition">
                नियम और शर्तें
              </Link>
              <Link to="/sitemap" className="text-blue-200 hover:text-white text-sm transition">
                साइट मैप
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;