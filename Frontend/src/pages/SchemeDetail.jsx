import React, { useState } from "react";
import pmayimg from "../assets/images/PMAY.png";
import {
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Users,
  FileText,
  ArrowLeft,
  Gift,
  CheckCircle2,
} from "lucide-react";

const SchemeDetailPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const scheme = {
    id: 1,
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    category: "Housing",
    ministry: "Ministry of Housing and Urban Affairs",
    status: "Active",
    image: pmayimg,
    description:
      "Pradhan Mantri Awas Yojana (PMAY) is a flagship initiative by the Government of India aimed at providing affordable housing to the urban poor. Launched in 2015, the scheme seeks to ensure 'Housing for All' by 2022 by offering financial assistance and subsidies to eligible beneficiaries for the construction or enhancement of their homes.",
    benefits: [
      "Interest subsidy on home loans",
      "Financial assistance up to ₹2.5 lakh",
      "Preference to women owners",
      "Affordable housing with basic amenities",
      "interestSubsidy Interest subsidy on home loans under CLSS",
      "maxSubsidyAmount Up to ₹2.67 lakh",
      "emiReduction Lower EMIs due to reduced interest rates",
      "transferMode   Direct Benefit Transfer (DBT)",
    ],
    eligibility: [
      "Annual income less than ₹18 lakh",
      "No pucca house in any part of India",
      "First-time home buyer",
      "Indian citizen",
    ],
    documents: [
      "Aadhaar Card",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Bank Account Details",
      "Land ownership documents",
      "Ration Card",
      "Passport size photographs",
      "Address Proof",
      "MGNREGA Job Card (if available)",
    ],
    applicationProcess: [
      "Visit the official PMAY website",
      "Register with Aadhaar number",
      "Fill the application form with required details",
      "Upload necessary documents",
      "Submit the application",
      "Track application status online",
    ],
    deadline: "31st March 2025",
    budget: "₹2,00,000 Crore",
    beneficiaries: "10 Million+ families",
    website: "https://pmaymis.gov.in/",
    helpline: "1800-11-6163",
  };

  const handleSave = () => setIsSaved(!isSaved);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: scheme.name,
        text: scheme.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-yellow-600 hover:text-green-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Schemes
          </button>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{ backgroundImage: `url(${scheme.image})` }}
        className="bg-cover bg-bottom h-[420px] relative flex items-center justify-center text-white"
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative text-center max-w-4xl px-6">
          <span className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm mb-4">
            {scheme.status}
          </span>

          {/* TITLE with yellow highlight */}
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            {scheme.name.split(" ").slice(0, 4).join(" ")}
            <span className="text-yellow-400">
              {" "}
              {scheme.name.split(" ").slice(4).join(" ")}
            </span>
          </h1>

          <p className="text-gray-200 mt-4 text-lg">{scheme.ministry}</p>

          <div className="flex justify-center gap-8 mt-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {scheme.beneficiaries}
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="w-5 h-5" />
              {scheme.deadline}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="p-3 rounded-full bg-white hover:bg-amber-50 transition"
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isSaved ? "text-amber-600 fill-amber-600" : "text-gray-600"
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-3 bg-white text-blue-600 rounded-full hover:bg-amber-50 transition"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Main Content */}
        <div className="lg:col-span-2 bg-white p-6 rounded shadow">
          <nav className="flex gap-4 border-b mb-6 overflow-x-auto">
            {[
              "overview",
              "eligibility",
              "benefits",
              "documents",
              "process",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-amber-600 text-amber-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div>
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                  About the Scheme
                </h2>
                <p className="text-gray-700 leading-relaxed max-w-xl text-justify">
                  {scheme.description}
                </p>
              </div>
            )}

            {activeTab === "eligibility" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Eligibility Criteria
                </h2>
                <ul className="space-y-3">
                  {scheme.eligibility.map((e, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-start text-gray-700 leading-relaxed"
                    >
                      <CheckCircle
                        className="text-green-600 mt-1 shrink-0"
                        size={20}
                      />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "benefits" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="text-green-600" size={28} />
                  Scheme Benefits
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheme.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-green-50 p-4 rounded-lg hover:bg-green-100 transition"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-600 mt-1 shrink-0"
                      />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Required Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.documents.map((d, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <FileText
                        className="text-blue-600 shrink-0"
                        size={20}
                      />
                      <span className="text-gray-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "process" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Application Process
                </h2>
                <ol className="space-y-4">
                  {scheme.applicationProcess.map((p, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-700 leading-relaxed"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="pt-1">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Right - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded shadow sticky top-24">
            <button className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 transition text-white py-3 rounded-lg font-semibold shadow-md mb-6">
              Apply Now →
            </button>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Official Website
                </h3>
                <a
                  href={scheme.website}
                  className="text-blue-600 hover:underline wrap-break-word"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {scheme.website}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Helpline</h3>
                <p className="text-gray-700">{scheme.helpline}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Application Deadline
                </h3>
                <p className=" text-red-500">{scheme.deadline}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Budget Allocation
                </h3>
                <p className="text-green-700 font-semibold">{scheme.budget}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Total Beneficiaries
                </h3>
                <p className="text-gray-700">{scheme.beneficiaries}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Category</h3>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  {scheme.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
