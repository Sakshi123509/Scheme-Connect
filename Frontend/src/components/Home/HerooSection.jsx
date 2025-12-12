import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import HeroImage from "../../assets/images/unnamed.jpg";

const HeroSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    {
      text: "सशक्त नागरिक, समृद्ध भारत",
      english: "Empowered Citizens, Prosperous India"
    },
    {
      text: "हर योजना, हर नागरिक के लिए",
      english: "Every Scheme, For Every Citizen"
    },
    {
      text: "सेवा, सुशासन, गरीब कल्याण",
      english: "Service, Good Governance, Welfare"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[88vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute object-fit inset-0 bg-cover bg-no-repeat"
        style={{
            backgroundSize: "100% auto",  
          backgroundImage: `url(${HeroImage})`,
          backgroundPosition: "center top 55%",
          // backgroundSize: "cover",
        }}
      >
      </div>
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl space-y-8">
          
          {/* Badge */}
         
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
              <span className="block mb-2">All Schemes,</span>
              <span className="bg-linear-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
            One Platform
              </span>
            </h1>
            
            {/* Rotating Quotes */}
            <div className="h-28 overflow-hidden">
              <div 
                className="transition-all duration-1000 ease-in-out transform"
                style={{
                  transform: `translateY(-${currentQuote * 112}px)`
                }}
              >
                {quotes.map((quote, index) => (
                  <div key={index} className="h-28 flex flex-col justify-center">
                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                      {quote.text}
                    </p>
                    <p className="text-lg lg:text-xl text-gray-600 italic">
                      "{quote.english}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl p-4 rounded-xl">
            500+ सरकारी योजनाओं की पूरी जानकारी, पात्रता और आवेदन प्रक्रिया। 
            अपने लिए सही योजना खोजें और लाभ उठाएं।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('schemes')}
              className="px-4 py-2 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-full font-bold text-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explore Schemes
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg border-2 border-orange-600 hover:bg-orange-50 transition-all shadow-lg"
            >
              Learn More
            </button>
          </div>

          {/* Quote indicator dots */}
          <div className="flex gap-2 pt-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentQuote === index ? 'bg-orange-600 w-8' : 'bg-gray-400 w-2'
                }`}
                aria-label={`Quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;