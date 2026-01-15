import Navbar from "../Layout/Navbar";
import bg from "../../assets/images/bg.jpg";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center w-100% bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-Montserrat text-white leading-snug">
            Unified Government <span className="text-yellow-400">Schemes</span>
          </h1>

          <p className="mt-7 max-w-2xl mb-12 text-lg md:text-2xl text-gray-300">
            Discover government schemes tailored to your eligibility — all in
            one place.
          </p>

          {/* CTA Button */}
          <a href="/schemes">
            <button className="w-full md:w-auto px-8 py-3 cursor-pointer bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 mx-auto group">
              Find Schemes for You
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
