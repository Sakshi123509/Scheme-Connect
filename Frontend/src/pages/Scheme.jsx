import React, { useState, useEffect } from "react";
import SchemeCard from "../components/Schemes/SchemeCard";
import Navbar from "../components/Layout/Navbar-light";
import FilterSidebar from "../components/Schemes/FilterSidebar";
import { fetchSchemes } from "../services/api";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes().then((data) => setSchemes(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen px-6 pt-20 pb-14">
        {/* Heading */}
        <div className="max-w-7xl flex justify-center flex-col items-center mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Government <span className="text-green-600">Schemes</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Discover schemes based on your eligibility
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Schemes;
